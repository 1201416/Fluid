import { Result } from "../core/logic/Result";
import { IBoardDTO } from "../dto/IBoardDTO";
import { AccessLevel } from "../model/Board/AccessLevel";
import { BoardPermission } from "../model/Board/BoardPermission";
import IBoardRepo from "./IRepos/IBoardRepo";
import IUserRepo from "./IRepos/IUserRepo";
import IBoardService from "./IServices/IBoardService";
import { Board } from "../model/Board/Board";
import { BoardTitle } from "../model/Board/BoardTitle";
import { BoardMap } from "../mappers/BoardMapper";
import { Inject, Service } from "typedi";
import { IBoardInputDTO } from "@/dto/IBoardInputDTO";

@Service()
export default class BoardService implements IBoardService{

    constructor(
        @Inject("UserRepo")private userRepo: IUserRepo,
        @Inject("BoardRepo")private boardRepo: IBoardRepo
    ) {}
    
    public async createBoard(boardDTO: IBoardInputDTO): Promise<Result<{boardDTO: IBoardDTO}>>{
        const userFound = await this.userRepo.findByEmail(boardDTO.boardOwner)

        if(!userFound){
            throw new Error("Owner not found")
        }
        const boardPermissions: Array<BoardPermission> = [];
        const ownerPermission = BoardPermission.create({user: userFound, accessLevel: AccessLevel.create("WRITE").getValue()})
        boardPermissions.push(ownerPermission.getValue())

        const board = Board.create({
            boardOwner: userFound,
            boardTitle: BoardTitle.create(boardDTO.boardTitle).getValue(),
            boardPermissions: boardPermissions,
            fluidId: boardDTO.fluidId
        })

        await this.boardRepo.save(board.getValue());

        const dto = BoardMap.toDTO(board.getValue())

        if(dto){
            return Result.ok<{boardDTO: IBoardDTO}>({boardDTO: dto});
        }else{
            return Result.fail<{boardDTO: IBoardDTO}>({boardDTO: undefined});
        }
    }

    public async getBoard(id: string): Promise<Result<{boardDTO: IBoardDTO}>>{
        const board = await this.boardRepo.findByFluidId(id);

        if(!board){
            throw new Error('Error fetching board')
        }
        const dto = BoardMap.toDTO(board)

        if(dto){
            return Result.ok<{boardDTO: IBoardDTO}>({boardDTO: dto});
        }else{
            return Result.fail<{boardDTO: IBoardDTO}>({boardDTO: undefined});
        }
    }
    public async getMyBoards(): Promise<Result<IBoardDTO[]>>{
        try{
        const allBoards = await this.boardRepo.getMyBoards();
        if(!allBoards){
            return Result.fail<IBoardDTO[]>("Board error");
        }
        
        const finalMap : IBoardDTO[] = []
        for(const e of allBoards){
            const dto = BoardMap.toDTO(e)
            finalMap.push(dto)
        }
        console.log(finalMap)
        return Result.ok<IBoardDTO[]>(finalMap);
    }catch(e){
        throw e
    }
    }
}
