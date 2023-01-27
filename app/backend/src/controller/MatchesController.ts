import { Request, Response } from 'express';
import MacthesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private services = new MacthesService()) {}
  public findAll = async (req: Request, res: Response) => {
    const query = req.query.inProgress;
    console.log(query);
    const { status, message } = await this.services.findAll(query as string);
    return res.status(status).json(message);
  };

  public create = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const { status, message } = await this.services
      .create(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return res.status(status).json(message);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message } = await this.services.update(id as unknown as number);
    return res.status(status).json(message);
  };

  public updateScoreBoard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, message } = await this
      .services.updateScoreBoard(id, homeTeamGoals, awayTeamGoals);
    return res.status(status).json(message);
  };
}
