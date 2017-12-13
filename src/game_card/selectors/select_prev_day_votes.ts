import { RootState } from '../../common/reducer/root';
import Voting from '../types/voting';
import Vote from '../types/vote';
import selectVotesByVoting from './select_votes_by_voting';

const selectPrevDayVotes = (state: RootState, voting: Voting): Array<Vote> => {
  const prevVotings = state.gameCard.votings.filter(v => v.dayNumber === voting.dayNumber && v.order < voting.order);

  return prevVotings.reduce((votes: Array<Vote>, voting) => votes.push(...selectVotesByVoting(state, voting)), []);
}