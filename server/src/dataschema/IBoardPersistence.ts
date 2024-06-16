export interface IBoardPersistence{
    domainId: string;
    boardOwner: string;
    boardTitle: string;
    boardPermissions: string[];
    fluidId: string;
}