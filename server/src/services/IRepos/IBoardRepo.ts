
import { Board } from "../../model/Board/Board";
import { User } from "../../model/User/User";

export default interface IBoardRepo{
	save(board: Board): Promise<Board>;
	findById (id: string): Promise<Board | null>;
	getMyBoards():Promise<Board[]>;
	findByFluidId(fluidId: string): Promise<Board | null>;
}
  