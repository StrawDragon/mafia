import * as React from 'react';

import PlayerRole from '../types/player_role';
import getClassNames from '../../common/utils/get_class_names';

import styles from './description.css';

const ROLE_TITLE = {
  [PlayerRole.Citizen]: 'Мирный',
  [PlayerRole.Sheriff]: 'Шериф',
  [PlayerRole.Mafia]: 'Мафия',
  [PlayerRole.Don]: 'Дон',
};

interface Item {
  hasError: boolean;
  count: number;
}

interface Props {
  validations: {
    [key: number]: Item,
    hasError: boolean,
  };
}

export class Description extends React.Component<Props> {
  renderItem = (item: Item, playerRole: string | PlayerRole) => {
    const className = getClassNames(styles.item, styles, {
      error: item.hasError,
    });

    return (
      <span className={className}>
        {`${ROLE_TITLE[playerRole]}: ${item.count}`}
      </span>
    );
  }
  
  render() {
    const { validations } = this.props;

    return (
      validations.hasError
      ? (
        <span className={styles.description}>
          {
            Object.keys(PlayerRole)
            .filter(role => validations[role])
            .map(role => this.renderItem(validations[role], role))
          }
        </span>
      )
      : 'Перейти к договору мафии'
    );
  }
}