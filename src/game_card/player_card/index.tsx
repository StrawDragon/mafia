import * as React from 'react';
import Player from '../types/player';
import { Card, Avatar, Icon } from 'antd';

const { Meta } = Card as any;

interface Props {
  value: Player;
  number: number;
}

class PlayerCard extends React.Component<Props> {
  renderDescription(value: Player) {
    return (
      <div>
        <p>{`Ник: ${value.nickname}`}</p>
        <p>{value.isDead ? 'Мертв' : 'Жив'}</p>
        <p>{`Замечания: ${value.warningCount}`}</p>
      </div>
    );
  }

  render() {
    const { value, number: playerNumber } = this.props;
    console.log(Card, Meta);

    return (
      <Card
        actions={[<Icon type="dislike" />, <Icon type="edit" />, <Icon type="delete" />]}
      >
        <Meta
          avatar={<Avatar src={value.avatar} />}
          title={'Игрок ' + playerNumber}
          description={this.renderDescription(value)}
        />
      </Card>
    );
  }
}

export default PlayerCard;
