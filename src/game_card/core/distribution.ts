import Player from '../types/player';
import PlayerRole from '../types/player_role';

export const validateDistribution = (players: Array<Player>) => {
  let citizenCount = 0;
  let sheriffCount = 0;
  let mafiaCount = 0;
  let donCount = 0;

  for (let i = 0; i < players.length; i++) {
    switch (players[i].role) {
      case PlayerRole.Citizen: citizenCount++; break;
      case PlayerRole.Sheriff: sheriffCount++; break;
      case PlayerRole.Mafia: mafiaCount++; break;
      case PlayerRole.Don: donCount++; break;
      default: continue;
    }
  }

  const citizenError = { hasError: citizenCount !== 6, count: citizenCount };
  const sheriffError = { hasError: sheriffCount !== 1, count: sheriffCount };
  const mafiaError = { hasError: mafiaCount !== 2, count: mafiaCount };
  const donError = { hasError: donCount !== 1, count: donCount };

  return {
    hasError: (
      citizenError.hasError
      || sheriffError.hasError
      || mafiaError.hasError
      || donError.hasError
    ),
    [PlayerRole.Citizen]: citizenError,
    [PlayerRole.Sheriff]: sheriffError,
    [PlayerRole.Mafia]: mafiaError,
    [PlayerRole.Don]: donError
  };
};