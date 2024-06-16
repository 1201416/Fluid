import {UserEmail} from '../../../src/model/User/Email'

describe('UserEmail', ()=>{
    it('should create a valid email', ()=>{
        const value = 'pedromascarade@gmail.com';
        const result = UserEmail.create(value);

        expect(result.isSuccess).toBe(true);
        expect(result.getValue().value).toBe(value)
    })
    it('should fail when creating an email null', ()=>{
        const value = null;
        const result = UserEmail.create(value!);

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("email is null or undefined")
    })
    it('should fail when creating an email undefined', ()=>{
        const value = undefined;
        const result = UserEmail.create(value!);

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("email is null or undefined")
    })
})