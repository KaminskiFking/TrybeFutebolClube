import * as express from 'express';
import TeamsController from '../controller/TeamsController';

const teamRouter = express.Router();

const teamController = new TeamsController();

teamRouter.get('/', teamController.findAll);
teamRouter.get('/:id', teamController.findById);

export default teamRouter;
