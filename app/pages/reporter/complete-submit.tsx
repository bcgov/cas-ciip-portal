import React, { Component } from "react";
import Link from "next/link";
import { Button, Row, Col } from "react-bootstrap";
import { graphql } from "react-relay";
import { CiipPageComponentProps } from "next-env";
import { completeSubmitQueryResponse } from "completeSubmitQuery.graphql";
import DefaultLayout from "layouts/default-layout";
import { USER } from "data/group-constants";
import ApplicationProgressBar from "components/Application/ApplicationProgressBar";
import { getViewApplicationPageRoute } from "routes";

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: completeSubmitQueryResponse["query"];
}
class CompleteSubmit extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query completeSubmitQuery($applicationId: ID!) {
      query {
        session {
          ...defaultLayout_session
        }
        application(id: $applicationId) {
          facilityByFacilityId {
            facilityName
            organisationByOrganisationId {
              operatorName
            }
          }
          latestSubmittedRevision {
            versionNumber
          }
        }
      }
    }
  `;

  render() {
    const {
      query: { session, application },
      router,
    } = this.props;

    const { applicationId } = router.query;
    const { versionNumber } = application.latestSubmittedRevision;
    const { facilityName } = application.facilityByFacilityId;
    const {
      operatorName,
    } = application.facilityByFacilityId.organisationByOrganisationId;

    return (
      <DefaultLayout session={session}>
        <Row className="justify-content-md-center mb-5">
          <Col>
            <ApplicationProgressBar
              title="Your Facility's Application Status"
              completed={3}
            />
          </Col>
        </Row>
        <h1 className="pt-5">Thank you for submitting your application.</h1>
        <p className="lead pb-5 pt-3">
          Your application for the{" "}
          <span className="font-weight-bold">{facilityName}</span> facility
          operated by <span className="font-weight-bold">{operatorName}</span>{" "}
          has been received and is being reviewed. We will notify you by email
          regarding any updates.
        </p>
        <Link
          passHref
          href={getViewApplicationPageRoute(
            Array.isArray(applicationId) ? applicationId[0] : applicationId,
            versionNumber
          )}
        >
          <Button
            style={{ padding: "15px", width: "20%" }}
            variant="primary"
            size="sm"
          >
            View Submitted Application
          </Button>
        </Link>
      </DefaultLayout>
    );
  }
}

export default CompleteSubmit;
