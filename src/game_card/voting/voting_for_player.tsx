import * as React from 'react';
import { connect } from 'react-redux';
import VoteType from '../types/vote';
import Player from '../types/player';
import Voting from '../types/voting';
import { RootState } from '../../common/reducer/root';
import sortPlayersByNumberAtTable from '../utils/sort_players_by_number_at_table';
import isDeadPlayer from '../utils/is_dead_player';
import selectVotesByVoting from '../selectors/select_votes_by_voting';
import Vote from './vote';

interface Props {
  votes: Array<VoteType>;
  players: Array<Player>;
  stage: number;
}

const getValue = (player: Player, votes: Array<VoteType>) => {
  const playerVote = votes.find(vote => vote.fromPlayerID === player.id);

  return playerVote ? playerVote.value : false;
};

const VotingForPlayerComponent = (props: Props) => {
  const { votes, players, stage } = props;

  return (
    <div>
      {
        sortPlayersByNumberAtTable(players).map(player =>
          <Vote
            key={player.id}
            avatar={player.avatar}
            nickname={player.nickname}
            numberAtTable={player.numberAtTable}
            value={getValue(player, votes)}
            disabled={isDeadPlayer(player, stage)}
          />
        )
      }
    </div>
  );
};

interface OuterProps {
  voting: Voting;
}

const VotingForPlayer = connect(
  (state: RootState, outerProps: OuterProps) => ({
    votes: selectVotesByVoting(state, outerProps.voting),
    players: state.gameCard.players,
    stage: state.gameCard.stage,
  })
)(VotingForPlayerComponent);

export default VotingForPlayer;