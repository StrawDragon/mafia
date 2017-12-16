import * as React from 'react';
import { Card, Avatar, Icon } from 'antd';
import * as styles from './vote.css';

interface Props {
  className?: string;
  value: boolean;
  avatar: string;
  nickname: string;
  numberAtTable: number;
  disabled?: boolean;
  onClick?: () => void;
}

class Vote extends React.Component<Props> {

  clickHandler = () => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick();
    }
  }

  render() {
    const { avatar, nickname, disabled, value, className, numberAtTable } = this.props;
    const disableModify = disabled ? styles.disabled : '';

    return (
      <Card className={`${styles.vote} ${disableModify} ${className}`}>
        <div className={styles.body} onClick={this.clickHandler}>
          <span className={styles.number}>{numberAtTable + 1}</span>
          <Avatar src={avatar} size="large" shape="square"/>
          <span className={styles.nickname}>{nickname}</span>
          <div className={styles.value}>
          {
            value ? (
              <Icon type="like" /> 
            ) : (
              <Icon type="like-o" style={{opacity: 0.3}}/>
            )
          }
          </div>
        </div>
      </Card>
    );
  }
}

export default Vote;