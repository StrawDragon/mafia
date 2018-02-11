import * as React from 'react';
import { connect } from 'react-redux';
import Player from '../types/player';
import Vote from '../types/vote';
import { RootState } from '../../common/reducer/root';
import { GameManagement } from '../game_management';
import { PlayerListComponent } from '../player_list';
import { PlayerContent } from './player_content';
import * as Actions from '../actions';

export interface Props {
  currentDay: number;
  eliminationPlayer?: Player;
  disablePlayerList?: boolean;
  players: Array<Player>;
  votes: Array<Vote>;
  onToggleVote: (eliminationPlayerID: string, votingPlayerID: string) => void;
  onNext: () => void;
}

export class VotingScreenComponent extends React.Component<Props> {
  cardContentRenderer = (player: Player) => {
    const { votes, eliminationPlayer, onToggleVote } = this.props;

    const value = !!votes.find(vote => vote.playerID === player.id);
    const eliminationPlayerID = eliminationPlayer ? eliminationPlayer.id : '';

    return (
      <PlayerContent
        value={value}
        onToggleVote={() => onToggleVote(eliminationPlayerID, player.id)}
      />
    );
  }

  render() {
    const { eliminationPlayer, onNext, players, currentDay, disablePlayerList } = this.props;

    const eliminationPlayerNickname = eliminationPlayer ? eliminationPlayer.nickname : 'player';
    return (
      <div>
        <GameManagement
          title={`Голосование за вылет игрока ${eliminationPlayerNickname}`}
          nextDescription={'next'}
          onNext={onNext}
        />
        <PlayerListComponent
          players={players}
          currentDay={currentDay}
          cardContentRenderer={this.cardContentRenderer}
          disable={disablePlayerList}
        />
      </div>
    );
  }
}

export const VotingScreen = connect(
  (state: RootState) => {
    const { votings, players } = state.gameCard;
    const { currentVotingID } = state.gameCard.stage;

    const currentVoting = votings.find(voting => voting.id === currentVotingID);
    const eliminationPlayerID = currentVoting ? currentVoting.playerID : '';
    const eliminationPlayer = players.find(player => player.id === eliminationPlayerID);

    return {
      currentDay: state.gameCard.day,
      eliminationPlayer,
      players: state.gameCard.players,
      votes: state.gameCard.votes,
    };
  },
  (dispatch) => ({
    onToggleVote: (eliminationPlayerID: string, votingID: string) => {},
    onNext: () => { dispatch(Actions.requestNext()); },
  }),
)(VotingScreenComponent);
