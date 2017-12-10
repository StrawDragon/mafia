import { Action } from '../common/types/action';
import Vote from './types/vote';
import Voting from './types/voting';
import Player from './types/player';
import SheriffCheck from './types/sheriff_check';
import Shoot from './types/shoot';

import initialStateSub from './state_stub';

export interface GameCardState {
  stage: number;
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

const reducer = (state: GameCardState = initialState, action: Action<{}>) => {
  return state;
};

export default reducer;
