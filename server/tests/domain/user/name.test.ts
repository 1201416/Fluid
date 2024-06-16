import {UserName} from '../../../src/model/User/Name'

describe('UserName', ()=>{
    it('should create a valid name', ()=>{
        const value = 'Joãozinho';
        const result = UserName.create(value);

        expect(result.isSuccess).toBe(true);
        expect(result.getValue().value).toBe(value)
    })
    it('should fail when creating an name null', ()=>{
        const value = null;
        const result = UserName.create(value!);

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("Name is null or undefined")
    })
    it('should fail when creating an name undefined', ()=>{
        const value = undefined;
        const result = UserName.create(value!);

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("Name is null or undefined")
    })
})