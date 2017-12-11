import Player from '../types/player';

const compare = (p1: Player, p2: Player) => p1.numberAtTable - p2.numberAtTable;

const sortPlayersByNumberAtTable = (players: Array<Player>) => players.sort(compare);

export default sortPlayersByNumberAtTable;