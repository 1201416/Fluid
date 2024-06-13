import { Response, Request, NextFunction} from 'express';
import { IUserDTO } from '../dto/IUserDTO';
import IUserController from './IControllers/IUserController';
import { Inject, Service } from "typedi";
import IUserService from '@/services/IServices/IUserService';
import { IUserInputDTO } from '@/dto/IUserInputDTO';

@Service()
export default class UserController implements IUserController{

    constructor( @Inject("UserService")private userService : IUserService) {
    } 

    public async createUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const result = await this.userService.signUp(req.body as IUserInputDTO);

            if(result.isSuccess){
                res.status(201).json(result.getValue());
            }else{
                res.status(400).json({ error: result.error })
            }
        }catch (error) {
            res.status(500).json(error);
        }
    }
    
    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const name = ""
            const result = await this.userService.signIn({name, email, password});
            if (result.isSuccess) {
                res.status(200).json(result.getValue());
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}