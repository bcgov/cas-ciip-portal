import React from 'react';
import {shallow} from 'enzyme';
import Landing from '../../pages/landing';

describe('landing', () => {
  afterEach(cleanup);
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper).toMatchSnapshot();
  });

  it('get BCEID button should bring up modal', () => {
    const {getByTestId} = shallow(<Landing />);
    fireEvent.click(getByTestId('get-modal'));
    expect(getByTestId('modal')).toBeDefined();
    expect(getByTestId('btn-get-portal')).toBeDefined();
  });
  it('continue button should collapse modal and bring up bceid site', () => {
    const {getByTestId} = shallow(<Landing />);
    fireEvent.click(getByTestId('get-modal'));
    fireEvent.click(getByTestId('btn-get-portal'));
    expect({getByTestId}).not.toContain('modal');
    expect(document.querySelector('.btn-portal').getAttribute('href')).toBe(
      'https://www.bceid.ca/'
    );
  });
});
