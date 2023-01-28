import * as express from 'express';
import LeaderboardController from '../controller/leaderboardController';

const leaderboardRouter = express.Router();

const leaderboard = new LeaderboardController();

leaderboardRouter.get('/', leaderboard.findAll);
leaderboardRouter.get('/home', leaderboard.createResultHome);

export default leaderboardRouter;
