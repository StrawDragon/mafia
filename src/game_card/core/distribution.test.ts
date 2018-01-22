import { validateDistribution } from './distribution';
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

describe('game_card › core › distribution', () => {
  describe('validateDistribution()', () => {
    it('Должна быть ошибка если раздача полностью не верная', () => {
      const players = playersByDistribution({
        [PlayerRole.Citizen]: 10,
        [PlayerRole.Don]: 0,
        [PlayerRole.Mafia]: 0,
        [PlayerRole.Sheriff]: 0,
      });
      const expected = {
        hasError: true,
        [PlayerRole.Citizen]: {hasError: true, count: 10 },
        [PlayerRole.Don]: {hasError: true, count: 0 },
        [PlayerRole.Mafia]: {hasError: true, count: 0 },
        [PlayerRole.Sheriff]: {hasError: true, count: 0 },
      };
      const actual = validateDistribution(players);

      expect(actual).toEqual(expected);
    });
    it('Должно быть 6 горожан', () => {
      const players = playersByDistribution({
        [PlayerRole.Citizen]: 6,
        [PlayerRole.Don]: 4,
        [PlayerRole.Mafia]: 0,
        [PlayerRole.Sheriff]: 0,
      });
      const expected = {
        hasError: true,
        [PlayerRole.Citizen]: {hasError: false, count: 6 },
        [PlayerRole.Don]: {hasError: true, count: 4 },
        [PlayerRole.Mafia]: {hasError: true, count: 0 },
        [PlayerRole.Sheriff]: {hasError: true, count: 0 },
      };
      const actual = validateDistribution(players);

      expect(actual).toEqual(expected);
    });
    it('Должен быть 1 шериф', () => {
      const players = playersByDistribution({
        [PlayerRole.Citizen]: 5,
        [PlayerRole.Don]: 4,
        [PlayerRole.Mafia]: 0,
        [PlayerRole.Sheriff]: 1,
      });
      const expected = {
        hasError: true,
        [PlayerRole.Citizen]: {hasError: true, count: 5 },
        [PlayerRole.Don]: {hasError: true, count: 4 },
        [PlayerRole.Mafia]: {hasError: true, count: 0 },
        [PlayerRole.Sheriff]: {hasError: false, count: 1 },
      };
      const actual = validateDistribution(players);

      expect(actual).toEqual(expected);
    });
    it('Должно быть 2 мафии', () => {
      const players = playersByDistribution({
        [PlayerRole.Citizen]: 4,
        [PlayerRole.Don]: 4,
        [PlayerRole.Mafia]: 2,
        [PlayerRole.Sheriff]: 0,
      });
      const expected = {
        hasError: true,
        [PlayerRole.Citizen]: {hasError: true, count: 4 },
        [PlayerRole.Don]: {hasError: true, count: 4 },
        [PlayerRole.Mafia]: {hasError: false, count: 2 },
        [PlayerRole.Sheriff]: {hasError: true, count: 0 },
      };
      const actual = validateDistribution(players);

      expect(actual).toEqual(expected);
    });
    it('Должен быть 1 дон', () => {
      const players = playersByDistribution({
        [PlayerRole.Citizen]: 8,
        [PlayerRole.Don]: 1,
        [PlayerRole.Mafia]: 1,
        [PlayerRole.Sheriff]: 0,
      });
      const expected = {
        hasError: true,
        [PlayerRole.Citizen]: {hasError: true, count: 8 },
        [PlayerRole.Don]: {hasError: false, count: 1 },
        [PlayerRole.Mafia]: {hasError: true, count: 1 },
        [PlayerRole.Sheriff]: {hasError: true, count: 0 },
      };
      const actual = validateDistribution(players);

      expect(actual).toEqual(expected);
    });
    it('Не должна быть ошибка если раздача верная', () => {
      const players = playersByDistribution({
        [PlayerRole.Citizen]: 6,
        [PlayerRole.Don]: 1,
        [PlayerRole.Mafia]: 2,
        [PlayerRole.Sheriff]: 1,
      });
      const expected = {
        hasError: false,
        [PlayerRole.Citizen]: {hasError: false, count: 6 },
        [PlayerRole.Don]: {hasError: false, count: 1 },
        [PlayerRole.Mafia]: {hasError: false, count: 2 },
        [PlayerRole.Sheriff]: {hasError: false, count: 1 },
      };
      const actual = validateDistribution(players);

      expect(actual).toEqual(expected);
    });
  });
});
