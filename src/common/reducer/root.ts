import { combineReducers } from 'redux';
import gameCardReducer, { GameCardState } from '../../game_card/reducer';

export interface RootState {
  gameCard: GameCardState;
}

const reducer = combineReducers({
  gameCard: gameCardReducer,
});

export default reducer;
