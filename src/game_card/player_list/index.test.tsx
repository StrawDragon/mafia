import * as React from 'react';
import { shallow } from 'enzyme';
import { PlayerListComponent, Props } from './index';
import { CardSize } from '../types/card_size';
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

const render = (overwriteProps: Partial<Props> = {}) => {
  const props = {
    players: [],
    ...overwriteProps,
  };

  const wrapper = shallow(<PlayerListComponent {...props} />);

  return {
    wrapper,
    playersWrapper: () => wrapper.find(PlayerCard),
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

      const { playersWrapper } = render({ players });

      expect(playersWrapper().length).toBe(3);
      expect(playersWrapper().at(0).props().value.nickname).toBe(name0);
      expect(playersWrapper().at(1).props().value.nickname).toBe(name1);
      expect(playersWrapper().at(2).props().value.nickname).toBe(name2);
    });
    // должен предоставлять метод для отрисовки дополнительной информации в карточке
    // должен поддерживать разные размеры карточек
    // выделение игрока
    // опциональный дизейблинг мертвых игроков
  });
});