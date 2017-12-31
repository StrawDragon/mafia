import * as React from 'react';
// import Timer from './timer';
import { LayoutRoot } from '../common/components/layout/root';
import { LayoutContent } from '../common/components/layout/content';
import { LayoutBody } from '../common/components/layout/body';
import { LayoutHeader } from '../common/components/layout/header';
import { CardDistribution } from './card_distribution';

class GameCard extends React.Component {
  render() {
    return (
      <LayoutRoot>
        <LayoutHeader>
          {'header'}
        </LayoutHeader>
        <LayoutBody>
          <LayoutContent>
            <CardDistribution />
          </LayoutContent>
        </LayoutBody>
      </LayoutRoot>
    );
  }
}

export default GameCard;
