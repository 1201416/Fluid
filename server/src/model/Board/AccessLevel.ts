import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface AccessLevelProps{
    value: string;
}

export class AccessLevel extends ValueObject<AccessLevelProps>{
    get value (): string{
        return this.props.value;
    }

    private constructor(props: AccessLevelProps){
        super(props);
    }

    public static create (accessLevel: string): Result<AccessLevel>{
        const result = Guard.againstNullOrUndefined(accessLevel, 'accessLevel')
    
        if (!result.succeeded) {
            return Result.fail<AccessLevel>(result.message);
        } 
      
        if (accessLevel.length < 1) {
            return Result.fail<AccessLevel>('Access level must be a string');
        }

        const regex = /^[a-zA-Z0-9\s]+$/;
        if (!regex.test(accessLevel)) {
            return Result.fail<AccessLevel>('Access level must contain only alphanumeric characters and spaces.');
        }

        return Result.ok<AccessLevel>(new AccessLevel({value: accessLevel}))
    }
}