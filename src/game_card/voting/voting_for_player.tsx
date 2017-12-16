import * as React from 'react';
import { connect,  } from 'react-redux';
import shortid from 'shortid';
import VoteType from '../types/vote';
import Player from '../types/player';
import Voting from '../types/voting';
import { RootState } from '../../common/reducer/root';
import sortPlayersByNumberAtTable from '../utils/sort_players_by_number_at_table';
import isDeadPlayer from '../utils/is_dead_player';
import dayNumber from '../utils/day_number';
import selectVotesByVoting from '../selectors/select_votes_by_voting';
import selectPrevDayVotes from '../selectors/select_prev_day_votes';
import Vote from './vote';
import * as Actions from '../actions';
import * as styles from  './voting_for_player.css';
// TODO: обновить диагарму
interface Props {
  prevVotes: Array<VoteType>;
  voting: Voting;
  votes: Array<VoteType>;
  players: Array<Player>;
  stage: number;
  onRemoveVote: (voteID: string) => void;
  onAddVote: (vote: VoteType) => void;
}

const getVote = (player: Player, votes: Array<VoteType>) => votes.find(vote => vote.playerID === player.id);

class VotingForPlayerComponent extends React.Component<Props> {

  voteClickHandler = (player: Player, voting: Voting, vote?: VoteType, ) => {
    if (vote) {
      this.props.onRemoveVote(vote.id);
    } else {
      this.props.onAddVote({
        id: shortid.generate(),
        votingID: voting.id,
        playerID: player.id,
      });
    }
  }

  renderPlayerVote = (player: Player, votes: Array<VoteType>, stage: number, voting: Voting, prevVotes: Array<VoteType>) => {
    const vote = getVote(player, votes);
    const value = !!vote;
    const disabled = dayNumber(stage) > voting.dayNumber 
      || isDeadPlayer(player, stage) 
      || !!prevVotes.find(v => v.playerID === player.id);

    return (
      <Vote
        className={styles.vote}
        key={player.id}
        avatar={player.avatar}
        nickname={player.nickname}
        numberAtTable={player.numberAtTable}
        value={value}
        disabled={disabled}
        onClick={() => this.voteClickHandler(player, voting, vote)}
      />
    );
  }

  render() {
    const { votes, players, stage, voting, prevVotes } = this.props;

    return (
      <div className={styles.voting_for_player}>
        {
          sortPlayersByNumberAtTable(players).map(player => this.renderPlayerVote(player, votes, stage, voting, prevVotes))
        }
      </div>
    );
  }
}

interface OuterProps {
  voting: Voting;
}

const VotingForPlayer = connect(
  (state: RootState, outerProps: OuterProps) => ({
    prevVotes: selectPrevDayVotes(state, outerProps.voting),
    voting: outerProps.voting,
    votes: selectVotesByVoting(state, outerProps.voting),
    players: state.gameCard.players,
    stage: state.gameCard.stage,
  }),
  (dispatch) => ({
    onRemoveVote: (voteID: string) => { dispatch(Actions.removeVote(voteID)); },
    onAddVote: (vote: VoteType) => { dispatch(Actions.addVote(vote)); },
  })
)(VotingForPlayerComponent);

export default VotingForPlayer;