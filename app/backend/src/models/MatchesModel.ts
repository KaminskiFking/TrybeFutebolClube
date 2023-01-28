import Teams from '../database/models/Teams';
import MatchModel from '../database/models/Matches';
import ICreateMatch from '../interfaces/ICreateMatch';
import IMatches from '../interfaces/IMatches';

export default class MatchesModel {
  private model = MatchModel;

  public async findAll(query?: string): Promise<IMatches[]> {
    if (query) {
      const result = await this.model.findAll({
        where: { inProgress: query === 'true' || false },
        include: [
          { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      });
      return result as unknown as IMatches[];
    }
    const result = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return result as unknown as IMatches[];
  }

  public async create(
    homeTeamId: string,
    awayTeamId: string,
    homeTeamGoals: string,
    awayTeamGoals: string,
  ): Promise<ICreateMatch> {
    const result = await this.model
      .create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true });
    return result as ICreateMatch;
  }

  public async updateProgress(idFind: number) {
    const result = await this.model.update({ inProgress: false }, {
      where: {
        id: idFind,
      },
    });
    return result;
  }

  public async updateScoreBoard(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
  }
}
