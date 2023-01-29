import TeamsModel from '../models/TeamsModel';
import MatchesModel from '../models/MatchesModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import IMatches from '../interfaces/IMatches';
import LeaderboardCalculator from '../helpers/leaderboardCalculator';

export default class LeaderboardService {
  private matchModel: MatchesModel;
  private teamModel: TeamsModel;
  private boardCalculator: LeaderboardCalculator;

  constructor() {
    this.matchModel = new MatchesModel();
    this.teamModel = new TeamsModel();
    this.boardCalculator = new LeaderboardCalculator();
  }

  public async createBoard(): Promise<ILeaderboard[]> {
    const teams = await this.teamModel.findAll();

    const board: ILeaderboard[] = teams.map((element) => ({
      name: element.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
    return board;
  }

  public async createResultsHome(): Promise<ILeaderboard[]> {
    const board = await this.createBoard();
    const matchs: IMatches[] = await this.matchModel.findAll('false');
    const resultHome: ILeaderboard[] = this.boardCalculator.calculatorHome(matchs, board);

    resultHome.sort((h, b) => b.totalPoints - h.totalPoints || b.goalsBalance - h.goalsBalance
    || b.goalsFavor - h.goalsFavor
    || b.goalsOwn - h.goalsOwn);
    return resultHome;
  }

  public async createResultsAway(): Promise<ILeaderboard[]> {
    const board = await this.createBoard();
    const matchs: IMatches[] = await this.matchModel.findAll('false');
    const resultAway = this.boardCalculator.calculatorAway(matchs, board);

    resultAway.sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return resultAway;
  }

  public async sumBoard(): Promise<ILeaderboard[]> {
    const home = await this.createResultsHome();
    const away = await this.createResultsAway();
    const board = home.map((data) => {
      const team = away.find((e) => data.name === e.name) as ILeaderboard;
      team.totalPoints += data.totalPoints;
      team.totalDraws += data.totalDraws;
      team.totalVictories += data.totalVictories;
      team.totalLosses += data.totalLosses;
      team.totalGames += data.totalGames;
      team.goalsFavor += data.goalsFavor;
      team.goalsOwn += data.goalsOwn;
      team.goalsBalance += data.goalsBalance;
      team.efficiency = this.boardCalculator.calculate(team);
      return team;
    });
    board.sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);
    return board;
  }
}
