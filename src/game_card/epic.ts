import { Observable } from 'rxjs';
import { combineEpics, ActionsObservable } from 'redux-observable';
import { MiddlewareAPI } from 'redux';
import { SimpleAction } from '../common/types/action';
import { RootState } from '../common/reducer/root';
import ActionTypes from '../common/constants/actionTypes';
import * as Actions from './actions';

// tslint:disable-next-line
export const startTimerEpic = (action$: ActionsObservable<SimpleAction>, store: MiddlewareAPI<RootState>) => {

  const pauseTimer$ = action$.ofType(ActionTypes.GameCard.TIMER_PAUSED);

  return action$.ofType(ActionTypes.GameCard.TIMER_STARTED)
    .switchMap(
      action => Observable
        .interval(1000)
        .takeUntil(pauseTimer$)
        .map(() => {
          const state = store.getState();
          const newTimerValue = state.gameCard.timerValue - 1;

          if (newTimerValue < 0) {
            return Actions.pauseTimer();
          } else {
            return Actions.setTimer(newTimerValue);
          }
        })
    );
};

export default combineEpics(startTimerEpic);