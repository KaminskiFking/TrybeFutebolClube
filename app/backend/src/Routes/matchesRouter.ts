import * as express from 'express';
import JwtVerify from '../middlewares/jwtVerify';
import MatchesController from '../controller/MatchesController';

const matchRouter = express.Router();

const jwt = new JwtVerify();

const matchController = new MatchesController();

matchRouter.get('/', matchController.findAll);
matchRouter.post('/', jwt.valid, matchController.create);
matchRouter.patch('/:id/finish', matchController.updateProgress);
matchRouter.patch('/:id', matchController.updateScoreBoard);

export default matchRouter;
