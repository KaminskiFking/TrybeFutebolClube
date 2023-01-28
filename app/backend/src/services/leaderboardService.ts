import TeamsModel from '../models/TeamsModel';
import MatchesModel from '../models/MatchesModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import IMatches from '../interfaces/IMatches';

export default class LeaderboardService {
  private matchModel: MatchesModel;
  private teamModel: TeamsModel;

  constructor() {
    this.matchModel = new MatchesModel();
    this.teamModel = new TeamsModel();
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

  public calculate = (team: ILeaderboard) => {
    const games = team.totalDraws + team.totalLosses + team.totalVictories;
    const efficiency = (((team.totalPoints / (games * 3))) * 100).toFixed(2);
    return parseFloat(efficiency);
  };

  public async createResultsHome(): Promise<ILeaderboard[]> {
    const board = await this.createBoard();
    const matchs: IMatches[] = await this.matchModel.findAll('false');
    matchs.forEach((data) => {
      const team = board.find((e) => data.homeTeam.teamName === e.name) as ILeaderboard;
      if (data.homeTeamGoals > data.awayTeamGoals) {
        team.totalPoints += 3;
        team.totalVictories += 1;
      } else if (data.homeTeamGoals < data.awayTeamGoals) {
        team.totalLosses += 1;
      } else { team.totalPoints += 1; team.totalDraws += 1; }
      team.totalGames += 1;
      team.goalsFavor += data.homeTeamGoals;
      team.goalsOwn += data.awayTeamGoals;
      team.goalsBalance = team.goalsFavor - team.goalsOwn;
      team.efficiency = this.calculate(team as ILeaderboard);
    });
    return board;
  }

  public async createResultsAway(): Promise<ILeaderboard[]> {
    const board = await this.createBoard();
    const matchs: IMatches[] = await this.matchModel.findAll('false');
    matchs.forEach((data) => {
      const team = board.find((e) => data.awayTeam.teamName === e.name) as ILeaderboard;
      if (data.awayTeamGoals > data.homeTeamGoals) {
        team.totalPoints += 3;
        team.totalVictories += 1;
      } else if (data.homeTeamGoals > data.awayTeamGoals) {
        team.totalLosses += 1;
      } else { team.totalPoints += 1; team.totalDraws += 1; }
      team.totalGames += 1;
      team.goalsFavor += data.awayTeamGoals;
      team.goalsOwn += data.homeTeamGoals;
      team.goalsBalance = team.goalsFavor - team.goalsOwn;
      team.efficiency = this.calculate(team as ILeaderboard);
    });
    return board;
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
      team.efficiency = this.calculate(team);
      return team;
    });
    board.sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);
    return board;
  }
}
