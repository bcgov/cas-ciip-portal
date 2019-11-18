import React from 'react';
import {shallow} from 'enzyme';
import {DefaultLayoutComponent} from '../../layouts/default-layout';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

it('It matches the last accepted Snapshot', () => {
  const wrapper = shallow(
    <DefaultLayoutComponent
      session={null}
      needsSession={false}
      needsUser={false}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it('Redirects the user to the login page if the session is null', () => {
  let pushedQuery;
  useRouter.mockImplementationOnce(() => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: query => {
      pushedQuery = query;
    }
  }));

  shallow(<DefaultLayoutComponent session={null} needsUser={false} />);
  expect(pushedQuery.pathname).toBe('/login-redirect');
});

it('Redirects the user to the registration page if the session exists but the user is null', () => {
  let pushedQuery;
  useRouter.mockImplementationOnce(() => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: query => {
      pushedQuery = query;
    }
  }));

  shallow(
    <DefaultLayoutComponent
      session={{ciipUserBySub: null, ' $refType': 'defaultLayout_session'}}
    />
  );
  expect(pushedQuery.pathname).toBe('/registration');
});
