import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../layouts/default-layout';
import ApplicationListContainer from '../containers/Applications/ApplicationListContainer';

class Applications extends Component {
  state = {
    orderByField: 'operator_name',
    direction: 'ASC',
    orderByDisplay: 'Operator Name',
    filterField: null,
    filterValue: null,
    filterDisplay: 'No Filter'
  };

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

  sortApplications = (eventKey, event) => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();
    console.log(eventKey, event.target.text);
    this.setState({
      orderByField: eventKey,
      orderByDisplay: event.target.text
    });
  };

  toggleDirection = event => {
    event.preventDefault();
    event.stopPropagation();
    this.state.direction === 'ASC'
      ? this.setState({direction: 'DESC'})
      : this.setState({direction: 'ASC'});
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

  static async getInitialProps() {
    console.log(this.state);
    return {
      variables: {
        orderByField: this.state ? this.state.orderByField : 'operator_name',
        direction: this.state ? this.state.direction : 'ASC',
        searchField: this.state ? this.state.filterField : null,
        searchValue: this.state ? this.state.filterValue : null
      }
    };
  }

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout title="Applications">
        <ApplicationListContainer
          query={query}
          sortApplications={this.sortApplications}
          toggleDirection={this.toggleDirection}
          applyFilterField={this.applyFilterField}
          applyFilterValue={this.applyFilterValue}
          orderByDisplay={this.state.orderByDisplay}
          filterDisplay={this.state.filterDisplay}
          direction={this.state.direction}
          orderByField={this.state.orderByField}
          searchField={this.state.filterField}
          searchValue={this.state.filterValue}
        />
      </DefaultLayout>
    );
  }
}

export default Applications;
