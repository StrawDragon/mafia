import ActionTypes from '../common/constants/actionTypes';
import { ChargedAction, SimpleAction } from '../common/types/action';
import Vote from './types/vote';

export const addVote = (vote: Vote): ChargedAction<Vote> => ({
  type: ActionTypes.GameCard.VOTE_ADDED,
  payload: vote,
});

export const removeVote = (voteID: string): ChargedAction<string> => ({
  type: ActionTypes.GameCard.VOTE_REMOVED,
  payload: voteID,
});

export const startTimer = (): SimpleAction => ({
  type: ActionTypes.GameCard.TIMER_STARTED,
});

export const pauseTimer = (): SimpleAction => ({
  type: ActionTypes.GameCard.TIMER_PAUSED,
});

export const setTimer = (timerValue: number): ChargedAction<number> => ({
  type: ActionTypes.GameCard.TIMER_SET,
  payload: timerValue,
});