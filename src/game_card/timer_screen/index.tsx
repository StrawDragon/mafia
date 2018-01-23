import * as React from 'react';
import { connect } from 'react-redux';
import * as Action from '../actions';
import { PlayerList } from '../player_list';
import { Fragment } from '../../common/components/fragment';
import { GameManagement } from '../game_management';
import Timer from '../timer';

interface Props {
  stageTitle: string;
  nextDescription: string;
  onNext: () => void;
}

class TimerScreenComponent extends React.Component<Props> {
  render() {
    const { onNext, stageTitle, nextDescription } = this.props;
    return (
      <Fragment>
        <GameManagement
          title={stageTitle}
          nextDescription={nextDescription}
          onNext={onNext}
        />
        <Timer />
        <PlayerList />
      </Fragment>
    );
  }
}

export const TimerScreen = connect(
  () => ({}),
  (dispatch) => ({
    onNext: () => { dispatch(Action.requestNext()); }
  }),
)(TimerScreenComponent);