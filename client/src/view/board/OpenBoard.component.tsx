import { initializeIcons, ThemeProvider } from "@fluentui/react";
import BoardOpenedComponent from "./BoardOpened.component";
import "./board.component.css";
import { lightTheme } from '../Themes';
import { getFluidContainer } from "../utils";
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Toast from "../toast";
import boardsService from "../../services/BoardsService";
import { IUserData } from "../types/UserData";
import { BoardData } from "../types/BoardData";

const OpenBoard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [board, setBoard] = useState<any>(null);
    const [containerDef, setContainer] = useState<any>(null);
    const [servicesDef, setServices] = useState<any>(null);
    const [user, setUser] = useState<IUserData | null>(null);
    const [name, setName] = useState<string|null>(null)

    const initialize = useCallback(async (fluidId: string, userData: IUserData) => {
        try {
            initializeIcons();
            let { container, services } = await getFluidContainer(fluidId, userData);

            if (container.connectionState === 2) {
                await new Promise<void>((resolve) => {
                    container.once("connected", () => {
                        resolve();
                    });
                });
            }
            setContainer(container);
            setServices(services);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const getBoard = useCallback(async () => {
        try {
            boardsService.getBoard(id!).then(
                (board: BoardData) =>{
                    setBoard(board);
                    setName(board.boardTitle)
                    Toast.showSuccess("Your board is loaded");
                }, error =>{
                    const resMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

                    Toast.showFailure("Board is not found in the system");
                });
            Toast.showSuccess("Your board is loaded");
        } catch (error) {
            Toast.showFailure("Error loading board. Please try again.");
        }
    }, [id]);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const us = JSON.parse(storedUser) as IUserData;
            setUser(us);
        }
    }, []);

    useEffect(() => {
        if (user && board) {
            initialize(board.boardDTO.fluidId, user);
        }
    }, [user, board, initialize]);

    useEffect(() => {
        getBoard();
    }, [getBoard]);

    if (!containerDef || !servicesDef) {
        return <div>Loading...</div>;
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <main>
                <BoardOpenedComponent container={containerDef} services={servicesDef} id={id!} name={name!} />
            </main>
        </ThemeProvider>
    );
};

export default OpenBoard;