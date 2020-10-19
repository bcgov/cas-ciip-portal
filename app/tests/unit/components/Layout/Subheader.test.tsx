import React from 'react';
import {render} from 'enzyme';
import Subheader from 'components/Layout/Subheader';

describe('The Subheader', () => {
  it('matches the last accepted Snapshot', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementationOnce(() => ({
      asPath: '/reporter'
    }));
    const wrapper = render(<Subheader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('changes the active menu item depending on the current route', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter
      .mockImplementationOnce(() => ({
        asPath: '/reporter'
      }))
      .mockImplementation(() => {
        // ideally we would use mockImplementationOnce (and did until upgrating to next 9.5.5),
        // but now the function is called multiple times for each render, not sure why
        return {
          asPath: '/reporter/facilities'
        };
      });
    let wrapper = render(<Subheader />);
    expect(wrapper.find('.active a').text()).toBe('My Dashboard');
    wrapper = render(<Subheader />);
    expect(wrapper.find('.active a').text()).toBe('My Applications');
  });
});
