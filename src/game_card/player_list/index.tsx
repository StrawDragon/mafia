import * as React from 'react';
import Player from '../types/player';
import PlayerCard from '../player_card';

import './style.css';

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

    return (
      <div>
        <h4>
          Список игроков
        </h4>
        <div className="game_card--player_list--list">
          {this.renderPlayerCards(players)}
        </div>
      </div>
    );
  }
}

export default PlayerList;
