import ActionTypes from '../common/constants/actionTypes';
import { ChargedAction, SimpleAction } from '../common/types/action';
import PlayerRole from './types/player_role';
import Vote from './types/vote';

export const addVote = (vote: Vote): ChargedAction<Vote> => ({
  type: ActionTypes.GameCard.VOTE_ADDED,
  payload: vote,
});

export const removeVote = (voteID: string): ChargedAction<string> => ({
  type: ActionTypes.GameCard.VOTE_REMOVED,
  payload: voteID,
});

export const changePlayerRole = (playerID: string, newRole: PlayerRole): ChargedAction<{playerID: string, newRole: PlayerRole}> => ({
  type: ActionTypes.GameCard.PLAYER_ROLE_CHANGED,
  payload: {playerID, newRole},
});

export const startTimer = (): SimpleAction => ({
  type: ActionTypes.GameCard.TIMER_STARTED,
});

export const pauseTimer = (): SimpleAction => ({
  type: ActionTypes.GameCard.TIMER_PAUSED,
});

export const setCurrentTimer = (timerValue: number): ChargedAction<number> => ({
  type: ActionTypes.GameCard.TIMER_SET,
  payload: timerValue,
});

export const setInitialTimer = (initialTimerValue: number): ChargedAction<number> => ({
  type: ActionTypes.GameCard.TIMER_INITIAL_SET,
  payload: initialTimerValue,
});

export const requestNext = (): SimpleAction => ({
  type: ActionTypes.GameCard.NEXT_REQUESTED,
});

export const toggleSuspect = (playerID: string, initiatorID: string): ChargedAction<{ playerID: string, initiatorID: string }> => ({
  type: ActionTypes.GameCard.SUSPECT_TOGGLED,
  payload: { playerID, initiatorID },
});