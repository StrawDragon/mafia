import { RootState } from '../../common/reducer/root';
import Voting from '../types/voting';
import VotingType from '../types/voting_type';

const selectNormalDayVotings = (state: RootState, dayNumber: number): Array<Voting> =>
  state.gameCard.votings.filter(voting => voting.dayNumber === dayNumber && voting.type === VotingType.Normal);

export default selectNormalDayVotings;