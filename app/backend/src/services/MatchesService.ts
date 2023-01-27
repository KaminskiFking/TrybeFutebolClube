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
      if (!resultMatches) {
        return { status: 400, message: 'Not Found Matches' };
      }
      return { status: 200, message: resultMatches };
    }
    const resultMatches = await this.model.findAll(query);
    if (!resultMatches) {
      return { status: 400, message: 'Not Found Matches' };
    }
    return { status: 200, message: resultMatches };
  }

  public async create(
    homeTeamId: string,
    awayTeamId: string,
    homeTeamGoals: string,
    awayTeamGoals: string,
  ) {
    if (homeTeamId === awayTeamId) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }

    const teamOne = await this.teamModel.findById(homeTeamId);
    const teamTwo = await this.teamModel.findById(awayTeamId);

    if (!teamOne || !teamTwo) {
      return { status: 404, message: 'There is no team with such id!' };
    }

    const resultMatch = await this.model
      .create(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return { status: 201, message: resultMatch };
  }

  public async updateProgress(id: number) {
    const resultMatches = await this.model.updateProgress(id);
    if (!resultMatches) {
      return { status: 400, message: 'Not Found Id' };
    }
    return { status: 200, message: 'Finished' };
  }

  public async updateScoreBoard(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    await this.model.updateScoreBoard(id, homeTeamGoals, awayTeamGoals);
    return { status: 200, message: 'ScoreBoard Updated' };
  }
}
