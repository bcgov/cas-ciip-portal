import React, {Component} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {graphql} from 'react-relay';
import DefaultLayout from '../../layouts/default-layout';
import ApplicationWizard from '../Applications/ApplicationWizard';

class CiipApplication extends Component {
  static getInitialProps = () => {
    return {variables: {formCondition: {rowId: -1}}};
  };

  static query = graphql`
    query CiipApplicationQuery($formCondition: FormJsonCondition!) {
      query {
        ...ApplicationWizard_query @arguments(formCondition: $formCondition)
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout>
        <Jumbotron>
          <h3>Hello, Hamza!</h3>
          <br />
          <p id="welcome-message">
            Welcome to your CleanBC Industrial Incentives Program (CIIP) Portal.
            This is where all your dreams come true. Not only do you get loads
            of money, you basically get it for being an amazing person! You may
            now take a moment to let that CIIP in. {'\u2728'}
          </p>
          <br />
        </Jumbotron>
        <ApplicationWizard query={query} />
      </DefaultLayout>
    );
  }
}

export default CiipApplication;
