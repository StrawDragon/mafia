import * as React from 'react';
import { Card, Avatar } from 'antd';

interface Props {
  avatar: string;
  nickname: string;
  numberAtTable: number;
  value: boolean;
  disabled?: boolean;
}

const Vote = (props: Props) => {
  const { avatar, nickname, value } = props;

  return (
    <Card>
      <Avatar src={avatar} size="small" />
      <br />
      <span>{nickname}</span>
      <br />
      <span>{`${value}`}</span>
    </Card>
  );
};

export default Vote;