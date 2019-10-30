import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../../layouts/default-layout';
import ApplicationWizard from '../Applications/ApplicationWizard';

class CiipApplication extends Component {
  static getInitialProps = () => ({
    variables: {
      formResultId: '',
      applicationId: ''
    }
  });

  static query = graphql`
    query CiipApplicationQuery($formResultId: ID!, $applicationId: ID!) {
      query {
        ...ApplicationWizard_query
          @arguments(formResultId: $formResultId, applicationId: $applicationId)
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout>
        <ApplicationWizard query={query} />
      </DefaultLayout>
    );
  }
}

export default CiipApplication;
