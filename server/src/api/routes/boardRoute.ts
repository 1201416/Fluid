import { Router, Response } from 'express';
import IBoardController from "../../controllers/IControllers/IBoardController";
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import middlewares from '../middlewares';

const router = Router();

const connectedClients = new Set<Response>();

function sendSSEEvent(data: any){
    connectedClients.forEach((client) =>{
        client.write(`data: ${JSON.stringify(data)}\n\n`)
    })
}

export default (app: Router) =>{
    app.use('/boards', router);

    const ctrl = Container.get("BoardController") as IBoardController;

    router.post('',
        celebrate({
            body: Joi.object({
                boardOwner: Joi.string().required(),
                boardTitle: Joi.string().required(),
                fluidId: Joi.string().required()
            })
        }),
        middlewares.attachCurrentUser,
        (req, res, next) =>{
            ctrl.createBoard(req, res, next);
            sendSSEEvent('boards')
        }
    )

    router.get('',
        middlewares.attachCurrentUser,
        (req, res, next) => ctrl.getBoard(req, res, next)
    )
    router.get('/by-user',
        middlewares.attachCurrentUser,
        (req, res, next) => ctrl.getAllBoards(req, res, next)
    )
    router.get('/sse-boards', (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
    
        connectedClients.add(res);
    
        res.on('close', () => {
          connectedClients.delete(res);
        });
    });
}