import Player from '../types/player';
import dayNumber from './day_number';

const isDeadPlayer = (player: Player, gameStage: number) =>
  player.deathDayNumber !== undefined
  ? player.deathDayNumber <= dayNumber(gameStage)
  : false;

export default isDeadPlayer;