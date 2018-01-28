import {getWinner} from './get_winner';
import PlayerRole from './../types/player_role';
import Player from './../types/player';

const playerByRole = (role: PlayerRole): Player => ({
  id: 'id',
  numberAtTable: 0,
  nickname: 'name',
  avatar: 'link',
  warningCount: 0,
  role,
});

const playersByDistribution = ( distribution: {[role: string]: number} ) =>
  Object.keys(distribution)
    .reduce(
      (players, role) => {
        const count = distribution[role];
        for (let i = 0; i < count; i++) {
          players.push(playerByRole(Number.parseInt(role)));
        }
        return players;
      },
      [] as Player[],
    );

describe('game_card/core/get_winner', () => {
  describe('getWinner()', () => {
    it('функция должна возвращать false если нет победителя', () => {
      const players = playersByDistribution({
        [PlayerRole.Citizen]: 6,
        [PlayerRole.Don]: 1,
        [PlayerRole.Mafia]: 2,
        [PlayerRole.Sheriff]: 1,
      });
      const actual = getWinner(players);
      expect(actual).toBe(false); 
    })
    it('функция должна возвращать PlayerRole.Mafia если победила мафия', () => {
      const players = playersByDistribution({
        [PlayerRole.Citizen]: 2,
        [PlayerRole.Don]: 1,
        [PlayerRole.Mafia]: 2,
        [PlayerRole.Sheriff]: 0,
      });
      const actual = getWinner(players);
      expect(actual).toBe(PlayerRole.Mafia); 
    })
    it('функция должна возвращать PlayerRole.Citizen если победили мирные', () => {
      const players = playersByDistribution({
        [PlayerRole.Citizen]: 4,
        [PlayerRole.Don]: 0,
        [PlayerRole.Mafia]: 0,
        [PlayerRole.Sheriff]: 1,
      });
      const actual = getWinner(players);
      expect(actual).toBe(PlayerRole.Citizen); 
    }) 
    it('победила mafia если количество мафии равно количеству мирных', () => {
      const players = playersByDistribution({
        [PlayerRole.Citizen]: 3,
        [PlayerRole.Don]: 1,
        [PlayerRole.Mafia]: 3,
        [PlayerRole.Sheriff]: 1,
      });
      const actual = getWinner(players);
      expect(actual).toBe(PlayerRole.Mafia); 
    }) 
  })
})