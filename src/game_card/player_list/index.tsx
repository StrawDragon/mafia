import * as React from 'react';
import Player from '../types/player';
import PlayerCard from '../player_card';

interface Props {
  players: Array<Player>;
}

class PlayerList extends React.Component<Props> {
  renderPlayerCards(players: Array<Player>) {
    return players.map((player, index) => (
      <PlayerCard
        key={index}
        value={player}
        number={index + 1}
      />
    ));
  }

  render() {
    const { players } = this.props;
    const playerCards = this.renderPlayerCards(players);

    return (
      <div>
          Список игроков 2
          {playerCards}
      </div>
    );
  }
}

export default PlayerList;
