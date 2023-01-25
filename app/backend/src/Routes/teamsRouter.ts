import * as express from 'express';
import TeamsController from '../controller/TeamsController';

const teamRouter = express.Router();

const teamController = new TeamsController();

teamRouter.get('/teams', teamController.findAll);
teamRouter.get('/teams/:id', teamController.findById);

export default teamRouter;
