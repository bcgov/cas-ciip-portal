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
        <ApplicationWizard query={query} />
      </DefaultLayout>
    );
  }
}

export default CiipApplication;
