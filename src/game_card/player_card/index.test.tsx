import * as React from 'react';
import PlayerCard from '.';
import PlayerRole from '../types/player_role';
import { shallow } from 'enzyme';

const player = () => ({
  id: '1',
  numberAtTable: 0,
  nickname: 'nickname',
  avatar: '',
  dayDeathNumber: undefined,
  warningCount: 0,
  role: PlayerRole.Citizen
});

describe('game_card/player_card', () => {
  it('render without crash', () => {
    const wrapper = shallow(<PlayerCard
      value={player()}
    />);
    expect(wrapper.exists()).toBe(true);
  });
  it('should render children', () => {
    const children = <div id="children">test</div>;
    const wrapper = shallow(<PlayerCard
      value={player()}
    >
      {children}
    </PlayerCard>);
    expect(wrapper.contains(children)).toBe(true);
  });
});
