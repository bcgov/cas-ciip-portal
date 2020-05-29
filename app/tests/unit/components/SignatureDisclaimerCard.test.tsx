import React from 'react';
import {shallow} from 'enzyme';
import SignatureDisclaimerCard from 'components/SignatureDisclaimerCard';

describe('SignatureDisclaimerCard', () => {
  it('should match the last accepted snapshot', () => {
    const r = shallow(<SignatureDisclaimerCard />);
    expect(r).toMatchSnapshot();
  });
});
