import * as React from 'react';
import Player from '../types/player';
import getClassNames from '../../common/utils/get_class_names';
import { Avatar, Icon } from 'antd';
import { CardSize } from '../types/card_size';
import styles from './style.css';

interface Props {
  value: Player;
  disabled?: boolean;
  size?: CardSize;
}

export class PlayerCard extends React.Component<Props> {
  renderWarningIcons(count: number) {
    return Array.from(new Array(count).keys()).map((index) => (
      <div key={index}>
        <Icon type="warning" />
      </div>
    ));
  }

  renderDescription(value: Player) {
    return (
      <div>
        <p>{`Ник: ${value.nickname}`}</p>
        <p>{`Замечания: ${value.warningCount}`}</p>
      </div>
    );
  }

  render() {
    const { value, disabled, size, children } = this.props;
    const { card, card__number, avatar, warnings, body } = styles;
    const cardClassNames = getClassNames(card, styles, {
      disabled: disabled,
      small: size === 'small',
      large: size === 'large'
    });

    return (
      <div className={cardClassNames}>
        <div className={card__number}>
          {value.numberAtTable + 1}
        </div>
        <div className={avatar}>
          <Avatar src={value.avatar} shape="square" size={size === 'small' ? undefined : 'large'}/>
        </div>
        <div className={warnings} title="Замечания">
          {this.renderWarningIcons(value.warningCount)}
        </div>
        <div>
          <h4>
            {value.nickname}
          </h4>
          <div className={body}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
