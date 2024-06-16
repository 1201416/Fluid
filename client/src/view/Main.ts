import { IFluidContainer, ISharedMap, SharedMap } from "fluid-framework";
import { AzureMember } from "@fluidframework/azure-client";
import { IBoardDTO } from "../dto/IBoardDTO";

export type model = Readonly<{
    createBoard(author: AzureMember, nRow: number, nCol: number, title: string): IBoardDTO;
    changeContent(board: IBoardDTO, nCol: number, nRow: number, content: string): void;
    setChangeListener(listener: () => void) : void;
    removeChangeListener(listener: ()=> void): void;
}>;