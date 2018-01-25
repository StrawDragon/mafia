import * as React from 'react';
import { shallow } from 'enzyme';
import { PlayerListComponent, Props } from './index';
import Player from '../types/player';
import { PlayerCard } from '../player_card';
import PlayerRole from '../types/player_role';

const getPlayersByNames = (names: string[]): Player[] =>
  names.map((name, index) => ({
    id: `id ${index}`,
    numberAtTable: index,
    nickname: name,
    avatar: 'src',
    warningCount: 0,
    role: PlayerRole.Citizen,
  }));

const getPlayersByDayDeathNumbers = (dayDeathNumbers: Array<number | undefined>): Player[] =>
  dayDeathNumbers.map((dayDeathNumber, index) => ({
    id: `id ${index}`,
    numberAtTable: index,
    nickname: `name ${index}`,
    avatar: 'src',
    dayDeathNumber,
    warningCount: 0,
    role: PlayerRole.Citizen,
  }));

const render = (overwriteProps: Partial<Props> = {}) => {
  const props = {
    players: [],
    currentDay: 0,
    ...overwriteProps,
  };

  const wrapper = shallow(<PlayerListComponent {...props} />);

  return {
    wrapper,
    playerCardWrappers: () => wrapper.find(PlayerCard),
  };
};

describe('game_card/player_list', () => {
  describe('PlayerListComponent', () => {
    it('должен отрисовываться без ошибок', () => {
      const { wrapper } = render();

      expect(wrapper.exists()).toBe(true);
    });
    it('должен отрисовать карточки по списку игроков в порядке их номера за столом', () => {
      const name0 = 'name 0';
      const name1 = 'name 1';
      const name2 = 'name 2';
      
      const players = getPlayersByNames([name0, name1, name2]);

      const { playerCardWrappers } = render({ players });

      expect(playerCardWrappers().length).toBe(3);
      expect(playerCardWrappers().at(0).props().value.nickname).toBe(name0);
      expect(playerCardWrappers().at(1).props().value.nickname).toBe(name1);
      expect(playerCardWrappers().at(2).props().value.nickname).toBe(name2);
    });
    it('должен предоставлять метод для отрисовки дополнительной информации в карточке', () => {
      const name0 = 'name 0';
      const name1 = 'name 1';
      const name2 = 'name 2';
      
      const players = getPlayersByNames([name0, name1, name2]);
      const cardContentRenderer = jest.fn((value: Player) => value.nickname);

      const { playerCardWrappers } = render({ players, cardContentRenderer });

      expect(cardContentRenderer.mock.calls.length).toBe(3);

      expect(cardContentRenderer.mock.calls[0][0]).toBe(players[0]);
      expect(cardContentRenderer.mock.calls[1][0]).toBe(players[1]);
      expect(cardContentRenderer.mock.calls[2][0]).toBe(players[2]);

      expect(playerCardWrappers().at(0).contains(name0)).toBe(true);
      expect(playerCardWrappers().at(1).contains(name1)).toBe(true);
      expect(playerCardWrappers().at(2).contains(name2)).toBe(true);
    });
    it('должен по умолчанию устанавливать размер карточек в normal', () => {
      const name0 = 'name 0';
      const name1 = 'name 1';
      const name2 = 'name 2';
      
      const players = getPlayersByNames([name0, name1, name2]);

      const { playerCardWrappers } = render({ players });

      expect(playerCardWrappers().at(0).props().size).toBe('normal');
      expect(playerCardWrappers().at(1).props().size).toBe('normal');
      expect(playerCardWrappers().at(2).props().size).toBe('normal');
    });
    it('должен позволять устанавливать размер карточек в small', () => {
      const name0 = 'name 0';
      const name1 = 'name 1';
      const name2 = 'name 2';
      
      const cardSize = 'small';
      const players = getPlayersByNames([name0, name1, name2]);

      const { playerCardWrappers } = render({ players, cardSize });

      expect(playerCardWrappers().at(0).props().size).toBe(cardSize);
      expect(playerCardWrappers().at(1).props().size).toBe(cardSize);
      expect(playerCardWrappers().at(2).props().size).toBe(cardSize);
    });
    it('должен позволять выделить игрока по номеру за столом', () => {
      const name0 = 'name 0';
      const name1 = 'name 1';
      const name2 = 'name 2';
      
      const selectedPlayerNumber = 1;
      const players = getPlayersByNames([name0, name1, name2]);

      const { playerCardWrappers } = render({ players, selectedPlayerNumber });

      expect(playerCardWrappers().at(0).props().selected).toBe(false);
      expect(playerCardWrappers().at(1).props().selected).toBe(true);
      expect(playerCardWrappers().at(2).props().selected).toBe(false);
    });
    it('по умолчанию должен дисайблить мертвых', () => {
      const currentDay = 1;
      const players = getPlayersByDayDeathNumbers([undefined, 3, 0]);

      const { playerCardWrappers } = render({ players, currentDay });

      expect(playerCardWrappers().at(0).props().disabled).toBe(false);
      expect(playerCardWrappers().at(1).props().disabled).toBe(false);
      expect(playerCardWrappers().at(2).props().disabled).toBe(true);
    });
    it('должен предоставлять опцию для отключения дисейблинга мертвых', () => {
      const currentDay = 1;
      const players = getPlayersByDayDeathNumbers([undefined, 3, 0]);

      const { playerCardWrappers } = render({ players, currentDay, disableDeathPlayers: false });

      expect(playerCardWrappers().at(0).props().disabled).toBe(false);
      expect(playerCardWrappers().at(1).props().disabled).toBe(false);
      expect(playerCardWrappers().at(2).props().disabled).toBe(false);
    });
  });
  describe('PlayerListComponent', () => {
    it('должен отрисовать список игроков из стейта', () => {
      expect(false).toBe(true);
    });
    // если передан список игроков как параметр то должен отрисовать его
  });
});
