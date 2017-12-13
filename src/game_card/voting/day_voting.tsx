import * as React from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'antd';
import { RootState } from '../../common/reducer/root';
import Voting from '../types/voting';
import Player from '../types/player';
import VotingForPlayer from './voting_for_player';
import selectNormalDayVotings from '../selectors/select_normal_day_votings';
import './day_voting.css';

const Panel = Collapse.Panel;

interface Props {
  votings: Array<Voting>;
  players: Array<Player>;
}

const compareByOrder = (v1: Voting, v2: Voting) => v1.order - v2.order;
const sortVotingsByOrder = (votings: Array<Voting>) => votings.sort(compareByOrder);

class DayVotingComponent extends React.Component<Props> {
  renderVoting = (voting: Voting, player: Player) => {
    return (
      <Panel header={`Изгнать игрока № ${player.numberAtTable + 1} (${player.nickname})`} key={voting.id}>
        <VotingForPlayer voting={voting}/>
      </Panel>
    );
  }
  renderVotings = (votings: Array<Voting>, players: Array<Player>) => {
    return sortVotingsByOrder(votings).map((voting) => {
      const votingPlayer = players.find(player => player.id === voting.playerID);
      return votingPlayer
        ? this.renderVoting(voting, votingPlayer)
        : false;
    });
  }

  render() {
    const { votings, players } = this.props;

    return (
      <Collapse accordion={true}>
        {this.renderVotings(votings, players)}
      </Collapse>
    );
  }
}

interface OuterProps {
  dayNumber: number;
}

const DayVoting = connect(
  (state: RootState, outerProps: OuterProps) => ({
    players: state.gameCard.players,
    votings: selectNormalDayVotings(state, outerProps.dayNumber),
  })
)(DayVotingComponent);

export default DayVoting;
