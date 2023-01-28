import Matches from '../database/models/Matches';

export interface TeamType {
  id: number;
  teamName: string;
  homeMatchs?: [Matches];
  awayMatchs?: [Matches];
}
