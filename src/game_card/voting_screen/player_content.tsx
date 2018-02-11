import * as React from 'react';
import getClassNames from '../../common/utils/get_class_names';
import styles from './player_content.css';

export interface Props {
  onToggleVote: () => void;
  value: boolean;
  disable?: boolean;
}

export class PlayerContent extends React.Component<Props> {
  render() {
    const { onToggleVote, value, disable } = this.props;
    const classNames = getClassNames('player-content', styles, {
      'voted': true,
    });

    return (
      <div className={classNames}>
        <button name="vote-button" onClick={onToggleVote} disabled={disable}>
          {value ? 'За' : 'Против'}
        </button>
      </div>
    );
  }
}