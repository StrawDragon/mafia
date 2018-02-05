import * as React from 'react';
import { connect } from 'react-redux';
import Player from "../types/player";
import * as Action from '../actions';
import { RootState } from "../../common/reducer/root";
import { Button } from 'antd';

interface Props {
  player: Player;
  currentSpeaker: Player;
  isSuspect: boolean;
  onSuspect: () => void;
}

class ToggleSuspectComponent extends React.Component<Props> {
  onSuspect() {
    const { player, currentSpeaker, onSuspect } = this.props;
        
    onSuspect(player.id, currentSpeaker.id);
  }

  render() {
    const { player, currentSpeaker, currentVoting } = this.props;

    return (
      <Button onClick={this.onSuspect}>

      </Button>
    );
  }
}

export default ToggleSuspect = connect(
  (state: RootState, ownProps: { player: Player }) => {
    const { players, stage: { currentSpeakerID }, day, votings } = state.gameCard;
    const currentSpeaker = players.find(player => player.id === currentSpeakerID);
    const isSuspect = votings.find(voting => voting.dayNumber === day && voting.playerID === player.id);

    return {
      currentSpeaker,
      isSuspect
    }
  },
  (dispatch) => ({
    onSuspect: () => { dispatch(Action.suspect()) }
  }),
)(ToggleSuspectComponent);

