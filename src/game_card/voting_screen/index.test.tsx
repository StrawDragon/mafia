import * as React from 'react';
import { VotingScreenComponent, Props } from './index';
import { shallow } from 'enzyme';
import Player from '../types/player';
import PlayerRole from '../types/player_role';
import { GameManagement } from '../game_management';

const makePlayer = (override: Partial<Player> = {}): Player => ({
  id: override.id || 'id',
  numberAtTable: override.numberAtTable || 0,
  nickname: override.nickname || 'name',
  avatar: override.avatar || 'src',
  dayDeathNumber: override.dayDeathNumber || undefined,
  warningCount: override.warningCount || 0,
  role: override.role ||  PlayerRole.Citizen,
});

const render = (overrideProps: Partial<Props> = {}) => {
  const props = {
    elimenationPlayer: makePlayer({ nickname: 'elimenationPlayer' }),
    ...overrideProps
  };

  const wrapper = shallow(<VotingScreenComponent {...props} />);

  return {
    wrapper,
    gameManagementWrapper: () => wrapper.find(GameManagement),
  };
};

describe('game_card / voting_scrin', () => {
  describe('VotingScreenComponent', () => {
    it('Должен отрисовываться без ошибок', () => {
      const { wrapper } = render();

      expect(wrapper.exists()).toBe(true);
    });
    it('Должен отображать в заголовке сообщение об голосовании за игрока', () => {
      const playerName = 'test name';
      const elimenationPlayer = makePlayer({ nickname: playerName });

      const { gameManagementWrapper } = render({ elimenationPlayer });

      expect(gameManagementWrapper().at(0).props().title).toBe(`Голосование за вылет игрока ${playerName}`);
    });
    // Должен давать вызывать onNext при нажатии на соотв кнопку
    // Должен отображать список игроков с кнопкой голоса
    // Должен давать возможность дисейблить список игроков

    // Вынести makePlayer в utils, сделать рефакторинг для других тестов
  });
});
