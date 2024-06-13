import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { User } from "../User/User";
import { AccessLevel } from "./AccessLevel";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { PermissionID } from "../id/PermissionID";
import { AggregateRoot } from "../../core/domain/AggregateRoot";

interface BoardPermissionProps{
    user: User;
    accessLevel: AccessLevel
}

export class BoardPermission extends AggregateRoot<BoardPermissionProps>{
    get id (): UniqueEntityID {
        return this._id;
      }
    
      get permissionID (): PermissionID {
        return new PermissionID(this.id.toValue());
      }
    
    get user (): User{
        return this.props.user;
    }
    get accessLevel (): AccessLevel{
        return this.props.accessLevel;
    }
    set user (user: User){
        this.props.user = user;
    }
    set accessLevel (accessLevel: AccessLevel){
        this.props.accessLevel = accessLevel;
    }

    private constructor(props: BoardPermissionProps, id?: UniqueEntityID){
        super(props, id);
    }

    public static create (props: BoardPermissionProps, id?: UniqueEntityID): Result<BoardPermission>{
        const resultU = Guard.againstNullOrUndefined(props.user, ' user')
    
        if (!resultU.succeeded) {
            return Result.fail<BoardPermission>(resultU.message);
        } 
        
        const resultAL = Guard.againstNullOrUndefined(props.accessLevel, 'accessLevel')

        if (!resultAL.succeeded) {
            return Result.fail<BoardPermission>(resultAL.message);
        } 

        return Result.ok<BoardPermission>(new BoardPermission({...props}, id))
    }
}