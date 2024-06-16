import {UserPassword} from '../../../src/model/User/Password'

describe('UserPassword', ()=>{
    it('should create a valid password', ()=>{
        const value = '123145##AA';
        const result = UserPassword.create({value: value});

        expect(result.isSuccess).toBe(true);
        expect(result.getValue().value).toBe(value)
    })
    it('should fail when creating an password null', ()=>{
        const value = null;
        const result = UserPassword.create({value: value!});

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("password is null or undefined")
    })
    it('should fail when creating an password undefined', ()=>{
        const value = undefined;
        const result = UserPassword.create({value: value!});

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("password is null or undefined")
    })
})