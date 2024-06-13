import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { User } from "../User/User";
import { BoardTitle } from "./BoardTitle";
import { BoardPermission } from "./BoardPermission";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { BoardId } from "../id/BoardID";


interface BoardProps{
    boardOwner: User;
    boardTitle: BoardTitle;
    boardPermissions: Array<BoardPermission>;
    fluidId: string;
}

export class Board extends AggregateRoot<BoardProps>{
    get id(): UniqueEntityID{
        return this._id;
    }
    get boardId (): BoardId{
        return new BoardId(this.id.toString())
    }
    get boardOwner (): User{
        return this.props.boardOwner;
    }
    get boardTitle (): BoardTitle{
        return this.props.boardTitle;
    }
    
    get boardPermissions (): Array<BoardPermission>{
        return this.props.boardPermissions;
    }
    get fluidId (): string{
        return this.props.fluidId;
    }
    
    private constructor(props: BoardProps, id?: UniqueEntityID){
        super(props);
    }

    public static create (props: BoardProps, id?: UniqueEntityID): Result<Board>{

        const guardedProps = [
            { argument: props.boardOwner, argumentName: 'boardOwner'},
            { argument: props.boardTitle, argumentName: 'boardTitle'},
            { argument: props.fluidId, argumentName: 'fluidId'}
        ]
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps)
        if (!guardResult.succeeded) {
            return Result.fail<Board>(guardResult.message);
        }else{
            const board = new Board({...props}, id)
            return Result.ok<Board>(board)
        }
    }
}