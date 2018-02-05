import StageType from '../types/stage_type';
import { GameCardState } from '../reducer';
import { getNextSpeaker } from './get_next_speaker';
import { getOpeningSpeaker } from './get_opening_speaker';

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
  }),
  [StageType.CITY_AWAKENING]: (state: GameCardState): GameCardState => {
    const openingSpeaker = getOpeningSpeaker(state.players, state.day, state.lastOpenedDaySpeakerID);
    return {
      ...state,
      lastOpenedDaySpeakerID: openingSpeaker.id,
      stage: {
        ...state.stage,
        type: state.stage.currentShootingID ? StageType.SHOT_DEAD_PLAYER_SPEAKING : StageType.DAY_SPEAKING,
        currentSpeakerID: openingSpeaker.id,
      },
      currentTimerValue: 60,
      isRunTimer: false
    }
  },
  [StageType.DAY_SPEAKING]: (state: GameCardState): GameCardState => {
    const nextSpeaker = getNextSpeaker(state.players, state.day, state.lastOpenedDaySpeakerID, state.stage.currentSpeakerID);
    return {
      ...state,
      stage: {
        ...state.stage,
        type: nextSpeaker ? StageType.DAY_SPEAKING : StageType.VOTING,
        currentSpeakerID: nextSpeaker ? nextSpeaker.id : undefined,
      },
      currentTimerValue: 60,
      isRunTimer: false
    }
  },
};
