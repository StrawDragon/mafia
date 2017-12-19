import * as React from 'react';
import PlayerList from './player_list';

class GameCard extends React.Component {
  render() {
    return (
      <div className="align-center">
        <h1>Карточка игры</h1>
        <PlayerList />
      </div>
    );
  }
}

export default GameCard;
