import {BoardTitle} from '../../../src/model/Board/BoardTitle'

describe('BoardTitle', ()=>{
    it('should create a valid boardTitle', ()=>{
        const value = 'Titulo novo';
        const result = BoardTitle.create(value);

        expect(result.isSuccess).toBe(true);
        expect(result.getValue().value).toBe(value)
    })
    it('should fail when creating an boardTitle null', ()=>{
        const value = null;
        const result = BoardTitle.create(value!);

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("boardTitle is null or undefined")
    })
    it('should fail when creating an boardTitle undefined', ()=>{
        const value = undefined;
        const result = BoardTitle.create(value!);

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("boardTitle is null or undefined")
    })
})