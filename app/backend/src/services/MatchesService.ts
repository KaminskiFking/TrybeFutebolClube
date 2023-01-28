import TeamsModel from '../models/TeamsModel';
import MatchesModel from '../models/MatchesModel';

export default class MacthesService {
  private model: MatchesModel;
  private teamModel: TeamsModel;

  constructor() {
    this.model = new MatchesModel();
    this.teamModel = new TeamsModel();
  }

  public async findAll(query?: string) {
    if (query === undefined) {
      const resultMatches = await this.model.findAll();
      return { status: 200, message: resultMatches };
    }
    const resultMatches = await this.model.findAll(query);
    return { status: 200, message: resultMatches };
  }

  public async create(
    homeTeamId: string,
    awayTeamId: string,
    homeTeamGoals: string,
    awayTeamGoals: string,
  ) {
    const teamOne = await this.teamModel.findById(homeTeamId);
    const teamTwo = await this.teamModel.findById(awayTeamId);

    if (!teamOne || !teamTwo) {
      return { status: 404, message: 'There is no team with such id!' };
    }

    if (homeTeamId === awayTeamId) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }

    const resultMatch = await this.model
      .create(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return { status: 201, data: resultMatch };
  }

  public async updateProgress(id: number) {
    await this.model.updateProgress(id);
    return { status: 200, message: 'Finished' };
  }

  public async updateScoreBoard(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    await this.model.updateScoreBoard(id, homeTeamGoals, awayTeamGoals);
    return { status: 200, message: 'ScoreBoard Updated' };
  }
}
