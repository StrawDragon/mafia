import * as React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { RootState } from '../../common/reducer/root';
import getClassNames from '../../common/utils/get_class_names';
import * as Actions from '../actions';
import * as styles from './style.css';

interface Props {
  value: number;
  isRun: boolean;
  initialValue: number;
  onStart: () => void;
  onPause: () => void;
}

class Timer extends React.Component<Props> {
  render() {
    const { value, initialValue, isRun, onPause, onStart } = this.props;
    const { timer, fantom, progress, management } = styles;
    const widthValue = 10 / 6 * value + '%';
    const progressClassNames = getClassNames(progress, styles, {
      half: value <= initialValue / 2 && value > 10,
      warning: value <= 10
    });

    return (
      <div className={timer}>
        <div className={fantom}>
          <div className={progressClassNames} style={{ width: widthValue }} />
        </div>
        <div className={management}>
          {value}
          <Icon
            type={isRun ? 'pause' : 'caret-right'}
            onClick={isRun ? onPause : onStart}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state: RootState) => ({
    value: state.gameCard.currentTimerValue,
    isRun: state.gameCard.isRunTimer,
    initialValue: state.gameCard.initialTimerValue
  }),
  (dispatch) => ({
    onStart: () => { dispatch(Actions.startTimer()); },
    onPause: () => { dispatch(Actions.pauseTimer()); },
  }),
)(Timer);
