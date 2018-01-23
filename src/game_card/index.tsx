import * as React from 'react';
// import Timer from './timer';
import { LayoutRoot } from '../common/components/layout/root';
import { LayoutContent } from '../common/components/layout/content';
import { LayoutBody } from '../common/components/layout/body';
import { LayoutHeader } from '../common/components/layout/header';
import { CardDistribution } from './card_distribution';
import { connect } from 'react-redux';
import { RootState } from '../common/reducer/root';
import StageType from './types/stage_type';
import { TimerScreen } from './timer_screen';
import { PlayerList } from './player_list';

interface Props {
  stageType: StageType;
}

class GameCard extends React.Component<Props> {
  renderContent = () => {
    const { stageType } = this.props;

    switch (stageType) {
      case StageType.CARD_DISTRIBUTION: return <CardDistribution />;
      case StageType.MAFIA_COLLUSION:
        return (
          <TimerScreen
            stageTitle="Договорка Мафии"
            nextDescription="Перейти к осмотру города Доном"
          />
        );
      case StageType.DON_CITY_INSPECTION:
        return (
          <TimerScreen
            stageTitle="Осмотр города Доном"
            nextDescription="Перейти к осмотру города Шерифом"
          />
        );
      case StageType.SHERIFS_CITY_INSPECTION:
        return (
          <TimerScreen
            stageTitle="Осмотр города Шерифом"
            nextDescription="Перейти утру в городе"
          />
        );
      case StageType.CITY_AWAKENING: return <PlayerList />;
      default: return false;
    }
  }

  render() {
    return (
      <LayoutRoot>
        <LayoutHeader>
          {'header'}
        </LayoutHeader>
        <LayoutBody>
          <LayoutContent>
            {this.renderContent()}
          </LayoutContent>
        </LayoutBody>
      </LayoutRoot>
    );
  }
}

export default connect(
  (state: RootState) => ({
    stageType: state.gameCard.stage.type
  })
)(GameCard);
