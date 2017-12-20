import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../common/reducer/root';
import * as Actions from '../actions';

interface Props {
  value: number;
  onStart: () => void;
  onPause: () => void;
}

class Timer extends React.Component<Props> {
  render() {
    const { value, onPause, onStart } = this.props;

    return (
      <div>
        <span>{value}</span>
        <button onClick={onStart}>start</button>
        <button onClick={onPause}>pause</button>
      </div>
    );
  }
}

export default connect(
  (state: RootState) => ({
    value: state.gameCard.timerValue,
  }),
  (dispatch) => ({
    onStart: () => { dispatch(Actions.startTimer()); },
    onPause: () => { dispatch(Actions.pauseTimer()); },
  }),
)(Timer);
