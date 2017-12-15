import * as React from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'antd';
import { RootState } from '../../common/reducer/root';
import Voting from '../types/voting';
import Player from '../types/player';
import currentDayNumber from '../utils/day_number';
import VotingForPlayer from './voting_for_player';
import selectNormalDayVotings from '../selectors/select_normal_day_votings';
import './day_voting.css';

const Panel = Collapse.Panel;

interface Props {
  stage: number;
  dayNumber: number;
  votings: Array<Voting>;
  currentVotingID: string | undefined;
  players: Array<Player>;
}

const compareByOrder = (v1: Voting, v2: Voting) => v1.order - v2.order;
const sortVotingsByOrder = (votings: Array<Voting>) => votings.sort(compareByOrder);

class DayVotingComponent extends React.Component<Props> {

  renderVoting = (voting: Voting, player: Player) => {
    const disabled = this.props.dayNumber === currentDayNumber(this.props.stage);

    return (
      <Panel header={`Изгнать игрока № ${player.numberAtTable + 1} (${player.nickname})`} key={voting.id} disabled={disabled}>
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
    const { votings, players, currentVotingID, stage, dayNumber } = this.props;
    const collapseProps = dayNumber === currentDayNumber(stage)
      ? { activeKey: currentVotingID ? [currentVotingID] : undefined }
      : {};

    return (
      <Collapse accordion={true} {...collapseProps}>
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
    stage: state.gameCard.stage,
    dayNumber: outerProps.dayNumber,
    currentVotingID: state.gameCard.currentVotingID,
    players: state.gameCard.players,
    votings: selectNormalDayVotings(state, outerProps.dayNumber),
  })
)(DayVotingComponent);

export default DayVoting;
