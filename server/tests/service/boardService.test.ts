import { anything, instance, mock, when } from 'ts-mockito';

import {UserEmail} from '../../src/model/User/Email'
import { UserName } from '../../src/model/User/Name';
import { UserPassword } from '../../src/model/User/Password';
import { User } from '../../src/model/User/User';
import BoardService from "../../src/services/boardService"
import UserService from "../../src/services/userService"
import IUserRepo from '../../src/services/IRepos/IUserRepo';
import { IUserDTO } from '../../src/dto/IUserDTO';
import IBoardRepo from '../../src/services/IRepos/IBoardRepo';
import { BoardTitle } from '../../src/model/Board/BoardTitle';
import { UserMap } from '../../src/mappers/UserMapper';
import { AccessLevel } from '../../src/model/Board/AccessLevel';
import { BoardPermission } from '../../src/model/Board/BoardPermission';
import { Board } from '../../src/model/Board/Board';
import { BoardMap } from '../../src/mappers/BoardMapper';

describe('BoardService', ()=>{
    let boardService: BoardService;
    let userService: UserService;
    let userRepo: IUserRepo;
    let boardRepo: IBoardRepo;

    beforeEach(()=>{
        userRepo = mock<IUserRepo>();
        boardRepo = mock<IBoardRepo>();
        boardService = new BoardService(instance(userRepo), instance(boardRepo))
        userService = new UserService(instance(userRepo))
    })

    it('should create a board', async()=>{
        const userdto = {
            name: 'ABC12',
            email:'feijao@gmail.com',
            password: 'sadhusdhu123#',
        };
        const userValidProps = {
            name: UserName.create(userdto.name).getValue(),
            email: UserEmail.create(userdto.email).getValue(),
            password: UserPassword.create({value: userdto.password}).getValue(),
          };

        const resultUser = User.create(userValidProps)
        when(userRepo.save(anything())).thenResolve(resultUser.getValue())

        const uResult = await userService.signUp(userdto as IUserDTO)

        expect(uResult.isSuccess).toBe(true);

        const user = await UserMap.toDomain(userdto)

        const resultAL = AccessLevel.create('WRITE')

        const permission = BoardPermission.create({user: user, accessLevel: resultAL.getValue()});

        const validBoardProps = {
            boardOwner: user,
            boardTitle: BoardTitle.create("Title").getValue(),
            boardPermissions: [permission.getValue()],
            fluidId: "asauhsuahsuashusuhsuhsu"
        }
        
        const resultBoard = Board.create(validBoardProps)
        when(boardRepo.save(anything())).thenResolve(resultBoard.getValue())
        
        when(userRepo.findByEmail(anything())).thenResolve(user)

        const dto = BoardMap.toDTO(resultBoard.getValue())

        const finalResult = await boardService.createBoard(dto)

        expect(finalResult.isSuccess).toBe(true)
     })
})