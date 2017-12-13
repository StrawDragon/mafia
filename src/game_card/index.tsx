import * as React from 'react';
import PlayerList from './player_list';

class GameCard extends React.Component {
  render() {
    return (
      <div className="align-center">
        <h1>Карточка игры</h1>
        <div>Управление процесом, этап игры, таймер - (Managment)</div>
        <PlayerList />
        <div>Голосование</div>
        <div>Темные делишки</div>
      </div>
    );
  }
}

export default GameCard;
