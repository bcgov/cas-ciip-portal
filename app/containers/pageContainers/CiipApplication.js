import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../../layouts/default-layout';
import ApplicationWizard from '../Applications/ApplicationWizard';

class CiipApplication extends Component {
  static getInitialProps = () => ({
    variables: {
      formId: '',
      applicationId: ''
    }
  });

  static query = graphql`
    query CiipApplicationQuery($formId: ID!, $applicationId: ID!) {
      query {
        ...ApplicationWizard_query
          @arguments(formId: $formId, applicationId: $applicationId)
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
