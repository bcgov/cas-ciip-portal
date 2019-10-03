import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../layouts/default-layout';
import ApplicationListContainer from '../containers/Applications/ApplicationListContainer';

class Applications extends Component {
  // TODO(wenzowski): is this an es6 thing? waaaaaaaaaaat?
  // TODO(wenzowski): for the relay variables, can we contain them to one key in our state object?
  state = {
    orderByField: 'operator_name',
    direction: 'ASC',
    orderByDisplay: 'Operator Name',
    filterField: null,
    filterValue: null,
    filterDisplay: 'No Filter'
  };

  // Actions to consume in downstream components
  // static SORT_ACTION=1
  // static MERGE_ACTION=2

  // in downstream component
  // onClick={(event) => handleApplicationsAction({action: Applications.SORT_ACTION})})

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

  actions = {
    toggleDirection: () => {
      this.state.direction === 'ASC'
        ? this.setState({direction: 'DESC'})
        : this.setState({direction: 'ASC'});
    },
    sortApplications: (event, eventKey) => {
      this.setState({
        orderByField: eventKey,
        orderByDisplay: event.target.text
      });
    }
  };

  handleEvent = (event, eventKey) => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();
    this.actions[event.target.id](event, eventKey);
  };

  applyFilterField = (eventKey, event) => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();
    this.setState({
      filterField: eventKey,
      filterDisplay: event.target.text,
      filterValue: null
    });
  };

  applyFilterValue = event => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();
    if (this.state.filterField !== 'none') {
      this.setState({filterValue: event.target[0].value});
    }
  };

  // TODO(wenzowski): how would we get a condition such that this.state is falsy?
  static async getInitialProps() {
    return {
      variables: {
        orderByField: this.state ? this.state.orderByField : 'operator_name',
        direction: this.state ? this.state.direction : 'ASC',
        searchField: this.state ? this.state.filterField : null,
        searchValue: this.state ? this.state.filterValue : null
      }
    };
  }

  // TODO(wenzowski): where possible, event switches should follow the `handleEvent()` naming convention
  // @see https://reactpatterns.com/#event-switch
  render() {
    const {query} = this.props;
    return (
      <DefaultLayout title="Applications">
        <ApplicationListContainer
          query={query}
          applyFilterField={this.applyFilterField}
          applyFilterValue={this.applyFilterValue}
          orderByDisplay={this.state.orderByDisplay}
          filterDisplay={this.state.filterDisplay}
          direction={this.state.direction}
          orderByField={this.state.orderByField}
          searchField={this.state.filterField}
          searchValue={this.state.filterValue}
          handleEvent={this.handleEvent}
        />
      </DefaultLayout>
    );
  }
}

export default Applications;
