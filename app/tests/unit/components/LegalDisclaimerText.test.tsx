import React from 'react';
import {shallow} from 'enzyme';
import LegalDisclaimerText from 'components/LegalDisclaimerText';

describe('LegalDisclaimerText Component', () => {
  it('should match the last snapshot', () => {
    const render = shallow(<LegalDisclaimerText />);
    expect(render).toMatchSnapshot();
  });
});
