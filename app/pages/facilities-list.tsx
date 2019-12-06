import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {facilitiesListQueryResponse} from 'facilitiesListQuery.graphql';
import SearchTable from '../components/SearchTable';
import DefaultLayout from '../layouts/default-layout';
import FacilitiesListContainer from '../containers/Facilities/FacilitiesListContainer';

interface Props {
  query: facilitiesListQueryResponse['query'];
}
class FacilitiesList extends Component<Props> {
  static query = graphql`
    query facilitiesListQuery(
      $orderByField: String
      $direction: String
      $searchField: String
      $searchValue: String
    ) {
      query {
        ...FacilitiesListContainer_query
          @arguments(
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
          )
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  static async getInitialProps() {
    return {
      variables: {
        orderByField: 'facility_name',
        direction: 'ASC'
      }
    };
  }

  render() {
    const {session} = this.props.query;
    console.log(this.props.query);
    console.log(this.props);
    return (
      <>
        <DefaultLayout showSubheader session={session} title="Facilities">
          <SearchTable
            query={this.props.query}
            defaultOrderByField="facility_name"
            defaultOrderByDisplay="Facility Name"
          >
            {props => <FacilitiesListContainer {...props} />}
          </SearchTable>
        </DefaultLayout>
      </>
    );
  }
}

export default FacilitiesList;
