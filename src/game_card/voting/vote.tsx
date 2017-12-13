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
        <Avatar src={avatar} size="large" shape="square"/>
        <span className="game_card--voting--vote--nickname">{nickname}</span>
        <div className="game_card--voting--vote--value">
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
};

export default Vote;