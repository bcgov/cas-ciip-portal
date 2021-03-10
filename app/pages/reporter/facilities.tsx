import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {NextRouter} from 'next/router';
import {facilitiesQueryResponse} from 'facilitiesQuery.graphql';
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
      $operatorName: String
      $facilityName: String
      $applicationStatus: CiipApplicationRevisionStatus
      $applicationIdIsNull: Boolean
      $applicationId: Int
      $organisationRowId: Int
      $offset: Int
      $max_results: Int
      $reportingYear: Int = 2019
      $lastSwrsReportingYear: Int
      $facilityBcghgid: String
    ) {
      query {
        ...FacilitiesListContainer_query
          @arguments(
            operatorName: $operatorName
            facilityName: $facilityName
            applicationStatus: $applicationStatus
            applicationIdIsNull: $applicationIdIsNull
            applicationId: $applicationId
            organisationRowId: $organisationRowId
            lastSwrsReportingYear: $lastSwrsReportingYear
            offset: $offset
            max_results: $max_results
            reportingYear: $reportingYear
            facilityBcghgid: $facilityBcghgid
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
        offset: 0,
        max_results: 20
      }
    };
  }

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout showSubheader session={query.session} title="Facilities">
        <FacilitiesListContainer query={query} />
      </DefaultLayout>
    );
  }
}

export default FacilitiesList;
