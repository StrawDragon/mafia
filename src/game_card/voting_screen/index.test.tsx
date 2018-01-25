import * as React from 'react';
import { VotingScreenComponent, Props } from './index';
import { shallow } from 'enzyme';
import Player from '../types/player';
import PlayerRole from '../types/player_role';
import { GameManagement } from '../game_management';
import { PlayerList } from '../player_list';


const makePlayer = (override: Partial<Player> = {}): Player => ({
  id: override.id || 'id',
  numberAtTable: override.numberAtTable || 0,
  nickname: override.nickname || 'name',
  avatar: override.avatar || 'src',
  dayDeathNumber: override.dayDeathNumber || undefined,
  warningCount: override.warningCount || 0,
  role: override.role ||  PlayerRole.Citizen,
});

const makePlayersByIDs = (IDs: string[]) => IDs.map(id => makePlayer({ id }));

const render = (overrideProps: Partial<Props> = {}) => {
  const props = {
    elimenationPlayer: makePlayer({ nickname: 'elimenationPlayer' }),
    ...overrideProps
  };
  
  const wrapper = shallow(<VotingScreenComponent {...props} />);
  
  return {
    wrapper,
    gameManagementWrapper: () => wrapper.find(GameManagement),
    playerListWrapper: () => wrapper.find(PlayerList),
  };
};

describe('game_card / voting_screen', () => {
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
    it('Должен вызывать onNext при нажатии на соотв кнопку', () => {
      const elimenationPlayer = makePlayer({ nickname: 'test name' });
      const onNext = jest.fn();
      const { gameManagementWrapper } = render({ elimenationPlayer, onNext });

      gameManagementWrapper().simulate('next');

      expect(onNext.mock.calls.length).toBe(1);
    });
    // it('Должен отображать список игроков с кнопкой голоса', () => {
    //   const players = makePlayersByIDs(['1', '2', '3']);

    //   const { playerListWrapper } = render({ players });
      
    //   // expect(playerListWrapper().at(0).props().)
    // });
    // Должен при нажатии кнопки голоса вызывать onToggle и передавать id игроков который голосует и за которого голосуют
    // Должен давать возможность дисейблить список игроков
    // Подумать над nextDescription

    // Вынести makePlayer в utils, сделать рефакторинг для других тестов
  });
});
