import { Router } from 'express';
import user from './routes/userRoute';
import board from './routes/boardRoute'

export default () => {
	const app = Router();
	user(app);
	board(app);
	return app;
}
