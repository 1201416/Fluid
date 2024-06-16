import { AzureMember } from "@fluidframework/azure-client";
export type Position = {
    x: number;
    y: number;
}
export type EntryData = {
    id: string;
    position: Position;
    content?: string;
    author: AzureMember;
    isBeingEdited?: boolean;
}