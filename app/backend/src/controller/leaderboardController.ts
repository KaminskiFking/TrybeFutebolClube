import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class leaderboardController {
  constructor(private services = new LeaderboardService()) {}
  public findAll = async (req: Request, res: Response) => {
    const message = await this.services.sumBoard();
    return res.status(200).json(message);
  };

  public createResultHome = async (_req: Request, res: Response) => {
    const message = await this.services.createResultsHome();
    message.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return res.status(200).json(message);
  };

  public createResultAway = async (_req: Request, res: Response) => {
    const message = await this.services.createResultsAway();
    message.sort((d, b) => b.totalPoints - d.totalPoints
    || b.goalsBalance - d.goalsBalance
    || b.goalsFavor - d.goalsFavor
    || b.goalsOwn - d.goalsOwn);
    return res.status(200).json(message);
  };
}
