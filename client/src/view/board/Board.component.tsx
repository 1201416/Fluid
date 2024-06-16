import React, { useCallback, useEffect, useState } from 'react';
import List from '../list/list.component';
import { ListData } from '../types/ListData';
import CreateBoard from './CreateBoard.component';
import Toast from '../toast';
import { useNavigate } from 'react-router-dom';

import './board.component.css';
import configurations from '../../configurations';
import boardsService from '../../services/BoardsService';
import { BoardData } from '../types/BoardData';
import { IUserData } from '../types/UserData';

const BoardComponent: React.FC = () => {
    const [listBoards, setListBoards] = useState<ListData[]>([]);
    const [user, setUser] = useState<IUserData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser) as IUserData);
        }
    }, []);

    const receiveData = (board: BoardData) => {
        const addToList = {
            id: board.id,
            column1Name: board.boardTitle,
            column2Owner: board.boardOwner
        } as ListData;

        setListBoards([...listBoards, addToList]);
    };

    const getBoards = useCallback(async () => {
        if (!user) return;

        try {
            boardsService.getBoards().then(
                (boards) => {
                        let listData: ListData[] = [];
                        boards.forEach((board) => {
                            const data = {
                                id: board.fluidId,
                                column1Name: board.boardTitle,
                                column2Owner: board.boardOwner
                            } as ListData;
                            listData.push(data);
                        });

                        setListBoards(listData);
                },error =>{
                }
            );
        } catch (error) {
            
            Toast.showFailure("Error on board. Please try again.");
        }
    }, [user]);

    useEffect(() => {
        const eventSource = new EventSource(`${configurations.server}/api/boards/sse-boards`);
        
        eventSource.onerror = (error) => {
            console.log("SSE error:", error);
        };

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTimeout(() => {
                getBoards();
            }, 1000);

            return data;
        };
        return () => {
            eventSource.close();
        };
       // eslint-disable-next-line
    }, [getBoards]);

    useEffect(() => {
        getBoards();
       // eslint-disable-next-line
    }, [getBoards]);

    const openBoard = async (id: string, title: string) => {
        navigate(`/boards/${id}`, { state: { title } });
    };

    return (
        <div className='section-boards'>
            <List
                title='Boards'
                data={listBoards}
                custom={<CreateBoard onDataReceived={receiveData} user={user!} />}
                openModalToUpdate={openBoard}
            />
        </div>
    );
};

export default BoardComponent;