import IUserService from "./IServices/IUserService";
import IUserRepo from "./IRepos/IUserRepo";
import { Result } from "../core/logic/Result";
import { IUserDTO } from "../dto/IUserDTO";
import { User } from "../model/User/User";
import { UserMap } from "../mappers/UserMapper";
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import { Inject, Service } from "typedi";
import { UserName } from "../model/User/Name";
import { UserEmail } from "../model/User/Email";
import { UserPassword } from "../model/User/Password";
import { IUserInputDTO } from "@/dto/IUserInputDTO";

@Service()
export default class UserService implements IUserService{
    constructor(
        @Inject("UserRepo")private userRepo: IUserRepo
    ) {}
    
    public async signIn(userDTO: IUserInputDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
        const user = await this.userRepo.findByEmail( userDTO.email );

        if (!user) {
          throw new Error('User not registered');
        }
        const hashedPassword = user.props.password.props.value as unknown as string;

        const validPassword = await argon2.verify(hashedPassword, userDTO.password);

        if (validPassword) {
          const token = this.generateToken(user) as string;
          console.log(user.props.email.value)
          const userDTO = UserMap.toDTOSignIn( user ) as IUserDTO;
          return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTO, token: token} );
        } else {
          throw new Error('Invalid Password');
        }
      }

    public async signUp(userDTO: IUserInputDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
        try {
          const salt = randomBytes(32);
          const hashedPassword = await argon2.hash(userDTO.password, { salt });
          const userProps = {
            name: UserName.create(userDTO.name).getValue(),
            email: UserEmail.create(userDTO.email).getValue(),
            password: UserPassword.create({value: hashedPassword}).getValue()
          }

            const user = User.create(userProps)

            const token = this.generateToken(user.getValue());

            await this.userRepo.save(user.getValue());

            console.log("5")
            const userDTOResult = UserMap.toDTOSignUp( user.getValue() ) as IUserDTO;
            return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTOResult, token: token} )
    
        } catch (e) {
            throw e;
        }
      }
    private generateToken(user: User) {
    
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
    
        const id = user.id.toString();
        const email = user.email;
        const name = user.name;
        
        return jwt.sign(
          {
            id: id,
            email: email,
            name: name
          },
          "asdijasdhjashduashfdafsuh my sadjhasudhsadhuas secret",
          {algorithm: "HS256"}
        );
      }
}