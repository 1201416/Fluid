import { BoardMap } from "../mappers/BoardMapper";
import { BoardId } from "../model/id/BoardID";
import { Board } from "../model/Board/Board";
import  IBoardRepo  from "../services/IRepos/IBoardRepo";
import {IBoardPersistence} from "../dataschema/IBoardPersistence";
import { Document, Model } from 'mongoose';
import { User } from "../model/User/User";
import { Service, Inject} from "typedi";

@Service()
export default class BoardRepo implements IBoardRepo {
  private models: any;

  constructor(
    @Inject("BoardSchema")private boardSchema : Model<IBoardPersistence & Document>
  ) { }
  

  public async exists (board: Board): Promise<boolean> {
    const boardId = board.boardId;

    const idX = boardId instanceof BoardId ? (<BoardId>boardId).toValue() : boardId;

    const query = { domainId: idX}; 
    const boardDocument = await this.boardSchema.findOne( query );

    return !!boardDocument === true;
  }

  public async save (board: Board): Promise<Board> {
    const query = { domainId: board.id.toString() }; 

    const boardDocument = await this.boardSchema.findOne( query );
    try {
      if (boardDocument === null ) {
        const rawboard: any = BoardMap.toPersistence(board);
        console.log(board)

        const boardCreated = await this.boardSchema.create(rawboard);

        return BoardMap.toDomain(boardCreated);
      } else {
        await boardDocument.save();

        return board;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findById (boardId: BoardId | string): Promise<Board | null> {

    const idX = boardId instanceof BoardId ? (<BoardId>boardId).toValue() : boardId;

    const query = { domainId: idX }; 
    const boardRecord = await this.boardSchema.findOne( query );

    if( boardRecord != null) {
      return BoardMap.toDomain(boardRecord);
    }
    else
      return null;
  }

  public async getMyBoards():Promise<Board[]>{
    const records = await this.boardSchema.find({})
    if(records != null){

      const recordsMap = await Promise.all(records.map(async (record) => {
        const board = await BoardMap.toDomain(record);
        return board;
      }));
      /**
      const finalMap: Board[] = []
      recordsMap.forEach(board =>{
        const hasPermission = board.boardPermissions.some(permission => {
          return permission.user.id === user.id;
        });
        if (hasPermission) {
          finalMap.push(board);
        }
      })
      return finalMap;
      */

      return recordsMap;
    }

    return []
  }
  public async findByFluidId(fluidId: string): Promise<Board | null> {
    const query = { fluidId: fluidId };
    const boardRecord = await this.boardSchema.findOne(query);

    if (boardRecord != null) {
      return BoardMap.toDomain(boardRecord);
    } else {
      return null;
    }
  }
}