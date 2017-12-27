import ActionTypes from '../common/constants/actionTypes';
import { ChargedAction } from '../common/types/action';
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