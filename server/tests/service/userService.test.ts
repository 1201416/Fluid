import UserService from '../../src/services/userService';
import IUserRepo from '../../src/services/IRepos/IUserRepo';
import { Result } from '../../src/core/logic/Result';
import { IUserDTO } from '../../src/dto/IUserDTO';
import { IUserInputDTO } from '../../src/dto/IUserInputDTO';
import { User } from '../../src/model/User/User';
import { UserName } from '../../src/model/User/Name';
import { UserEmail } from '../../src/model/User/Email';
import { UserPassword } from '../../src/model/User/Password';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { anything, when, mock, instance } from 'ts-mockito';


describe('UserService', () => {
    let userService: UserService;
    let repo: IUserRepo;

    beforeEach(() => {
        repo = mock<IUserRepo>();
        userService = new UserService(instance(repo));
    });
/**
    describe('signIn', () => {
        it('should sign in a user and return a token', async () => {
            const userDTO: IUserDTO = {
                domainId: "asuasdhasasdusah",
                name: 'Joao Feijao',
                email: 'feijao@example.com',
                password: 'password123'
            };

            const userProps = {
                name: UserName.create(userDTO.name).getValue(),
                email: UserEmail.create(userDTO.email).getValue(),
                password: UserPassword.create({ value: userDTO.password }).getValue()
            };

            const user = User.create(userProps).getValue();

            when(repo.findByEmail(userDTO.email)).thenResolve(null)
            when(repo.save(anything())).thenResolve(user)

            const dto: IUserInputDTO = userDTO

            const result = await userService.signUp(dto);

            when(repo.findByEmail(result.getValue().userDTO.email)).thenResolve(user)
            const signedIn = await userService.signIn(dto);

            expect(signedIn.isSuccess).toBe(true)
        });
    });
*/

    describe('signUp', () => {
        it('should sign up a user and return a token', async () => {
            const userDTO: IUserDTO = {
                domainId: "asuasdhasasdusah",
                name: 'Joao Feijao',
                email: 'feijao@example.com',
                password: 'password123'
            };

            const userProps = {
                name: UserName.create(userDTO.name).getValue(),
                email: UserEmail.create(userDTO.email).getValue(),
                password: UserPassword.create({ value: userDTO.password }).getValue()
            };

            const user = User.create(userProps).getValue();

            when(repo.findByEmail(userDTO.email)).thenResolve(null)
            when(repo.save(anything())).thenResolve(user)
            const dto: IUserInputDTO = userDTO

            const result = await userService.signUp(dto);

            expect(result.isSuccess).toBe(true);
            expect(result.getValue().userDTO.email).toBe(user.props.email.value);
            expect(result.getValue().userDTO.name).toBe(user.props.name.value);
        });

    });
});