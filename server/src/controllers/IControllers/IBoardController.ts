import { Request, Response, NextFunction } from 'express';

export default interface IBoardController {
    createBoard(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBoard(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllBoards(req: Request, res: Response, next: NextFunction): Promise<void>;
}