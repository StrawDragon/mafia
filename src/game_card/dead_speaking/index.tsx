import * as React from 'react';
import { connect } from 'react-redux';
import * as Action from '../actions';
import { PlayerList } from '../player_list';
import { Fragment } from '../../common/components/fragment';
import { GameManagement } from '../game_management';
import Player from '../types/player';
import Timer from '../timer';
import { RootState } from '../../common/reducer/root';

interface Props {
  onNext: () => void;
  currentSpeaker: Player | undefined;
}

class DeadSpeakingComponent extends React.Component<Props> {
  render() {
    const { currentSpeaker, onNext } = this.props;

    if (!currentSpeaker) { return null; }

    return (
    <Fragment>
      <GameManagement
        title={`Последнее слово господина ${currentSpeaker.nickname}`}
        nextDescription="Перейти к следующему игроку"
        onNext={onNext}
      />
      <Timer />
      <PlayerList selectedPlayerNumber={currentSpeaker.numberAtTable}/>
    </Fragment>
    );
  }
}

export const DeadSpeaking = connect(
  (state: RootState) => {
    const { players, stage: { currentSpeakerID } } = state.gameCard;

    const currentSpeaker = players.find(player => player.id === currentSpeakerID);
    return {
      currentSpeaker
    };
  },
  (dispatch) => ({
    onNext: () => { dispatch(Action.requestNext()); }
  }),
)(DeadSpeakingComponent);