import * as React from 'react';
import { VotingScreenComponent, Props } from './index';
import { mount } from 'enzyme';
import Player from '../types/player';
import Vote from '../types/vote';
import PlayerRole from '../types/player_role';
import { GameManagement } from '../game_management';
import { PlayerListComponent } from '../player_list';
import { PlayerContent } from './player_content';

const makePlayer = (override: Partial<Player> = {}): Player => ({
  id: override.id || 'id',
  numberAtTable: override.numberAtTable || 0,
  nickname: override.nickname || 'name',
  avatar: override.avatar || 'src',
  dayDeathNumber: override.dayDeathNumber || undefined,
  warningCount: override.warningCount || 0,
  role: override.role ||  PlayerRole.Citizen,
});

const makeVote = (override: Partial<Vote> = {}): Vote => ({
  id: 'id',
  votingID: 'voting id',
  playerID: 'player id',
  ...override,
});

const makeVotesByPlayerIDs = (IDs: string[]) => IDs.map(id => makeVote({ playerID: id }));

const makePlayersByIDs = (IDs: string[]) => IDs.map(id => makePlayer({ id }));

const render = (overrideProps: Partial<Props> = {}) => {
  const props = {
    currentDay: 0,
    players: [],
    votes: [],
    onToggleVote: () => ({}),
    onNext: () => ({}),
    elimenationPlayer: makePlayer({ nickname: 'elimenationPlayer' }),
    ...overrideProps
  };
  
  const wrapper = mount(<VotingScreenComponent {...props} />);
  
  return {
    wrapper,
    gameManagementWrapper: () => wrapper.find(GameManagement),
    playerListWrapper: () => wrapper.find(PlayerListComponent),
    playerContents: () => wrapper.find(PlayerContent),
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

      const { gameManagementWrapper } = render({ eliminationPlayer });

      expect(gameManagementWrapper().at(0).props().title).toBe(`Голосование за вылет игрока ${playerName}`);
    });
    it('Должен вызывать onNext при нажатии на соотв кнопку', () => {
      const elimenationPlayer = makePlayer({ nickname: 'test name' });
      const onNext = jest.fn();
      const { gameManagementWrapper } = render({ eliminationPlayer, onNext });

      // tslint:disable-next-line no-any
      (gameManagementWrapper().prop('onNext') as any )();

      expect(onNext.mock.calls.length).toBe(1);
    });
    it('Должен отображать список игроков с кнопкой голоса', () => {
      const players = makePlayersByIDs(['1', '2', '3']);
      const votes = makeVotesByPlayerIDs(['1', '3']);

      const { playerListWrapper, playerContents } = render({ players, votes });

      expect(playerListWrapper().exists()).toBe(true);
      expect(playerContents().length).toBe(3);
      expect(playerContents().at(0).props().value).toBe(true);
      expect(playerContents().at(1).props().value).toBe(false);
      expect(playerContents().at(2).props().value).toBe(true);
    });
    it('Должен при нажатии кнопки голоса вызывать onToggle и передавать id игроков который голосует и за которого голосуют', () => {
      const elimenationPlayer = makePlayer({ id: 'elimenationPlayer id' });
      const player1 = makePlayer({ id: 'player1 id' });
      const player2 = makePlayer({ id: 'player2 id' });
      const onToggleVote = jest.fn();

      const { playerContents } = render({ players: [player1, player2], eliminationPlayer, onToggleVote });

      // simulate onToggleVote call from PlayerContent component
      playerContents().at(0).props().onToggleVote();
      playerContents().at(1).props().onToggleVote();

      expect(onToggleVote.mock.calls[0][0]).toBe(elimenationPlayer.id);
      expect(onToggleVote.mock.calls[0][1]).toBe(player1.id);
      expect(onToggleVote.mock.calls[0][0]).toBe(elimenationPlayer.id);
      expect(onToggleVote.mock.calls[1][1]).toBe(player2.id);
    });
    it('Должен давать возможность дисейблить список игроков', () => {
      const { playerListWrapper } = render({ disablePlayerList: true });

      expect(playerListWrapper().props().disable).toBe(true);
    });
    // Подумать над nextDescription

    // Вынести makePlayer в utils, сделать рефакторинг для других тестов
  });
});
