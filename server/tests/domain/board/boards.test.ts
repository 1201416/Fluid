import { User } from '../../../src/model/User/User'
import { BoardTitle } from '../../../src/model/Board/BoardTitle';
import { BoardPermission } from '../../../src/model/Board/BoardPermission';
import { Board } from '../../../src/model/Board/Board';
import {UserEmail} from '../../../src/model/User/Email'
import { UserName } from '../../../src/model/User/Name';
import { UserPassword } from '../../../src/model/User/Password';
import { AccessLevel } from '../../../src/model/Board/AccessLevel';

describe('Board', ()=>{
    
    it('should create a valid board', ()=>{

        const validUserProps = {
            name: UserName.create('ABC12').getValue(),
            email: UserEmail.create('test@gmail.com').getValue(),
            password: UserPassword.create({value: 'sadhusdhu123#'}).getValue(),
          };

        const resultUser = User.create(validUserProps)

        expect(resultUser.isSuccess).toBe(true)
          
        const user = resultUser.getValue()
        
        const resultAL = AccessLevel.create('WRITE')
        expect(resultAL.isSuccess).toBe(true)

        const resultPermission = BoardPermission.create({user: resultUser.getValue(), accessLevel: resultAL.getValue()});
        expect(resultPermission.isSuccess).toBe(true);

        const validBoardProps = {
            boardOwner: user,
            boardTitle: BoardTitle.create("Title").getValue(),
            boardPermissions: [resultPermission.getValue()],
            fluidId: "asauhsuahsuashusuhsuhsu"
        }

        const result = Board.create(validBoardProps)
        expect(result.isSuccess).toBe(true);

        const board = result.getValue()
        expect(board.boardOwner).toBe(validBoardProps.boardOwner);
        expect(board.boardTitle).toBe(validBoardProps.boardTitle);
        expect(board.boardPermissions).toBe(validBoardProps.boardPermissions);
        expect(board.fluidId).toBe(validBoardProps.fluidId);
    })

})