import * as React from 'react';
import { Row } from 'antd';
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
  },
  {
    id: '67',
    avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/-OD2ShYwAG2ELpwGBv7w7A/avatar_422038.jpg',
    nickname: 'Бордерлендс',
    isDead: false,
    warningCount: 0,
  },
  {
    id: '69',
    avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/-OD2ShYwAG2ELpwGBv7w7A/avatar_422038.jpg',
    nickname: 'Бордерлендс',
    isDead: false,
    warningCount: 0,
  },
  {
    id: '12',
    avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/-OD2ShYwAG2ELpwGBv7w7A/avatar_422038.jpg',
    nickname: 'Бордерлендс',
    isDead: false,
    warningCount: 0,
  },
  {
    id: '34',
    avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/-OD2ShYwAG2ELpwGBv7w7A/avatar_422038.jpg',
    nickname: 'Бордерлендс',
    isDead: false,
    warningCount: 0,
  },
  {
    id: '45',
    avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/-OD2ShYwAG2ELpwGBv7w7A/avatar_422038.jpg',
    nickname: 'Бордерлендс',
    isDead: false,
    warningCount: 0,
  },
  {
    id: '56',
    avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/-OD2ShYwAG2ELpwGBv7w7A/avatar_422038.jpg',
    nickname: 'Бордерлендс',
    isDead: false,
    warningCount: 0,
  },
  {
    id: '523',
    avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
    nickname: 'Джокер',
    isDead: false,
    warningCount: 0,
  },
  {
    id: '98',
    avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
    nickname: 'Джокер',
    isDead: false,
    warningCount: 0,
  },
];

class GameCard extends React.Component {
  render() {
    return (
      <div className="align-center">
        <Row>
          <h1>Карточка игры</h1>
        </Row>
        <Row>
            <h4>Управление процесом, этап игры, таймер - (Managment)</h4>
        </Row>
        <PlayerList players={players} />
        <div>Голосование</div>
        <div>Темные делишки</div>
      </div>
    );
  }
}

export default GameCard;
