import * as React from 'react';
import Shoot from '../../types/shoot';
import styles from './style.css';

const miss = 'Мафия промахнулась';
const shot = 'Мафия мафия убила игрока №';

interface Props {
  id: string;
  shoots: Array<Shoot>;
}

export class NigthResult extends React.Component<Props> {
  render() {
    const { id, shoots } = this.props;
    
    if (!id) {
      return null;
    }

    if (shoots[id][0] === shoots[id][1] && shoots[id][0] === shoots[id][2]) {
      return (
        <div className={styles.nigthResult}>
          <span className={styles.hit}>{`${shot}${shoots[id][0]}`}</span>
        </div>
      );
    }

    return (
      <div className={styles.nigthResult}>
        <span className={styles.miss}>{miss}</span>
      </div>
    );
  }
}