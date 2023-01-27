import * as express from 'express';
import JwtVerify from '../middlewares/jwtVerify';
import MatchesController from '../controller/MatchesController';

const matchRouter = express.Router();

const jwt = new JwtVerify();

const matchController = new MatchesController();

matchRouter.get('/matches', matchController.findAll);
matchRouter.post('/matches', jwt.valid, matchController.create);
matchRouter.post('/matches/:id', matchController.updateScoreBoard);
matchRouter.put('/matches/:id/finish', matchController.update);

export default matchRouter;
