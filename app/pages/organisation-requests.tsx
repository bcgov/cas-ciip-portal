import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {organisationRequestsQueryResponse} from 'organisationRequestsQuery.graphql';
import DefaultLayout from '../layouts/default-layout';
import OrganisationRequestsTable from '../containers/Admin/OrganisationRequestsTable';

interface Props {
  query: organisationRequestsQueryResponse['query'];
}
class OrganisationRequests extends Component<Props> {
  static query = graphql`
    query organisationRequestsQuery(
      $orderByField: String
      $direction: String
      $searchField: String
      $searchValue: String
    ) {
      query {
        ...OrganisationRequestsTable_query
          @arguments(
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
          )
      }
    }
  `;

  state = {
    orderByField: 'status',
    orderByDisplay: 'Status',
    direction: 'ASC',
    searchField: null,
    searchValue: null,
    searchDisplay: 'No Filter'
  };

  static async getInitialProps() {
    return {
      variables: {
        orderByField: 'status',
        direction: 'ASC',
        searchField: null,
        searchValue: null
      }
    };
  }

  toggleDirection = () => {
    this.state.direction === 'ASC'
      ? this.setState({direction: 'DESC'})
      : this.setState({direction: 'ASC'});
  };

  sortApplications = (event, eventKey) => {
    this.setState({
      orderByField: eventKey,
      orderByDisplay: event.target.text
    });
  };

  applySearchField = (event, eventKey) => {
    this.setState({
      searchField: eventKey,
      searchDisplay: event.target.text,
      searchValue: null
    });
  };

  applySearchValue = event => {
    if (this.state.searchField !== 'none') {
      this.setState({searchValue: event.nativeEvent.target[0].value});
    }
  };

  handleEvent = (event, eventKey) => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();
    this[event.target.id](event, eventKey);
  };

  render() {
    const {query} = this.props;
    return (
      <>
        <DefaultLayout title="Organisation Requests">
          <OrganisationRequestsTable
            query={query}
            orderByDisplay={this.state.orderByDisplay}
            orderByField={this.state.orderByField}
            direction={this.state.direction}
            searchField={this.state.searchField}
            searchValue={this.state.searchValue}
            searchDisplay={this.state.searchDisplay}
            handleEvent={this.handleEvent}
          />
        </DefaultLayout>
      </>
    );
  }
}

export default OrganisationRequests;
