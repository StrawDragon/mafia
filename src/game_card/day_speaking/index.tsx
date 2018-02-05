import * as React from 'react';
import { connect } from 'react-redux';
import * as Action from '../actions';
import { PlayerList } from '../player_list';
import { Fragment } from '../../common/components/fragment';
import { GameManagement } from '../game_management';
import Timer from '../timer';
import { RootState } from '../../common/reducer/root';
import Player from "../types/player";

interface Props {
  currentSpeaker: Player;
  onNext: () => void;
}

class DaySpeakingComponent extends React.Component<Props> {
  ToggleSuspectRender(player: Player) {
    return <ToggleSuspect player={player} />;
  }

  render() {
    const { onNext, currentSpeaker } = this.props;
    return (<Fragment>
      <GameManagement
        title={`Говорит господин ${currentSpeaker.nickname}`}
        nextDescription={'Перейти к следующему игроку'}
        onNext={onNext}
      />
      <Timer />
      <PlayerList
        selectedPlayerNumber={currentSpeaker.numberAtTable}
        cardContentRenderer={this.ToggleSuspectRender}
      />
    </Fragment>);
  }
}

export const DaySpeaking = connect(
  (state: RootState) => {
    const { players, stage: { currentSpeakerID } } = state.gameCard;
    const currentSpeaker = players.find(player => player.id === currentSpeakerID);
    return {
      currentSpeaker
    }
  },
  (dispatch) => ({
    onNext: () => { dispatch(Action.requestNext()) }
  }),
)(DaySpeakingComponent);
