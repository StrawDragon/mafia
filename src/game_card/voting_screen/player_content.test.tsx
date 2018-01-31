import * as React from 'react';
import { shallow } from 'enzyme';
import { PlayerContent, Props } from './player_content';

const render = (overrideProps: Partial<Props> = {}) => {
  const props = {
    value: false,
    onToggleVote: () => ({}),
    ...overrideProps,
  };
  
  const wrapper = shallow(<PlayerContent {...props} />);
  
  return {
    wrapper,
    voteButton: () => wrapper.findWhere(shallowWrap => shallowWrap.is('button') && shallowWrap.prop('name') === 'vote-button'),
  };
};

describe('game_card / voting_screen / voting_player_content', () => {
  describe('VotingPlayerContent', () => {
    it('Должен отрисовываться без ошибок', () => {
      const { wrapper } = render();
      
      expect(wrapper.exists()).toBe(true);
    });
    it('Должен отобразить кнопку для голосования', () => {
      const { voteButton } = render();
      
      expect(voteButton().exists()).toBe(true);
    });
    it('При нажатии должен вызывать onVoteToggle', () => {
      const onToggleVote = jest.fn();
      const { voteButton } = render({ onToggleVote });

      voteButton().simulate('click');

      expect(onToggleVote.mock.calls.length).toBe(1);
    });
  });
});