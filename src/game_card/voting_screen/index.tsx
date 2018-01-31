import * as React from 'react';
import Player from '../types/player';
import Vote from '../types/vote';
import { GameManagement } from '../game_management';
import { PlayerListComponent } from '../player_list';
import { PlayerContent } from './player_content';

interface Props {
  currentDay: number;
  elimenationPlayer: Player;
  players: Array<Player>;
  votes: Array<Vote>;
  onToggleVote: (elimenationPlayerID: string, votingPlayerID: string) => void;
  onNext: () => void;
}

export class VotingScreenComponent extends React.Component<Props> {
  cardContentRenderer = (player: Player) => {
    const { votes, elimenationPlayer, onToggleVote } = this.props;

    const value = !!votes.find(vote => vote.playerID === player.id);

    return (
      <PlayerContent
        value={value}
        onToggleVote={() => onToggleVote(elimenationPlayer.id, player.id)}
      />
    );
  }

  render() {
    const { elimenationPlayer, onNext, players, currentDay } = this.props;

    return (
      <div>
        <GameManagement
          title={`Голосование за вылет игрока ${elimenationPlayer.nickname}`}
          nextDescription={'next'}
          onNext={onNext}
        />
        <PlayerListComponent
          players={players}
          currentDay={currentDay}
          cardContentRenderer={this.cardContentRenderer}
        />
      </div>
    );
  }
}
