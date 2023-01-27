import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './Teams';

export default class Matches extends Model {
  id!: number;
  homeTeamId!: number;
  homeTeamGoals!: number;
  awayTeamId!: number;
  awayTeamGoal!: number;
  inProgress!: string;
  homeTeam!: {
    teamName: string,
  };

  awayTeam!: {
    teamName: string,
  };
}
Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeMatches' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayMatches' });
