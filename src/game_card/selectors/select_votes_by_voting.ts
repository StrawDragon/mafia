import { RootState } from '../../common/reducer/root';
import Voting from '../types/voting';
import Vote from '../types/vote';

const selectVotesByVoting = (state: RootState, voting: Voting): Array<Vote> =>
  state.gameCard.votes.filter(vote => vote.votingID === voting.id);

export default selectVotesByVoting;