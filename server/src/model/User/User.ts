import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { UserId } from "../id/UserID";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UserPassword } from "./Password";
import { UserEmail } from "./Email";
import { UserName } from "./Name";

interface UserProps{
    name: UserName;
    email: UserEmail;
    password: UserPassword;
}

export class User extends AggregateRoot<UserProps>{
    get id(): UniqueEntityID{
        return this._id;
    }
    get userId (): UserId{
        return new UserId(this.id.toString())
    }
    get name (): UserName{
        return this.props.name;
    }
    
    get email (): UserEmail{
        return this.props.email;
    }

    get password (): UserPassword{
        return this.props.password;
    }
    set name (name: UserName){
        this.props.name = name;
    }
    
    set email (email: UserEmail){
        this.props.email = email;
    }

    private constructor(props: UserProps, id?: UniqueEntityID){
        super(props, id);
    }

    public static create (props: UserProps, id?: UniqueEntityID): Result<User>{
        const guardedProps = [
            { argument: props.email, argumentName: 'email' },
            { argument: props.password, argumentName: 'password' }
          ];
          const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<User>(guardResult.message);
        }else{
            const user = new User({...props}, id)
            return Result.ok<User>(user)
        }      
    }
}