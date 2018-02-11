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
  eliminationPlayer: Player | undefined;
  players: Array<Player>;
  votes: Array<Vote>;
  disabledPlayers: Array<Player>;
  onToggleVote: (playerID: string) => void;
  onNext: () => void;
}

export class VotingScreenComponent extends React.Component<Props> {
  cardContentRenderer = (player: Player) => {
    const { votes, eliminationPlayer, onToggleVote, disabledPlayers } = this.props;

    if (!eliminationPlayer) {
      return null;
    }

    const value = !!votes.find(vote => vote.playerID === player.id);
    const disabled = !!disabledPlayers.find(disabledPlayer => disabledPlayer === player);

    return (
      <PlayerContent
        value={value}
        onToggleVote={() => onToggleVote(player.id)}
        disable={disabled}
      />
    );
  }

  render() {
    const { eliminationPlayer, onNext, players, currentDay } = this.props;

    const title = eliminationPlayer ? `Голосование за вылет игрока ${eliminationPlayer.nickname}` : 'Нет игроков выставленных на голосование';
    const selectedPlayerNumber = eliminationPlayer ? eliminationPlayer.numberAtTable : undefined;
    return (
      <div>
        <GameManagement
          title={title}
          nextDescription={'next'}
          onNext={onNext}
        />
        <PlayerListComponent
          players={players}
          currentDay={currentDay}
          cardContentRenderer={this.cardContentRenderer}
          selectedPlayerNumber={selectedPlayerNumber}
        />
      </div>
    );
  }
}

export const VotingScreen = connect(
  (state: RootState) => {
    const { votings, players, votes, day } = state.gameCard;
    const { currentVotingID } = state.gameCard.stage;

    const currentVotingIndex = votings.findIndex(voting => voting.id === currentVotingID);
    const prevDayVotings = votings.filter((voting, index) => voting.dayNumber === day && index < currentVotingIndex);
    const eliminationPlayerID = currentVotingIndex > -1 ? votings[currentVotingIndex].playerID : '';
    const eliminationPlayer = players.find(player => player.id === eliminationPlayerID);

    const disabledPlayers = players.filter(player => {
      const playerVote = votes.find(vote => vote.playerID === player.id && vote.votingID === currentVotingID);
      
      if (!playerVote) {
        return false;
      }

      const isPrevVote = !!prevDayVotings.find(voting => playerVote.votingID === voting.id);

      return isPrevVote;
    });

    return {
      currentDay: day,
      eliminationPlayer,
      disabledPlayers,
      players: players,
      votes: votes,
    };
  },
  (dispatch) => ({
    onToggleVote: (playerID: string) => { dispatch(Actions.toggleVote(playerID)); },
    onNext: () => { dispatch(Actions.requestNext()); },
  }),
)(VotingScreenComponent);
