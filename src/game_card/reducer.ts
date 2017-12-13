import { Action, ChargedAction } from '../common/types/action';
import Vote from './types/vote';
import Voting from './types/voting';
import Player from './types/player';
import SheriffCheck from './types/sheriff_check';
import Shoot from './types/shoot';
import ActionTypes from '../common/constants/actionTypes';

import initialStateSub from './state_stub';

export interface GameCardState {
  stage: number;
  currentVotingID?: string;
  votes: Array<Vote>;
  votings: Array<Voting>;
  players: Array<Player>;
  sheriffChecks: Array<SheriffCheck>;
  shoots: Array<Shoot>;
}

// const initialState: GameCardState = {
//   stage: 0,
//   votes: [],
//   votings: [],
//   players: [],
//   sheriffChecks: [],
//   shoots: [],
// };

const initialState = initialStateSub;

const voteAddedReducer = (state: GameCardState, action: ChargedAction<Vote>): GameCardState => {
  return state.votes.find(vote => vote.id === action.payload.id)
    ? state
    : {...state, votes: [...state.votes, action.payload]};
};
const voteRemovedReducer = (state: GameCardState, action: ChargedAction<string>): GameCardState => {
  return {...state, votes: state.votes.filter(vote => vote.id !== action.payload)};
};

// tslint:disable-next-line:no-any
const reducer = (state: GameCardState = initialState, action: Action<any>) => {
  switch (action.type) {
    case ActionTypes.GameCard.VOTE_ADDED: return voteAddedReducer(state, action);
    case ActionTypes.GameCard.VOTE_REMOVED: return voteRemovedReducer(state, action);
    default: return state;
  }
};

export default reducer;
