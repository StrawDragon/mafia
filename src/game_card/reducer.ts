import { Action, ChargedAction } from '../common/types/action';
import Vote from './types/vote';
import Voting from './types/voting';
import CarCrash from './types/car_crash';
import AirCrash from './types/air_crash';
import Player from './types/player';
import PlayerRole from './types/player_role';
import SheriffCheck from './types/sheriff_check';
import DonCheck from './types/don_check';
import Shoot from './types/shoot';
import ActionTypes from '../common/constants/actionTypes';
import StageType from './types/stage_type';
import { validateDistribution } from './core/distribution';

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
  currentTimerValue: number; // sec
  isRunTimer: boolean;
  initialTimerValue: number;
  votes: Array<Vote>;
  votings: Array<Voting>;
  carCrashes: Array<CarCrash>;
  airCrashes: Array<AirCrash>;
  players: Array<Player>;
  sheriffChecks: Array<SheriffCheck>;
  donChecks: Array<DonCheck>;
  shoots: Array<Shoot>;
}

const initialState = initialStateStub;

const voteAddedReducer = (state: GameCardState, action: ChargedAction<Vote>): GameCardState => {
  return state.votes.find(vote => vote.id === action.payload.id)
    ? state
    : {...state, votes: [...state.votes, action.payload]};
};
const voteRemovedReducer = (state: GameCardState, action: ChargedAction<string>): GameCardState => {
  return {...state, votes: state.votes.filter(vote => vote.id !== action.payload)};
};
const playerRoleChangedReducer = (state: GameCardState, action: ChargedAction<{playerID: string, newRole: PlayerRole}>): GameCardState => {
  const { newRole, playerID } = action.payload;
  const players = state.players.map(player => {
    if (player.id === playerID && player.role !== newRole) {
      return {...player, role: newRole};
    }

    return player;
  });

  return {...state, players};
};

const timerStartedReducer = (state: GameCardState): GameCardState => {
  return {...state, isRunTimer: true };
};

const timerPausedReducer = (state: GameCardState): GameCardState => {
  return {...state, isRunTimer: false };
};

const currentTimerSetReducer = (state: GameCardState, action: ChargedAction<number>): GameCardState => {
  return {...state, currentTimerValue: action.payload };
};

const initialTimerSetReducer = (state: GameCardState, action: ChargedAction<number>): GameCardState => {
  return {...state, initialTimerValue: action.payload };
};

const nextRequestedReducer = (state: GameCardState): GameCardState => {
  const validation = validateDistribution(state.players);

  if (validation.hasError) {
    return state;
  } else {
    return {...state, stage: {...state.stage, type: StageType.MAFIA_COLLUSION} };
  }
};

// tslint:disable-next-line:no-any
const reducer = (state: GameCardState = initialState, action: Action<any>): GameCardState => {
  switch (action.type) {
    case ActionTypes.GameCard.VOTE_ADDED: return voteAddedReducer(state, action);
    case ActionTypes.GameCard.VOTE_REMOVED: return voteRemovedReducer(state, action);
    case ActionTypes.GameCard.PLAYER_ROLE_CHANGED: return playerRoleChangedReducer(state, action);
    case ActionTypes.GameCard.TIMER_STARTED: return timerStartedReducer(state);
    case ActionTypes.GameCard.TIMER_PAUSED: return timerPausedReducer(state);
    case ActionTypes.GameCard.TIMER_SET: return currentTimerSetReducer(state, action);
    case ActionTypes.GameCard.TIMER_INITIAL_SET: return initialTimerSetReducer(state, action);
    case ActionTypes.GameCard.NEXT_REQUESTED: return nextRequestedReducer(state);
    default: return state;
  }
};

export default reducer;
