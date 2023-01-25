import TeamModel from '../database/models/Teams';
import ITeam from '../interfaces/ITeam';

export default class TeamsModel {
  private model = TeamModel;

  public async finAll(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    return result as ITeam[];
  }

  public async findById(id: string): Promise<ITeam> {
    const result = await this.model.findOne({ where: { id } });
    return result as ITeam;
  }
}
