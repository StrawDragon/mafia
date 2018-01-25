import * as React from 'react';
import Player from '../types/player';
import { GameManagement } from '../game_management';

interface Props {
  elimenationPlayer: Player;
  onNext?: () => void;
}

export class VotingScreenComponent extends React.Component<Props> {
  render() {
    const { elimenationPlayer, onNext } = this.props;

    return (
      <div>
        <GameManagement
          title={`Голосование за вылет игрока ${elimenationPlayer.nickname}`}
          nextDescription={'next'}
          onNext={onNext}
        />
      </div>
    );
  }
}
