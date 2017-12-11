import VotingType from './voting_type';

export default interface Voting {
  id: string;
  type: VotingType;
  dayNumber: number;
  playerID: string;
}