import * as express from 'express';
import LeaderboardController from '../controller/leaderboardController';

const leaderboardRouter = express.Router();

const leaderboard = new LeaderboardController();

leaderboardRouter.get('/', leaderboard.findAll);
leaderboardRouter.get('/home', leaderboard.createResultHome);
leaderboardRouter.get('/away', leaderboard.createResultAway);

export default leaderboardRouter;
