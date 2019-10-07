import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../layouts/default-layout';
import ApplicationListContainer from '../containers/Applications/ApplicationListContainer';

class Applications extends Component {
  state = {
    orderByField: 'operator_name',
    direction: 'ASC',
    orderByDisplay: 'Operator Name',
    searchField: null,
    searchValue: null,
    searchDisplay: 'No Filter'
  };

  // Actions to consume in downstream components
  // static SORT_ACTION=1
  // static MERGE_ACTION=2

  // in downstream component
  // onClick={(event) => handleApplicationsAction({action: Applications.SORT_ACTION})})
  // I didn't fully understand how to make this work, so I moved on with the way I did.
  static query = graphql`
    query applicationsQuery(
      $orderByField: String
      $direction: String
      $searchField: String
      $searchValue: String
    ) {
      query {
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

  actions = {
    toggleDirection: this.toggleDirection,
    sortApplications: this.sortApplications,
    applySearchField: this.applySearchField,
    applySearchValue: this.applySearchValue
  };

  handleEvent = (event, eventKey) => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();
    this.actions[event.target.id](event, eventKey);
  };

  // TODO(wenzowski): how would we get a condition such that this.state is falsy?
  static async getInitialProps() {
    return {
      variables: {
        orderByField: this.state ? this.state.orderByField : 'operator_name',
        direction: this.state ? this.state.direction : 'ASC',
        searchField: this.state ? this.state.searchField : null,
        searchValue: this.state ? this.state.searchValue : null
      }
    };
  }

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout title="Applications">
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
    );
  }
}

export default Applications;
