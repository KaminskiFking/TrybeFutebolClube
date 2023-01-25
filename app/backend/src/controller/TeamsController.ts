import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private services = new TeamsService()) {}

  public findAll = async (_req: Request, res: Response) => {
    const { status, message } = await this.services.findAll();
    return res.status(status).json(message);
  };

  public findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message } = await this.services.findById(id);
    return res.status(status).json(message);
  };
}
