import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {ApplicationsQueryResponse} from '__generated__/ApplicationsQuery.graphql';
import DefaultLayout from '../../layouts/default-layout';
import ApplicationListContainer from '../Applications/ApplicationListContainer';

interface Props {
  query?: ApplicationsQueryResponse['query'];
}

class Applications extends Component<Props> {
  // In downstream component
  // onClick={(event) => handleApplicationsAction({action: Applications.SORT_ACTION})})
  // I didn't fully understand how to make this work, so I moved on with the way I did.
  static query = graphql`
    query ApplicationsQuery(
      $orderByField: String
      $direction: String
      $searchField: String
      $searchValue: String
    ) {
      query {
        session {
          ...Header_session
        }
        ...ApplicationListContainer_query
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
    orderByField: 'operator_name',
    direction: 'ASC',
    orderByDisplay: 'Operator Name',
    searchField: null,
    searchValue: null,
    searchDisplay: 'No Filter'
  };

  static async getInitialProps() {
    return {
      variables: {
        orderByField: 'operator_name',
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
        <DefaultLayout title="Applications" session={query.session}>
          <ApplicationListContainer
            query={query}
            orderByDisplay={this.state.orderByDisplay}
            searchDisplay={this.state.searchDisplay}
            direction={this.state.direction}
            orderByField={this.state.orderByField}
            searchField={this.state.searchField}
            searchValue={this.state.searchValue}
            handleEvent={this.handleEvent}
          />
        </DefaultLayout>
      </>
    );
  }
}

export default Applications;
