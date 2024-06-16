import { NextFunction, Request, Response } from "express";
import { IBoardDTO } from "../dto/IBoardDTO";
import IBoardService from "@/services/IServices/IBoardService";
import IBoardController from "./IControllers/IBoardController";
import {  Inject, Service } from 'typedi';
import { IBoardInputDTO } from "@/dto/IBoardInputDTO";

@Service()
export default class BoardController implements IBoardController{

    constructor(
        @Inject("BoardService")private boardService: IBoardService) {
    }    

    public async createBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const boardDTO: IBoardInputDTO = {
                boardOwner: req.body.boardOwner,
                boardTitle: req.body.boardTitle,
                fluidId: req.body.fluidId
            };
            const result = await this.boardService.createBoard(boardDTO);

            if (result.isSuccess) {
                res.status(201).json(result.getValue());
            } else {
                res.status(400).json({ error: result.error });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.boardService.getBoard(req.query.boardId as string);

            if (result.isSuccess) {
                res.status(200).json(result.getValue());
            } else {
                res.status(404).json({ error: "Board not found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getAllBoards(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.boardService.getMyBoards();

            if (result.isSuccess) {
                res.status(200).json(result.getValue());
            } else {
                res.status(404).json({ error: "Board not found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}