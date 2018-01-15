import StageType from '../types/stage_type';
import { GameCardState } from '../reducer';

export const nextStage = {
  [StageType.CARD_DISTRIBUTION]: (state: GameCardState): GameCardState => ({
    ...state,
    stage: { ...state.stage, type: StageType.MAFIA_COLLUSION },
    currentTimerValue: 60,
    isRunTimer: false
  }),
  [StageType.MAFIA_COLLUSION]: (state: GameCardState): GameCardState => ({
    ...state,
    stage: { ...state.stage, type: StageType.DON_CITY_INSPECTION },
    currentTimerValue: 60,
    isRunTimer: false
  }),
  [StageType.DON_CITY_INSPECTION]: (state: GameCardState): GameCardState => ({
    ...state,
    stage: { ...state.stage, type: StageType.SHERIFS_CITY_INSPECTION },
    currentTimerValue: 60,
    isRunTimer: false
  }),
  [StageType.SHERIFS_CITY_INSPECTION]: (state: GameCardState): GameCardState => ({
    ...state,
    stage: { ...state.stage, type: StageType.CITY_AWAKENING },
    currentTimerValue: 60,
    isRunTimer: false
  })
};