import StageType from '../types/stage_type';
import { mockState } from '../../common/utils/mock_store';
import gameCardReducer from '../reducer';
import { nextStage } from './next_stage';

describe('game_card › core › next_stages', () => {
  describe('CARD_DISTRIBUTION', () => {
    it('Должен поменять стадию на MAFIA_COLLUSION и сбросить таймер на 60 сек', () => {
      const input = mockState(gameCardReducer, {
        stage: {
          type: StageType.CARD_DISTRIBUTION
        },
        currentTimerValue: 27,
        isRunTimer: true
      })
      const expected = mockState(gameCardReducer, {
        stage: {
          type: StageType.MAFIA_COLLUSION
        },
        currentTimerValue: 60,
        isRunTimer: false
      })
      const actual = nextStage[StageType.CARD_DISTRIBUTION](input);
      expect(actual).toEqual(expected);
    });
  });
  describe('MAFIA_COLLUSION', () => {
    it('Должен поменять стадию на DON_CITY_INSPECTION и сбросить таймер на 60 сек', () => {
      const input = mockState(gameCardReducer, {
        stage: {
          type: StageType.MAFIA_COLLUSION
        },
        currentTimerValue: 13,
        isRunTimer: true
      })
      const expected = mockState(gameCardReducer, {
        stage: {
          type: StageType.DON_CITY_INSPECTION
        },
        currentTimerValue: 60,
        isRunTimer: false
      })
      const actual = nextStage[StageType.MAFIA_COLLUSION](input);
      expect(actual).toEqual(expected);
    });
  });
  describe('DON_CITY_INSPECTION', () => {
    it('Должен поменять стадию на SHERIFS_CITY_INSPECTION и сбросить таймер на 60 сек', () => {
      const input = mockState(gameCardReducer, {
        stage: {
          type: StageType.DON_CITY_INSPECTION
        },
        currentTimerValue: 34,
        isRunTimer: true
      })
      const expected = mockState(gameCardReducer, {
        stage: {
          type: StageType.SHERIFS_CITY_INSPECTION
        },
        currentTimerValue: 60,
        isRunTimer: false
      })
      const actual = nextStage[StageType.DON_CITY_INSPECTION](input);
      expect(actual).toEqual(expected);
    });
  });
  describe('SHERIFS_CITY_INSPECTION', () => {
    it('Должен поменять стадию на CITY_AWAKENING и сбросить таймер на 60 сек', () => {
      const input = mockState(gameCardReducer, {
        stage: {
          type: StageType.SHERIFS_CITY_INSPECTION
        },
        currentTimerValue: 24,
        isRunTimer: true
      })
      const expected = mockState(gameCardReducer, {
        stage: {
          type: StageType.CITY_AWAKENING
        },
        currentTimerValue: 60,
        isRunTimer: false
      })
      const actual = nextStage[StageType.SHERIFS_CITY_INSPECTION](input);
      expect(actual).toEqual(expected);
    });
  });
  describe('CITY_AWAKENING', () => {
    it('Должен поменять стадию на DAY_SPEAKING и сбросить таймер на 60 сек', () => {
      const input = mockState(gameCardReducer, {
        stage: {
          type: StageType.CITY_AWAKENING,
          currentShootingID: undefined
        },
        currentTimerValue: 45,
        isRunTimer: true
      })
      const expected = mockState(gameCardReducer, {
        stage: {
          type: StageType.DAY_SPEAKING,
          currentShootingID: undefined
        },
        currentTimerValue: 60,
        isRunTimer: false
      })
      const actual = nextStage[StageType.CITY_AWAKENING](input);
      expect(actual).toEqual(expected);
    });
    it('Должен поменять стадию на SHOT_DEAD_PLAYER_SPEAKING и сбросить таймер на 60 сек', () => {
      const input = mockState(gameCardReducer, {
        stage: {
          type: StageType.CITY_AWAKENING,
          currentShootingID: '3'
        },
        currentTimerValue: 45,
        isRunTimer: true
      })
      const expected = mockState(gameCardReducer, {
        stage: {
          type: StageType.SHOT_DEAD_PLAYER_SPEAKING,
          currentShootingID: '3'
        },
        currentTimerValue: 60,
        isRunTimer: false
      })
      const actual = nextStage[StageType.CITY_AWAKENING](input);
      expect(actual).toEqual(expected);
    });
  });
});