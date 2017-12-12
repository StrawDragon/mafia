import * as React from 'react';
import { Card, Avatar, Icon } from 'antd';
import './vote.css';

interface Props {
  className?: string;
  avatar: string;
  nickname: string;
  numberAtTable: number;
  value: boolean;
  disabled?: boolean;
}

const Vote = (props: Props) => {
  const { avatar, nickname, value, className, numberAtTable } = props;

  return (
    <Card className={`game_card--voting--vote ${className}`}>
      <div className="game_card--voting--vote--body">
        <span className="game_card--voting--vote--number">{numberAtTable + 1}</span>
        <Avatar src={avatar} size="small" />
        <span className="game_card--voting--vote--nickname">{nickname}</span>
        {
          value ? (
            <Icon type="like" /> 
          ) : (
            <Icon type="dislike-o" />
          )
        }
      </div>
    </Card>
  );
};

export default Vote;