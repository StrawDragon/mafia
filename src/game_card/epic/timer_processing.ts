import * as Actions from '../actions';
import { MiddlewareAPI } from 'redux';
import { RootState } from '../../common/reducer/root';
import { Sound } from '../../common/utils/sound';

export const timerProcessing = (
  store: MiddlewareAPI<RootState>,
  pipSound: Sound,
  endTimerSound: Sound,
  halfTime: number,
) => () => {
  const state = store.getState();
  const newTimerValue = state.gameCard.timerValue - 1;

  if (newTimerValue === halfTime) {
    pipSound.play({ duration: 1 });
  }

  if (newTimerValue < 0) {
    endTimerSound.play({ duration: 3 });
    return Actions.pauseTimer();
  } else {
    if (newTimerValue <= 10) {
      pipSound.play({ duration: 0.75 });
    }

    return Actions.setTimer(newTimerValue);
  }
};