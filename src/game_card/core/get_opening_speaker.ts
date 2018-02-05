import Player from "../types/player";

export const getOpeningSpeaker = (players: Array<Player>, day: number, lastOpenedSpeakerID: string) => {
  const lastOpenedSpeaker = players.find(player => player.id === lastOpenedSpeakerID) || players[9];
  const doublePlayers = [ ...players, ...players ];

  let openedSpeaker = lastOpenedSpeaker ? doublePlayers[lastOpenedSpeaker.numberAtTable + 1] : players[0];
  for(let i = openedSpeaker.numberAtTable; i < doublePlayers.length; i++) {
    const player = doublePlayers[i];
    const isAlive = !player.dayDeathNumber || player.dayDeathNumber > day;
    
    if (!isAlive) {
      continue;
    }
    openedSpeaker = player;
    break;
  }

  return openedSpeaker;
};