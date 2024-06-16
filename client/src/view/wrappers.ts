import { IEntryDTO } from "../dto/IEntryDTO";

export interface FluidDisplayObject{
    nCol: number;
    nRow: number;
    content: string;
}

export const Entry2Fluid = (entry: IEntryDTO): FluidDisplayObject =>{
    return{
        nCol: entry.boardColPos,
        nRow: entry.boardRowPos,
        content: entry.content
    }
}

export const Fluid2Entry = (
    entryUpdated: IEntryDTO,
    sourceObject: FluidDisplayObject
    )=>{
        entryUpdated.content = sourceObject.content
        return entryUpdated
    }