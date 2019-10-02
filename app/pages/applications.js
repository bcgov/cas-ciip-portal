import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../layouts/default-layout';
import ApplicationList from '../containers/Applications/ApplicationList';

class Applications extends Component {
  static query = graphql`
    query applicationsQuery(
      $orderByField: String
      $direction: String
      $searchField: String
      $searchValue: String
    ) {
      query {
        ...ApplicationList_query
          @arguments(
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
          )
      }
    }
  `;

  static async getInitialProps() {
    // Console.log(Component);
    return {
      variables: {
        orderByField: 'operator_name',
        direction: 'ASC',
        searchField: null,
        searchValue: null
      }
    };
  }

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout title="Applications">
        <ApplicationList query={query} />
      </DefaultLayout>
    );
  }
}

export default Applications;
