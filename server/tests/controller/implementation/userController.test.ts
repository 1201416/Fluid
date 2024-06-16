export {}
import IUserRepo from "../../../src/services/IRepos/IUserRepo";
import IUserService from "../../../src/services/IServices/IUserService";
import UserController from "../../../src/controllers/userController";
import { anything, instance, mock, when } from 'ts-mockito';
import UserService from "../../../src/services/userService";
import { Request, Response, NextFunction } from 'express';
import { IUserDTO } from "../../../src/dto/IUserDTO";
import { Result } from "../../../src/core/logic/Result";
import { IUserInputDTO } from "../../../src/dto/IUserInputDTO";
import { UserName } from "../../../src/model/User/Name";
import { UserEmail } from "../../../src/model/User/Email";
import { UserPassword } from "../../../src/model/User/Password";
import { User } from "../../../src/model/User/User";

describe('UserController', () => {
    let repo: IUserRepo;
    let service: IUserService;
    let ctrl: UserController;
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        repo = mock<IUserRepo>()
        service = new UserService(instance(repo));
        ctrl = new UserController(service);
        req = {} as Request;
        res = {} as Response;
        next = jest.fn() as NextFunction;

        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn().mockReturnThis();
    });

    describe('createUser', () => {
        it('should return 201 when user creation is successful', async () => {
            const userInput = { name: 'Joao', email: 'Joao@gmail.com', password: 'password123' };
            req.body = userInput;

            const user = {
                name: UserName.create(userInput.name).getValue(),
                email: UserEmail.create(userInput.email).getValue(),
                password: UserPassword.create({ value: userInput.password }).getValue()
            }

            const expectUser = User.create(user).getValue()

            when(repo.findByEmail(anything())).thenResolve(null)
            when(repo.save(anything())).thenResolve(expectUser)
            
            await ctrl.createUser(req, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(201);
        });

        it('should return 400 when user email fails', async () => {
            const userInput: IUserInputDTO = { name: 'Joao', email: 'Joao.com', password: 'password123' };
            req.body = userInput;

            when(repo.findByEmail(anything())).thenResolve(null)
            await ctrl.createUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email format' });
        });
    });
    describe('login', () => {
        it('should return 200 when login is successful', async () => {
            const loginInput = { email: 'Joao@example.com', password: 'password123', name: '' };
            req.body = { email: 'Joao@example.com', password: 'password123' };
            
            const user = {
                name: UserName.create(loginInput.name).getValue(),
                email: UserEmail.create(loginInput.email).getValue(),
                password: UserPassword.create({ value: loginInput.password }).getValue()
            }

            const expectUser = User.create(user).getValue()

            when(repo.findByEmail(anything())).thenResolve(expectUser)
            await ctrl.login(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
         });

        it('should return 401 when login fails', async () => {
            const loginInput = { email: 'Joao@example.com', password: 'password123', name: '' };
            req.body = { email: 'Joaoexample.com', password: 'password123' };

            await ctrl.login(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
        });

    });
    });
