import {AccessLevel} from '../../../src/model/Board/AccessLevel'

describe('AccessLevel', ()=>{
    it('should create a valid AccessLevel', ()=>{
        const value = 'Titulo novo';
        const result = AccessLevel.create(value);

        expect(result.isSuccess).toBe(true);
        expect(result.getValue().value).toBe(value)
    })
    it('should fail when creating an AccessLevel null', ()=>{
        const value = null;
        const result = AccessLevel.create(value!);

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("accessLevel is null or undefined")
    })
    it('should fail when creating an AccessLevel undefined', ()=>{
        const value = undefined;
        const result = AccessLevel.create(value!);

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("accessLevel is null or undefined")
    })
    it('should fail when creating an AccessLevel non-alphanumeric', ()=>{
        const value = "asdha231244#$";
        const result = AccessLevel.create(value!);

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("Access level must contain only alphanumeric characters and spaces.")
    })
})