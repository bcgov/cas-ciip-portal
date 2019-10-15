import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../../layouts/default-layout';
import ApplicationWizard from '../Applications/ApplicationWizard';

class CiipApplication extends Component {
  static getInitialProps = () => {
    return {
      variables: {
        formCondition: {
          rowId: -1
        },
        applicationCondition: {
          // TODO: get the application id (instead of rowId) from the query string
          rowId: 3
        }
      }
    };
  };

  static query = graphql`
    query CiipApplicationQuery(
      $formCondition: FormJsonCondition!
      $applicationCondition: ApplicationCondition!
    ) {
      query {
        ...ApplicationWizard_query
          @arguments(
            formCondition: $formCondition
            applicationCondition: $applicationCondition
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
