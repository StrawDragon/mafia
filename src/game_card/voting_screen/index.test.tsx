import * as React from 'react';
import { VotingScreenComponent, Props } from './index';
import { mount } from 'enzyme';
import { makePlayer, makePlayersByIDs } from '../utils/player';
import Vote from '../types/vote';

import { GameManagement } from '../game_management';
import { PlayerListComponent } from '../player_list';
import { PlayerContent } from './player_content';

const makeVote = (override: Partial<Vote> = {}): Vote => ({
  id: 'id',
  votingID: 'voting id',
  playerID: 'player id',
  ...override,
});

const makeVotesByPlayerIDs = (IDs: string[]) => IDs.map(id => makeVote({ playerID: id }));

const render = (overrideProps: Partial<Props> = {}) => {
  const props = {
    currentDay: 0,
    players: [],
    votes: [],
    disabledPlayers: [],
    onToggleVote: () => ({}),
    onNext: () => ({}),
    eliminationPlayer: makePlayer({ nickname: 'eliminationPlayer' }),
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
      const eliminationPlayer = makePlayer({ nickname: playerName });

      const { gameManagementWrapper } = render({ eliminationPlayer });

      expect(gameManagementWrapper().at(0).props().title).toBe(`Голосование за вылет игрока ${playerName}`);
    });
    it('Должен вызывать onNext при нажатии на соотв кнопку', () => {
      const eliminationPlayer = makePlayer({ nickname: 'test name' });
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
      const eliminationPlayer = makePlayer({ id: 'eliminationPlayer id' });
      const player1 = makePlayer({ id: 'player1 id' });
      const player2 = makePlayer({ id: 'player2 id' });
      const onToggleVote = jest.fn();

      const { playerContents } = render({ players: [player1, player2], eliminationPlayer, onToggleVote });

      // simulate onToggleVote call from PlayerContent component
      playerContents().at(0).props().onToggleVote();
      playerContents().at(1).props().onToggleVote();

      expect(onToggleVote.mock.calls[0][0]).toBe(eliminationPlayer.id);
      expect(onToggleVote.mock.calls[0][1]).toBe(player1.id);
      expect(onToggleVote.mock.calls[0][0]).toBe(eliminationPlayer.id);
      expect(onToggleVote.mock.calls[1][1]).toBe(player2.id);
    });

    // Вынести makePlayer в utils, сделать рефакторинг для других тестов
  });
});
