import { BoardId } from "@/model/id/BoardID";
import { Result } from "../../core/logic/Result";
import { IBoardDTO } from "../../dto/IBoardDTO";
import { IBoardInputDTO } from "@/dto/IBoardInputDTO";

export default interface IBoardService {
    createBoard(boardDTO: IBoardInputDTO): Promise<Result<{boardDTO: IBoardDTO}>>,
    getMyBoards(): Promise<Result<IBoardDTO[]>>,
    getBoard(id: string): Promise<Result<{boardDTO: IBoardDTO}>>
}