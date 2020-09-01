import React from 'react';
import {shallow} from 'enzyme';
import {RegistrationLoginButtonsComponent} from 'containers/RegistrationLoginButtons';

describe('The RegistrationLoginButtons component', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');
  useRouter.mockImplementation(() => ({
    query: {}
  }));

  it('should render the date where the current application window closes', () => {
    const component = shallow(
      <RegistrationLoginButtonsComponent
        query={{
          ' $refType': 'RegistrationLoginButtons_query',
          openedReportingYear: {
            applicationCloseTime: '2020-01-01T23:59:59-07:00'
          }
        }}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find('CardText').first().text()).toStartWith(
      'Operators must submit a CIIP application form by January 01, 2020.'
    );
  });

  it('should render a message about the application window being closed', () => {
    const component = shallow(
      <RegistrationLoginButtonsComponent
        query={{
          ' $refType': 'RegistrationLoginButtons_query',
          openedReportingYear: null
        }}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find('CardText').first().text()).toStartWith(
      'The due date for CIIP application forms has passed.'
    );
  });

  it('should render an <a href="/register" /> that is not wrapped in a next.js Link', () => {
    // The register route is redirecting to keycloak, so we don't want Next to prefetch it
    const component = shallow(
      <RegistrationLoginButtonsComponent
        query={{
          ' $refType': 'RegistrationLoginButtons_query',
          openedReportingYear: {
            applicationCloseTime: '2020-01-01T23:59:59-07:00'
          }
        }}
      />
    );
    expect(component.find('a').first().prop('href')).toEqual('/register');
    expect(component.find('a').first().parent().type()).not.toEqual('Link');
  });
});
