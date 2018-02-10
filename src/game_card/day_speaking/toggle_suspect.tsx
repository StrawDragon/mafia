import * as React from 'react';
import { connect } from 'react-redux';
import Player from '../types/player';
import * as Action from '../actions';
import { RootState } from '../../common/reducer/root';
import { Button } from 'antd';

interface Props {
  player: Player;
  currentSpeaker: Player;
  isSuspect: boolean;
  onSuspect: (playerID: string, initiatorID: string) => void;
}

class ToggleSuspectComponent extends React.Component<Props> {
  onSuspect = () => {
    const { player, currentSpeaker, onSuspect } = this.props;
        
    onSuspect(player.id, currentSpeaker.id);
  }

  render() {
    const { isSuspect } = this.props;

    return (
      <Button onClick={this.onSuspect}>
        {isSuspect ? 'Выставлен' : 'Не Выставлен'}
      </Button>
    );
  }
}

export const ToggleSuspect = connect(
  (state: RootState, ownProps: { player: Player }) => {
    const { players, stage: { currentSpeakerID }, day, votings } = state.gameCard;
    const currentSpeaker = players.find(player => player.id === currentSpeakerID) || players[0];
    const isSuspect = !!votings.find(voting => voting.dayNumber === day && voting.playerID === ownProps.player.id);

    return {
      currentSpeaker,
      isSuspect,
      player: ownProps.player,
    };
  },
  (dispatch) => ({
    onSuspect: (playerID: string, initiatorID: string) => { dispatch(Action.toggleSuspect(playerID, initiatorID)); }
  }),
)(ToggleSuspectComponent);
