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
    return res.status(200).json(message);
  };

  public createResultAway = async (_req: Request, res: Response) => {
    const message = await this.services.createResultsAway();
    return res.status(200).json(message);
  };
}
