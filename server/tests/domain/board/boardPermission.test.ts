import { AccessLevel } from '../../../src/model/Board/AccessLevel';
import {BoardPermission} from '../../../src/model/Board/BoardPermission'
import { UserEmail } from '../../../src/model/User/Email';
import { UserName } from '../../../src/model/User/Name';
import { UserPassword } from '../../../src/model/User/Password';
import { User } from '../../../src/model/User/User';
import { AggregateRoot } from '../../../src/core/domain/AggregateRoot';
describe('BoardPermission', ()=>{
    it('should create a valid permission', ()=>{
        const validProps = {
            name: UserName.create('ABC12').getValue(),
            email: UserEmail.create('pedro@gmail.com').getValue(),
            password: UserPassword.create({value: 'sadhusdhu123#'}).getValue(),
          };

        const resultUser = User.create(validProps)
        expect(resultUser.isSuccess).toBe(true);
        
        const resultAL = AccessLevel.create('WRITE')
        expect(resultAL.isSuccess).toBe(true)

        const result = BoardPermission.create({user: resultUser.getValue(), accessLevel: resultAL.getValue()});
        expect(result.isSuccess).toBe(true);
        expect(result.getValue().user).toBe(resultUser.getValue())
        expect(result.getValue().accessLevel).toBe(resultAL.getValue())
    })
})