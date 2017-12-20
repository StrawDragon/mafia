import { Action, ChargedAction } from '../common/types/action';
import Vote from './types/vote';
import Voting from './types/voting';
import CarCrash from './types/car_crash';
import AirCrash from './types/air_crash';
import Player from './types/player';
import SheriffCheck from './types/sheriff_check';
import DonCheck from './types/don_check';
import Shoot from './types/shoot';
import ActionTypes from '../common/constants/actionTypes';
import StageType from './types/stage_type';

import initialStateStub from './state_stub';

export interface GameCardState {
  day: number;
  lastOpenedDaySpeakerID: string;
  stage: {
    type: StageType,
    currentVotingID?: string;
    currentShootingID?: string;
    currentDonCheckingID?: string;
    currentSheriffCheckingID?: string;
    currentSpeakerID?: string;
  };
  timerValue: number; // sec
  isRunTimer: boolean;
  votes: Array<Vote>;
  votings: Array<Voting>;
  carCrashes: Array<CarCrash>;
  airCrashes: Array<AirCrash>;
  players: Array<Player>;
  sheriffChecks: Array<SheriffCheck>;
  donChecks: Array<DonCheck>;
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

const initialState = initialStateStub;

const voteAddedReducer = (state: GameCardState, action: ChargedAction<Vote>): GameCardState => {
  return state.votes.find(vote => vote.id === action.payload.id)
    ? state
    : {...state, votes: [...state.votes, action.payload]};
};
const voteRemovedReducer = (state: GameCardState, action: ChargedAction<string>): GameCardState => {
  return {...state, votes: state.votes.filter(vote => vote.id !== action.payload)};
};
// TIMER_STARTED: 'GameCard -> TIMER_STARTED',
// TIMER_PAUSED: 'GameCard -> TIMER_PAUSED',
// TIMER_SET: 'GameCard -> TIMER_SET',
const timerStartedReducer = (state: GameCardState) => {
  return {...state, isRunTimer: true };
};

const timerPausedReducer = (state: GameCardState) => {
  return {...state, isRunTimer: false };
};

const timerSetReducer = (state: GameCardState, action: ChargedAction<number>) => {
  return {...state, timerValue: action.payload };
};

// tslint:disable-next-line:no-any
const reducer = (state: GameCardState = initialState, action: Action<any>) => {
  switch (action.type) {
    case ActionTypes.GameCard.VOTE_ADDED: return voteAddedReducer(state, action);
    case ActionTypes.GameCard.VOTE_REMOVED: return voteRemovedReducer(state, action);
    case ActionTypes.GameCard.TIMER_STARTED: return timerStartedReducer(state);
    case ActionTypes.GameCard.TIMER_PAUSED: return timerPausedReducer(state);
    case ActionTypes.GameCard.TIMER_SET: return timerSetReducer(state, action);
    default: return state;
  }
};

export default reducer;
