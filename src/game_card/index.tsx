import * as React from 'react';
// import PlayerList from './player_list';
import { LayoutRoot } from '../common/components/layout/root';
import { LayoutContent } from '../common/components/layout/content';
import { LayoutBody } from '../common/components/layout/body';
import { LayoutHeader } from '../common/components/layout/header';

class GameCard extends React.Component {
  render() {
    return (
      <LayoutRoot>
        <LayoutHeader>
          {'header'}
        </LayoutHeader>
        <LayoutBody>
          <LayoutContent>
            {'body'}
          </LayoutContent>
        </LayoutBody>
      </LayoutRoot>
    );
  }
}

export default GameCard;
