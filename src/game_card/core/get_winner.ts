import PlayerRole from './../types/player_role';
import Player from './../types/player';

export const getWinner = (players: Player[]) => {
  let redQuantity = 0;
  let blackQuantity = 0;

  for (let i = 0; i < players.length; i++) {
    switch (players[i].role) {
      case PlayerRole.Citizen: redQuantity++; break;
      case PlayerRole.Sheriff: redQuantity++; break;
      case PlayerRole.Mafia: blackQuantity++; break;
      case PlayerRole.Don: blackQuantity++; break;
      default: continue;
    }
  } 

  if ( blackQuantity === 0) return PlayerRole.Citizen;

  return redQuantity <= blackQuantity ? PlayerRole.Mafia : false; 
}
