export default interface Vote {
  id: string;
  votingID: string;
  fromPlayerID: string;
  toPlayerID: string;
  value: boolean;
}