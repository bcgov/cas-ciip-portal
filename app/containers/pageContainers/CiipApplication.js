import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../../layouts/default-layout';
import ApplicationWizard from '../Applications/ApplicationWizard';

class CiipApplication extends Component {
  static getInitialProps = ctx => {
    console.log('ctx', ctx);
    return {
      variables: {
        formCondition: {
          rowId: -1
        }
      }
    };
  };

  static query = graphql`
    query CiipApplicationQuery(
      $formCondition: FormJsonCondition!
      $applicationId: ID!
    ) {
      query {
        ...ApplicationWizard_query
          @arguments(
            formCondition: $formCondition
            applicationId: $applicationId
          )
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
