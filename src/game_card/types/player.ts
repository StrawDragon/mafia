import PlayerRole from './player_role';

export default interface Player {
  id: string;
  numberAtTable: number;
  nickname: string;
  avatar: string;
  dayDeathNumber?: number;
  warningCount: number;
  role: PlayerRole;
}
