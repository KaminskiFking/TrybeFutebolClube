import TeamsModel from '../models/TeamsModel';

export default class TeamsService {
  private model: TeamsModel;

  constructor() {
    this.model = new TeamsModel();
  }

  public async findAll() {
    const resultTeams = await this.model.findAll();
    return { status: 200, message: resultTeams };
  }

  public async findById(id: string) {
    const resultTeam = await this.model.findById(id);
    return { status: 200, message: resultTeam };
  }
}
