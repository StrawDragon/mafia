import * as React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import DayVoting from './day_voting';
import getDayNumber from '../utils/day_number';
import { RootState } from '../../common/reducer/root';

const TabPane = Tabs.TabPane;

interface Props {
  dayCount: number;
}

class VotingComponent extends React.Component<Props> {
  renderDay = (dayNumber: number) => {
    return (
      <TabPane tab={`День ${dayNumber + 1}`} key={dayNumber}>
        <DayVoting dayNumber={dayNumber} />
      </TabPane>
    );
  }

  renderDays = (dayCount: number) => {
    const dayNumbers = Array.from(Array(dayCount).keys());

    return dayNumbers.map(dayNumber => this.renderDay(dayNumber));
  }

  render () {
    const { dayCount } = this.props;

    return (
      <Tabs defaultActiveKey="0" size="small" tabPosition="left">
        {this.renderDays(dayCount)}
      </Tabs>
    );
  }
}

const Voting = connect(
  (state: RootState) => ({
    dayCount: getDayNumber(state.gameCard.stage) + 1,
  })
)(VotingComponent);

export default Voting;