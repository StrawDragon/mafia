import * as React from 'react';
import Player from '../types/player';
import { Card, Avatar, Icon } from 'antd';

import './style.css';

interface Props {
  value: Player;
  number: number;
}

class PlayerCard extends React.Component<Props> {
  renderDescription(value: Player) {
    return (
      <div>
        <p>{`Ник: ${value.nickname}`}</p>
        <p>{`Замечания: ${value.warningCount}`}</p>
      </div>
    );
  }

  render() {
    const { value, number: playerNumber } = this.props;

    return (
      <Card
        className="game_card--player_list--card"
        actions={[<Icon type="dislike" />, <Icon type="edit" />, <Icon type="delete" />]}
      >
        <div className="game_card--player_list--number">
          {playerNumber}
        </div>
        <div>
          <Avatar src={value.avatar} />
        </div>
        <div>
          <h4>
            {value.nickname}
          </h4>
        </div>
      </Card>
    );
  }
}

export default PlayerCard;
