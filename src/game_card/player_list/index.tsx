import * as React from 'react';
import { Row, Col } from 'antd';
import Player from '../types/player';
import PlayerCard from '../player_card';

import './style.css';

interface Props {
  players: Array<Player>;
}

class PlayerList extends React.Component<Props> {
  renderPlayerCard(index: number, player: Player) {
    return (
      <PlayerCard
        key={index}
        value={player}
        number={index + 1}
      />
    );
  }
  renderPlayerCards(players: Array<Player>, indexBase: number) {
    return players.map((player, index) => (
      <Col lg={4} xl={2}>
        {this.renderPlayerCard(index + indexBase, player)}
      </Col>
    ));
  }

  render() {
    const { players } = this.props;

    return (
      <div>
        <h4>
          Список игроков 2
        </h4>
        <Row>
          <Col lg={2} xl={2}></Col>
          {this.renderPlayerCards(players.slice(0, 5), 0)}
          <Col lg={2} xl={0}></Col>
          <Col lg={2} xl={0}></Col>
          {this.renderPlayerCards(players.slice(5), 5)}
          <Col lg={2} xl={2}></Col>
        </Row>
      </div>
    );
  }
}

export default PlayerList;
