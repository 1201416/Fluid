import { IUserInputDTO } from "@/dto/IUserInputDTO";
import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService {
    signIn(user: IUserInputDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>,
    signUp(user: IUserInputDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
}