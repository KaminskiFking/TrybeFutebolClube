import * as express from 'express';
import JwtVerify from '../middlewares/jwtVerify';
import MatchesController from '../controller/MatchesController';

const matchRouter = express.Router();

const jwt = new JwtVerify();

const matchController = new MatchesController();

matchRouter.get('/matches', matchController.findAll);
matchRouter.post('/matches', jwt.valid, matchController.create);
matchRouter.patch('/matches/:id', matchController.updateScoreBoard);
matchRouter.patch('/matches/:id/finish', matchController.updateProgress);

export default matchRouter;
