import { TestScheduler, Observable } from 'rxjs';
import { ActionsObservable, Epic } from 'redux-observable';
import { MiddlewareAPI } from 'redux';
import { RootState } from '../reducer/root';
import { mockStore } from './mock_store';
import { mock, unmockAll, getOriginal } from 'omock';

type TestEpicOptions = {
  store?: MiddlewareAPI<RootState>;
  customExpect?: () => void;
  maxFrames?: number;
};

// tslint:disable-next-line
const mockTimers = (scheduler: any) => {
  // tslint:disable-next-line
  mock(Observable, 'interval', (...args: Array<any>) => getOriginal(Observable, 'interval')(...args, scheduler));
};

type MarblesData<A> = { [frameAlias: string]: A };
// tslint:disable-next-line
export const testEpic = (epic: Epic<any, RootState>, inputMarble: string, outputMarble: string, marblesData: MarblesData<any>, options: TestEpicOptions = {}) => {
  const store = options.store || mockStore({});
  // tslint:disable-next-line
  const customExpect = options.customExpect || (() => {});

  const scheduler = new TestScheduler((actual, expected) => {
    unmockAll();
    customExpect();
    expect(actual).toEqual(expected);
  });

  scheduler.maxFrames = options.maxFrames || 1000;

  mockTimers(scheduler);

  const inputActions$ = scheduler.createHotObservable(inputMarble, marblesData);
  // tslint:disable-next-line
  const outputActions$ = epic(new ActionsObservable(inputActions$ as Observable<any>), store, undefined);

  scheduler.expectObservable(outputActions$).toBe(outputMarble, marblesData);

  scheduler.flush();
};

export const delayToFrames = (delay: number) => '-'.repeat(Math.ceil(delay / 10));
