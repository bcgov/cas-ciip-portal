import React, { Component } from "react";
import { graphql } from "react-relay";
import { NextRouter } from "next/router";
import { facilitiesQueryResponse } from "facilitiesQuery.graphql";
import DefaultLayout from "layouts/default-layout";
import FacilitiesListContainer from "containers/Facilities/FacilitiesListContainer";
import { USER } from "data/group-constants";
import { DEFAULT_PAGE_SIZE } from "components/FilterableTable/FilterableTablePagination";
import { Col, Row } from "react-bootstrap";
import ApplicationProgressBar from "components/Application/ApplicationProgressBar";

const ALLOWED_GROUPS = [USER];

interface Props {
  query: facilitiesQueryResponse["query"];
  router: NextRouter;
}
class FacilitiesList extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query facilitiesQuery(
      $operatorName: String
      $facilityName: String
      $facilityType: String
      $applicationStatus: CiipApplicationRevisionStatus
      $applicationIdIsNull: Boolean
      $applicationId: Int
      $organisationRowId: Int
      $offset: Int
      $pageSize: Int
      $reportingYear: Int
      $hasSwrsReport: Boolean
      $facilityBcghgid: String
    ) {
      query {
        ...FacilitiesListContainer_query
          @arguments(
            operatorName: $operatorName
            facilityName: $facilityName
            facilityType: $facilityType
            applicationStatus: $applicationStatus
            applicationIdIsNull: $applicationIdIsNull
            applicationId: $applicationId
            organisationRowId: $organisationRowId
            hasSwrsReport: $hasSwrsReport
            offset: $offset
            pageSize: $pageSize
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
        pageSize: DEFAULT_PAGE_SIZE,
      },
    };
  }

  render() {
    const { query } = this.props;
    return (
      <DefaultLayout
        showSubheader
        session={query.session}
        title="Facilities"
        width="wide"
      >
        <Row className="justify-content-md-center mb-5">
          <Col>
            <ApplicationProgressBar title="Steps to Apply for an Operator's Facility" />
          </Col>
        </Row>
        <FacilitiesListContainer query={query} />
      </DefaultLayout>
    );
  }
}

export default FacilitiesList;
