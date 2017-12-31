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

interface Props {
  stageType: StageType;
}

class GameCard extends React.Component<Props> {
  renderContent = () => {
    const { stageType } = this.props;

    switch (stageType) {
      case StageType.CARD_DISTRIBUTION: return <CardDistribution />;
      case StageType.MAFIA_COLLUSION: return <span>MAFIA_COLLUSION</span>;
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
