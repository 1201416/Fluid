export interface IBoardDTO {
    id: string;
    boardOwner: string;
    boardTitle: string;
    boardNRow: number;
    boardNCol: number;
    boardPermissions: string[];
    fluidId: string;
}
  