import { Repo } from "../../core/infra/Repo";
import { Board } from "../../model/Board/Board";
import { User } from "../../model/User/User";

export default interface IBoardRepo extends Repo<Board> {
	save(board: Board): Promise<Board>;
	findById (id: string): Promise<Board | null>;
	getMyBoards():Promise<Board[]>;
	findByFluidId(fluidId: string): Promise<Board | null>;
}
  