import { Observable } from 'rxjs';
import { combineEpics, ActionsObservable } from 'redux-observable';
import { MiddlewareAPI } from 'redux';
import { SimpleAction } from '../common/types/action';
import { RootState } from '../common/reducer/root';
import { Sound } from '../common/utils/sound';
import ActionTypes from '../common/constants/actionTypes';
import * as Actions from './actions';

export const startTimerEpic = (action$: ActionsObservable<SimpleAction>, store: MiddlewareAPI<RootState>) => {
  const timerTickSound$ = Observable
  .ajax({url: '/audio/timer_tick.mp3', responseType: 'arraybuffer'})
  .map(result => new Sound(result.response))
  .switchMap(sound => Observable
    .fromPromise(sound.init())
    .mapTo(sound)
  );

  const endTimerSound$ = Observable
  .ajax({url: '/audio/end_timer.mp3', responseType: 'arraybuffer'})
  .map(result => new Sound(result.response))
  .switchMap(sound => Observable
    .fromPromise(sound.init())
    .mapTo(sound)
  );

  const pipSound$ = Observable
  .ajax({url: '/audio/pip.wav', responseType: 'arraybuffer'})
  .map(result => new Sound(result.response))
  .switchMap(sound => Observable
    .fromPromise(sound.init())
    .mapTo(sound)
  );

  const pauseTimer$ = action$.ofType(ActionTypes.GameCard.TIMER_PAUSED);

  const startTimer$ = action$.ofType(ActionTypes.GameCard.TIMER_STARTED);

  return startTimer$
    .combineLatest(timerTickSound$, endTimerSound$, pipSound$)
    .switchMap(
      ([action, timerTickSound, endTimerSound, pipSound]) => {
        timerTickSound.play({ loop: true, startLoop: 1, endLoop: 15 });

        const halfTime = Math.round(store.getState().gameCard.timerValue / 2);

        return Observable
        .interval(1000)
        .takeUntil(pauseTimer$.do(() => timerTickSound.stop()))
        .map(() => {
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
        });
      }
    );
};

export default combineEpics(
  startTimerEpic,
);