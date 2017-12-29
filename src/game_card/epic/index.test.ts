import { unmockAll, mock } from 'omock';
import { timerEpic } from './index';
import { testEpic, delayToFrames } from '../../common/utils/epic_testing';
import { mockStore } from '../../common/utils/mock_store';
import * as Action from '../actions';
import * as LoadSoundExport from '../../common/utils/load_sound';
import { Observable } from 'rxjs/Observable';

type TimerSetupConfig = {
  startValue?: number;
};

const createSoundStub = () => ({
  play: jest.fn(),
  stop: jest.fn(),
});

const timerSetup = (config: TimerSetupConfig = {}) => {
  const startValue = config.startValue === undefined ? 15 : config.startValue;

  const timerTickSoundStub = createSoundStub();
  const endTimerSoundStub = createSoundStub();
  const pipSoundStub = createSoundStub();
  
  mock(LoadSoundExport, 'loadSound', (url: string) => {
    switch (url) {
      case '/audio/timer_tick.mp3': return Observable.of(timerTickSoundStub);
      case '/audio/end_timer.mp3': return Observable.of(endTimerSoundStub);
      case '/audio/pip.wav': return Observable.of(pipSoundStub);
      default: return undefined;
    }
  });

  const mockedStore = mockStore({
    gameCard: {
      initialTimerValue: startValue,
      currentTimerValue: startValue,
    }
  });

  return {
    timerTickSoundStub,
    endTimerSoundStub,
    pipSoundStub,
    mockedStore,
    s: delayToFrames(1000 - 10), // second
  };
};

describe('game_card/epic', () => {
  afterEach(() => {
    unmockAll();
  });
  describe('timerEpic', () => {
    it('should decrement timer value every second', () => {
      const { mockedStore, s } = timerSetup({ startValue: 5 });

      testEpic(
        timerEpic,
        `a${s}-${s}-${s}-${s}-${s}-${s}-`,
        `-${s}b${s}b${s}b${s}b${s}b${s}-`,
        {
          a: Action.startTimer(),
          b: Action.setCurrentTimer(4),
        },
        {
          store: mockedStore,
          maxFrames: 5000,
        }
      );
    });
    it('should pause timer if it value equal 0', () => {
      const { mockedStore, s } = timerSetup({ startValue: 0 });

      testEpic(
        timerEpic,
        `a${s}--`,
        `-${s}b-`,
        {
          a: Action.startTimer(),
          b: Action.pauseTimer(),
        },
        {
          store: mockedStore,
          maxFrames: 1000,
        }
      );
    });
    it('should pause timer by specific action', () => {
      const { mockedStore, s } = timerSetup({ startValue: 60 });

      testEpic(
        timerEpic,
        `a${s}b-`,
        `-${s}--`,
        {
          a: Action.startTimer(),
          b: Action.pauseTimer(),
        },
        {
          store: mockedStore,
          maxFrames: 5000,
        }
      );
    });
    it('should stop timer tick sound by pause', () => {
      const { mockedStore, timerTickSoundStub } = timerSetup({ startValue: 60 });

      testEpic(
        timerEpic,
        `ab-`,
        `---`,
        {
          a: Action.startTimer(),
          b: Action.pauseTimer(),
        },
        {
          store: mockedStore,
          maxFrames: 5000,
          customExpect: () => {
            expect(timerTickSoundStub.stop.mock.calls.length).toBe(1);
          }
        }
      );
    });
    it('should play end timer sound if timer value equal 0', () => {
      const { mockedStore, endTimerSoundStub, s } = timerSetup({ startValue: 0 });

      testEpic(
        timerEpic,
        `a${s}-b`,
        `-${s}b`,
        {
          a: Action.startTimer(),
          b: Action.pauseTimer(),
        },
        {
          store: mockedStore,
          maxFrames: 5000,
          customExpect: () => {
            expect(endTimerSoundStub.play.mock.calls.length).toBe(1);
          }
        }
      );
    });
    it('should play pip sound when there are 10 seconds left', () => {
      const { mockedStore, pipSoundStub, s } = timerSetup({ startValue: 5 });

      testEpic(
        timerEpic,
        `a${s}-${s}-${s}-b`,
        `-${s}c${s}c${s}c`,
        {
          a: Action.startTimer(),
          b: Action.pauseTimer(),
          c: Action.setCurrentTimer(4),
        },
        {
          store: mockedStore,
          maxFrames: 5000,
          customExpect: () => {
            expect(pipSoundStub.play.mock.calls.length).toBe(3);
          }
        }
      );
    });
  });
});