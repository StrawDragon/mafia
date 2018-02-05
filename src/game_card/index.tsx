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
import { CityAwekening } from './city_awekening';
import { DaySpeaking } from './day_speaking/index';

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
            stageTitle='Осмотр города Шерифом'
            nextDescription='Перейти утру в городе'
          />
        );
      case StageType.CITY_AWAKENING:
        return (
          <CityAwekening
            stageTitle='Утро в городе'
            nextDescription='Перейти к обсуждению в течении дня'
          />
        );
      case StageType.DAY_SPEAKING:
        return (<DaySpeaking />);
      case StageType.VOTING:
        return (<h1>В разработке</h1>);
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
