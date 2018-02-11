import Player from '../types/player';
import PlayerRole from '../types/player_role';

export const makePlayer = (override: Partial<Player> = {}): Player => ({
  id: override.id || 'id',
  numberAtTable: override.numberAtTable || 0,
  nickname: override.nickname || 'name',
  avatar: override.avatar || 'src',
  dayDeathNumber: override.dayDeathNumber || undefined,
  warningCount: override.warningCount || 0,
  role: override.role ||  PlayerRole.Citizen,
});

export const makePlayersByIDs = (IDs: string[]) => IDs.map(id => makePlayer({ id }));