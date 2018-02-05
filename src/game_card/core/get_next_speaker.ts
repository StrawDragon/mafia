import Player from '../types/player';

export const getNextSpeaker = (players: Array<Player>, lastOpenedDaySpeakerID: string, currentDay: number, currentSpeakerID?: string) => {
  const doublePlayers = [ ...players, ...players ];

  // currentOpenedDaySpeaker - вместо players[0] должен быть следующий живой игрок от начала списка
  const currentOpenedDaySpeaker = players.find(player => player.id === lastOpenedDaySpeakerID) || players[0];
  // currentSpeaker - вместо players[1] должен быть следующий живой игрок после currentOpenedDaySpeaker
  // сделать тоже самое для get_first_speaker.ts
  const currentSpeaker = players.find(player => player.id === currentSpeakerID) || players[1];

  let nextSpeaker: Player | undefined = doublePlayers[currentSpeaker.numberAtTable + 1];

  for (let i = currentSpeaker.numberAtTable + 1; i < doublePlayers.length; i++ ) {
    const player = doublePlayers[i];
    const isDeathPlayer = player.dayDeathNumber && player.dayDeathNumber <= currentDay;

    if (isDeathPlayer) { continue; }

    if (currentOpenedDaySpeaker.numberAtTable + 10 > i) {
      nextSpeaker = doublePlayers[i];
    } else {
      nextSpeaker = undefined;
    }

    break;
  }

  return nextSpeaker;
};
