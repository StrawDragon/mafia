import Player from '../types/player';

export const getFirstSpeaker = (players: Array<Player>, lastOpenedDaySpeakerID: string, currentDay: number) => {
  const doublePlayers = [ ...players, ...players ];

  const lastOpenedDaySpeaker = players.find(player => player.id === lastOpenedDaySpeakerID) || players[0];

  let firstSpeaker = players[0];
  for (let i = lastOpenedDaySpeaker.numberAtTable + 1; i < doublePlayers.length; i++ ) {
    const player = doublePlayers[i];
    const isDeathPlayer = player.dayDeathNumber && player.dayDeathNumber <= currentDay;
    
    if (!isDeathPlayer) {
      firstSpeaker = doublePlayers[i];
      break;
    }
  }

  return firstSpeaker;
};
