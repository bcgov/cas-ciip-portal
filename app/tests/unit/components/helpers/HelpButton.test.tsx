import React from 'react';
import {mount} from 'enzyme';
import HelpButton from 'components/helpers/HelpButton';

describe('HelpButton', () => {
  describe('as an internal user', () => {
    it('(closed) matches the last accepted snapshot', () => {
      const r = mount(<HelpButton />);
      expect(r).toMatchSnapshot();
    });
    it('(opened) matches the last accepted snapshot', () => {
      const r = mount(<HelpButton />);
      r.find('button#help-button').simulate('click');
      expect(r).toMatchSnapshot();
    });
  });
  describe('as an external user', () => {
    it('(closed) matches the last accepted snapshot', () => {
      const r = mount(<HelpButton isInternalUser={false} />);
      expect(r).toMatchSnapshot();
    });
    it('(opened) matches the last accepted snapshot', () => {
      const r = mount(<HelpButton isInternalUser={false} />);
      r.find('button#help-button').simulate('click');
      expect(r).toMatchSnapshot();
    });
  });
});
