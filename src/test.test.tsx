import * as React from 'react';
import { shallow } from 'enzyme';

describe('test work', () => {
  it('yep work', () => {
    const wrapper = shallow(<div/>);
    expect(wrapper.exists()).toBe(true);
  });
});