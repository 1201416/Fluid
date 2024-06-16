import configurations from "../configurations";
import { BoardData } from "../view/types/BoardData";

class BoardsService{
    async create(boardOwner: string, boardTitle: string, fluidId: string): Promise<BoardData>{
        const response = await fetch(`${configurations.server}/api/boards`,
            {method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                boardOwner,
                boardTitle,
                fluidId
            })
        })

        if(response.ok){
            return await response.json();
        }else{
            throw new Error(await response.text())
        }
    }

    async getBoard(id: string): Promise<BoardData>{
        const response = await fetch(`${configurations.server}/api/boards?boardId=${id}`,
            {method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })

        if(response.ok){
            return await response.json();
        }else{
            throw new Error(await response.text())
        }
    }

    async getBoards(): Promise<BoardData[]>{
        const response = await fetch(`${configurations.server}/api/boards/by-user`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })

        if(response.ok){
            return await response.json();
        }else{
            throw new Error(await response.text())
        }
    }
}

const boardsService = new BoardsService()
export default boardsService;