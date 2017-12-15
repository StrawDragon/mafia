import VotingType from './voting_type';

export default interface Voting {
  id: string;
  order: number;
  type: VotingType;
  dayNumber: number;
  playerID: string;
}