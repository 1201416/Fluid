import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface BoardTitleProps{
    value: string;
}

export class BoardTitle extends ValueObject<BoardTitleProps>{
    get value (): string{
        return this.props.value;
    }

    private constructor(props: BoardTitleProps){
        super(props);
    }

    public static create (boardTitle: string): Result<BoardTitle>{
        const result = Guard.againstNullOrUndefined(boardTitle, 'boardTitle')
    
        if (!result.succeeded) {
            return Result.fail<BoardTitle>(result.message);
        } 
      
        if (boardTitle.length < 1) {
            return Result.fail<BoardTitle>('The title should have at least 1 character');
        }

        return Result.ok<BoardTitle>(new BoardTitle({value: boardTitle}))
    }
}