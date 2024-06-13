import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";

import { User } from "../model/User/User";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { UserName } from "@/model/User/Name";
import { UserEmail } from "@/model/User/Email";
import { UserPassword } from "@/model/User/Password";


export class UserMap extends Mapper<User> {

  public static toDTOSignUp( user: User): IUserDTO {
    const dto = {
      domainId: user.id.toValue(),
      name: user.props.name.value,
      email: user.props.email.value,
      password: user.props.password.value
    } as IUserDTO

    return dto;
  }
  public static toDTOSignIn( user: User): IUserDTO {
    const dto = {
      domainId: user.id.toValue() as unknown as string,
      name: user.props.name.value,
      email: user.props.email.value,
      password: user.props.password.value
    } as IUserDTO
    
    return dto;
  }


  public static async toDomain (raw: any): Promise<User> {
    const nameErr = UserName.create(raw.name);
    const emailErr = UserEmail.create(raw.email);
    const passwordErr = UserPassword.create({value: raw.password});
    
    const userOrError = User.create({
      name: nameErr.getValue(),
      email: emailErr.getValue(),
      password: passwordErr.getValue()
    }, new UniqueEntityID(raw.domainId))
    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue(): null;
  }

  public static toPersistence (user: User): any {
    const a = {
      domainId: user.userId.toString(),
      name: user.props.name.value,
      email: user.props.email.value,
      password: user.props.password.value
    }
    return a;
  }
}
