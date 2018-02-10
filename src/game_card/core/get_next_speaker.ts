import Player from '../types/player';

export const getNextSpeaker = (players: Array<Player>, day: number, lastOpenedSpeakerID: string, currentSpeakerID?: string) => {
  const lastOpenedSpeaker = players.find(player => player.id === lastOpenedSpeakerID) || players[0];
  const currentSpeaker = players.find(player => player.id === currentSpeakerID) || players[0];
  const doublePlayers = [ ...players, ...players ];

  let nextSpeaker: Player | undefined = currentSpeaker ? doublePlayers[currentSpeaker.numberAtTable + 1] : players[1];
  for (let i = nextSpeaker.numberAtTable; i < doublePlayers.length; i++) {
    const player = doublePlayers[i];
    const isAlive = !player.dayDeathNumber || player.dayDeathNumber > day;

    if (lastOpenedSpeaker.numberAtTable === player.numberAtTable) {
      nextSpeaker = undefined;
      break;
    }
    if (!isAlive) {
      continue;
    }
    nextSpeaker = player;
    break;
  }

  return nextSpeaker;
};
