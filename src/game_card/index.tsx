import * as React from 'react';
import PlayerList from './player_list';

const players = [
  {
    id: '5',
    avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
    nickname: 'Джокер',
    isDead: false,
    warningCount: 0,
  },
  {
    id: '6',
    avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/-OD2ShYwAG2ELpwGBv7w7A/avatar_422038.jpg',
    nickname: 'Бордерлендс',
    isDead: false,
    warningCount: 0,
  }
];

class GameCard extends React.Component {
  render() {
    return (
      <div className="align-center">
        <h1>Карточка игры</h1>
        <div>Управление процесом, этап игры, таймер - (Managment)</div>
        <PlayerList players={players} />
        <div>Голосование</div>
        <div>Темные делишки</div>
      </div>
    );
  }
}

export default GameCard;
