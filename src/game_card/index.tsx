import * as React from 'react';
import PlayerList from './player_list';
import Timer from './timer';

class GameCard extends React.Component {
  render() {
    return (
      <div className="align-center">
        <h1>Карточка игры</h1>
        <PlayerList />
        <Timer />
      </div>
    );
  }
}

export default GameCard;
