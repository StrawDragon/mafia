import { Observable,  } from 'rxjs';
import { combineEpics, ActionsObservable } from 'redux-observable';
import { MiddlewareAPI } from 'redux';
import { SimpleAction } from '../../common/types/action';
import { RootState } from '../../common/reducer/root';
import { loadSound } from '../../common/utils/load_sound';
import { timerProcessing } from './timer_processing';
import ActionTypes from '../../common/constants/actionTypes';

export const timerEpic = (action$: ActionsObservable<SimpleAction>, store: MiddlewareAPI<RootState>) => {
  const timerTickSound$ = loadSound('/audio/timer_tick.mp3');
  const endTimerSound$ = loadSound('/audio/end_timer.mp3');
  const pipSound$ = loadSound('/audio/pip.wav');

  const pauseTimer$ = action$.ofType(ActionTypes.GameCard.TIMER_PAUSED);
  const startTimer$ = action$.ofType(ActionTypes.GameCard.TIMER_STARTED);
  const nextRequest$ = action$.ofType(ActionTypes.GameCard.NEXT_REQUESTED);

  return startTimer$
    .combineLatest(timerTickSound$, endTimerSound$, pipSound$)
    .switchMap(
      ([action, timerTickSound, endTimerSound, pipSound]) => {
        const halfTime = Math.round(store.getState().gameCard.currentTimerValue / 2);
        const stop$ = pauseTimer$.merge(nextRequest$).do(() => timerTickSound.stop());

        timerTickSound.play({ loop: true, startLoop: 1, endLoop: 15 });

        return Observable
        .interval(1000)
        .takeUntil(stop$)
        .map(timerProcessing(store, pipSound, endTimerSound, halfTime));
      }
    );
};

export default combineEpics(
  timerEpic
);