import shortid from 'shortid';
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
import { nextStage } from './core/next_stage';

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
  }
  if (state.stage.type in nextStage) {
    return nextStage[state.stage.type](state);
  }
  return  state;
};

const suspectToggledReducer = (state: GameCardState, action: ChargedAction<{ playerID: string, initiatorID: string }>): GameCardState => {
  const { votings, day } = state;
  const { initiatorID, playerID } = action.payload;

  const targetVoting = votings.find(voting => voting.dayNumber === day && voting.initiatorID === initiatorID && voting.playerID === playerID)

  if (targetVoting) {
    return {
      ...state,
      votings: votings.filter(voting => voting !== targetVoting),
    };
  } else {
    return {
      ...state,
      votings: [...votings, {
        id: shortid.generate(),
        dayNumber: day,
        playerID,
        initiatorID,
      }]
    };
  }
};

const voteToggledReducer = (state: GameCardState, action: ChargedAction<string>): GameCardState => {
  const { stage: { currentVotingID }, votes } = state;
  const playerID = action.payload;

  if (!currentVotingID) {
    return state;
  }

  const targetVote = votes.find(vote => vote.votingID === currentVotingID && vote.playerID === playerID);

  if (targetVote) {
    return {
      ...state,
      votes: votes.filter(vote => vote !== targetVote),
    };
  } else {
    return {
      ...state,
      votes: [...votes, {
        id: shortid.generate(),
        votingID: currentVotingID,
        playerID,
      }]
    };
  }
};

const shootToggledReducer = (state: GameCardState, action: ChargedAction<{shooter: Player, player: Player, day: number}>): GameCardState => {
  const { shoots } = state;
  const {day, player, shooter} = action.payload;

  const currentShoot = shoots.find(shoot => shoot.dayNumber === day && shoot.fromPlayerID === shooter.id && shoot.toPlayerID === player.id);

  if (currentShoot) {
    return {
      ...state,
      shoots: shoots.filter(shoot => shoot.dayNumber !== day || shoot !== currentShoot),
    };
  } else {
    return {
      ...state,
      shoots: [
        ...shoots.filter(shoot => shoot.dayNumber !== day || shoot.fromPlayerID !== shooter.id),
        {
          id: shortid.generate(),
          fromPlayerID: shooter.id,
          toPlayerID: player.id,
          dayNumber: day,
        }
      ],
    };
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
    case ActionTypes.GameCard.SUSPECT_TOGGLED: return suspectToggledReducer(state, action);
    case ActionTypes.GameCard.VOTE_TOGGLED: return voteToggledReducer(state, action);
    case ActionTypes.GameCard.SHOOT_TOGGLED: return shootToggledReducer(state, action);
    default: return state;
  }
};

export default reducer;
