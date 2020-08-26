import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {NextRouter} from 'next/router';
import {facilitiesQueryResponse} from 'facilitiesQuery.graphql';
import SearchTable from 'components/SearchTable';
import DefaultLayout from 'layouts/default-layout';
import FacilitiesListContainer from 'containers/Facilities/FacilitiesListContainer';
import {USER} from 'data/group-constants';

const ALLOWED_GROUPS = [USER];

interface Props {
  query: facilitiesQueryResponse['query'];
  router: NextRouter;
}
class FacilitiesList extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query facilitiesQuery(
      $orderByField: String
      $direction: String
      $searchField: String
      $searchValue: String
      $organisationRowId: String
      $offsetValue: Int
      $maxResultsPerPage: Int
      $reportingYear: Int
    ) {
      query {
        ...FacilitiesListContainer_query
          @arguments(
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
            organisationRowId: $organisationRowId
            offsetValue: $offsetValue
            maxResultsPerPage: $maxResultsPerPage
            reportingYear: $reportingYear
          )
        session {
          ...defaultLayout_session
        }
        nextReportingYear {
          reportingYear
        }
      }
    }
  `;

  static async getInitialProps() {
    return {
      variables: {
        orderByField: 'facility_name',
        direction: 'ASC',
        offsetValue: 0,
        maxResultsPerPage: 10,
        reportingYear: 2018
      }
    };
  }

  render() {
    const {session} = this.props.query;
    const defaultReportingYear =
      this.props.query.nextReportingYear.reportingYear - 1;
    return (
      <DefaultLayout showSubheader session={session} title="Facilities">
        <SearchTable
          query={this.props.query}
          defaultOrderByField="facility_name"
          defaultOrderByDisplay="Facility Name"
          defaultReportingYear={defaultReportingYear}
        >
          {(props) => <FacilitiesListContainer {...props} />}
        </SearchTable>
      </DefaultLayout>
    );
  }
}

export default FacilitiesList;
