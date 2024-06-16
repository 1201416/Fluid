import {IBoardDTO} from "../dto/IBoardDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Board } from "../model/Board/Board";


export class BoardMap{

  public static toDTO( board: Board): IBoardDTO {
    let string: string[] = [];
    for(const e of board.boardPermissions){
      string.push(e as unknown as string)
    }
    return {
        domainId: board.boardId.toValue(),
        boardOwner: board.props.boardOwner,
        boardTitle: board.props.boardTitle,
        boardPermissions: string,
        fluidId: board.fluidId
    } as unknown as IBoardDTO;
  }

  public static async toDomain (raw: any): Promise<Board> {

    const boardOrError = Board.create({
        boardOwner: raw.boardOwner,
        boardTitle: raw.boardTitle,
        boardPermissions: raw.boardPermissions,
        fluidId: raw.fluidId
    }, new UniqueEntityID(raw.domainId))

    boardOrError.isFailure ? console.log(boardOrError.error) : '';

    return boardOrError.getValue();
  }

  public static toPersistence (board: Board): any {
    let ids: string[] = []
    for(const e of board.boardPermissions){
      ids.push(e.permissionID.toString())
    }
    const a = {
        domainId: board.boardId.toValue(),
        boardOwner: board.boardOwner.props.email.props.value,
        boardTitle: board.boardTitle.props.value,
        boardPermissions: ids,
        fluidId: board.fluidId
    }
    return a;
  }
}
