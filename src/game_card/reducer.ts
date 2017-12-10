import { Action } from '../common/types/action';

export interface GameCardState {

}

const initialState: GameCardState = {

};

const reducer = (state: GameCardState = initialState, action: Action<{}>) => {
  return state;
};

export default reducer;
