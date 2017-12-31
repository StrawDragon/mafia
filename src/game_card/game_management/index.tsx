import * as React from 'react';
import styles from './style.css';
import { Button } from 'antd';

interface Props {
  title: string;
  nextDescription: string | React.ReactNode;
  disabled?: boolean;
  onNext?: () => void;
}

export class GameManagement extends React.Component<Props> {
  render() {
    return (
      <div className={styles.gameManagement}>
        <span className={styles.title}>{this.props.title}</span>
        <div className={styles.next}>
          <div className={styles.nextDescription}>{this.props.nextDescription}</div>
          <Button
            shape="circle-outline"
            icon="caret-right"
            size="large"
            disabled={this.props.disabled}
            onClick={this.props.onNext}
          />
        </div>
      </div>
    );
  }
}