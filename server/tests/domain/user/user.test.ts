import {UserEmail} from '../../../src/model/User/Email'
import { UserName } from '../../../src/model/User/Name';
import { UserPassword } from '../../../src/model/User/Password';
import { User } from '../../../src/model/User/User';


describe('User', ()=>{
    
    it('should create a valid user', ()=>{
        const validProps = {
            name: UserName.create('ABC12').getValue(),
            email: UserEmail.create('test@gmail.com').getValue(),
            password: UserPassword.create({value: 'sadhusdhu123#'}).getValue(),
          };

        const result = User.create(validProps)

        expect(result.isSuccess).toBe(true)
          
        const user = result.getValue()
        expect(user.name).toBe(validProps.name);
        expect(user.email).toBe(validProps.email);
        expect(user.password).toBe(validProps.password);
    })

})