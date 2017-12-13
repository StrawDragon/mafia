import PlayerRole from './player_role';

export default interface Player {
  id: string;
  numberAtTable: number;
  nickname: string;
  avatar: string;
  deathDayNumber?: number;
  warningCount: number;
  role: PlayerRole;
}
