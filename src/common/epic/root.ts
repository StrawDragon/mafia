// import 'rxjs' must be first for integration rxjs to redux-observable
import 'rxjs';
import { combineEpics } from 'redux-observable';
import gameCardEpics from '../../game_card/epic';

export default combineEpics(gameCardEpics);