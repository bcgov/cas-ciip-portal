import React, { Component } from "react";
import { graphql } from "react-relay";
import { ApplicationIdPageQueryResponse } from "ApplicationIdPageQuery.graphql";
import { CiipPageComponentProps } from "next-env";
import DefaultLayout from "layouts/default-layout";
import ApplicationWizard from "containers/Applications/ApplicationWizard";
import { USER } from "data/group-constants";
import { NextRouter } from "next/router";
import {
  getApplicationDisclaimerPageRoute,
  getViewApplicationPageRoute,
} from "routes";

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: ApplicationIdPageQueryResponse["query"];
  router: NextRouter;
}
class ApplicationPage extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query ApplicationIdPageQuery($applicationId: ID!) {
      query {
        application(id: $applicationId) {
          id
          rowId
          swrsReportId
          latestDraftRevision {
            ...ApplicationWizard_applicationRevision
            versionNumber
            legalDisclaimerAccepted
          }
          facilityByFacilityId {
            bcghgid
          }
          latestSubmittedRevision {
            versionNumber
          }
        }
        session {
          ...defaultLayout_session
        }
        ...ApplicationWizard_query
      }
    }
  `;

  static getInitialProps = () => ({
    variables: {
      applicationId: "",
    },
  });

  render() {
    const { query, router } = this.props;
    const { session } = query || {};
    const { application } = query || {};

    // Route to 404 page if no application is present
    if (!application) {
      router.push({ pathname: "/404" });
      return null;
    }

    // Redirect to the application view if the most recent version is a submitted application
    if (
      application.latestSubmittedRevision &&
      application.latestSubmittedRevision.versionNumber >=
        application.latestDraftRevision.versionNumber
    ) {
      router.push(
        getViewApplicationPageRoute(
          application.id,
          application.latestDraftRevision.versionNumber
        )
      );
    }

    if (!application?.latestDraftRevision?.legalDisclaimerAccepted) {
      router.push(
        getApplicationDisclaimerPageRoute(
          application.id,
          application.latestDraftRevision.versionNumber,
          Boolean(application.swrsReportId)
        )
      );
      return null;
    }

    return (
      <DefaultLayout session={session}>
        <div className="application-ids">
          Application ID: {application.rowId}
          <br />
          {application.latestDraftRevision.versionNumber > 1 && (
            <>
              Version Number: {application.latestDraftRevision.versionNumber}
              <br />
            </>
          )}
          BC GHG ID: {application.facilityByFacilityId.bcghgid}
        </div>
        <ApplicationWizard
          query={query}
          loading={this.props.loading}
          applicationRevision={application.latestDraftRevision}
        />
        <style jsx global>{`
          .application-ids {
            margin-top: -50px;
            min-height: 50px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
          @media screen and (min-width: 992px) {
            .application-ids {
              margin-top: -60px;
              min-height: 60px;
            }
          }
        `}</style>
        <style jsx global>{`
          @media print {
            .nav-guide-container {
              display: none !important;
            }
          }
        `}</style>
      </DefaultLayout>
    );
  }
}

export default ApplicationPage;
