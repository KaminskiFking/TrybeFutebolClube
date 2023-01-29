import IMatches from '../interfaces/IMatches';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class LeaderboardCalculator {
  public calculate = (team: ILeaderboard) => {
    const games = team.totalDraws + team.totalLosses + team.totalVictories;
    const efficiency = (((team.totalPoints / (games * 3))) * 100).toFixed(2);
    return parseFloat(efficiency);
  };

  public calculatorHome = (
    homeBoard: IMatches[],
    board: ILeaderboard[],
  ) => {
    homeBoard.forEach((data) => {
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
  };

  public calculatorAway = (
    awayBoard: IMatches[],
    board: ILeaderboard[],
  ) => {
    awayBoard.forEach((data) => {
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
  };
}
