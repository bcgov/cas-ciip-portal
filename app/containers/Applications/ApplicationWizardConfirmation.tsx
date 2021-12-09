import React, { useState, useMemo } from "react";
import { Card, Alert } from "react-bootstrap";
import validateJsonSchema from "@rjsf/core/dist/cjs/validate";
import { createFragmentContainer, graphql, RelayProp } from "react-relay";
import SubmitApplication from "components/SubmitApplication";
import { ApplicationWizardConfirmation_query } from "ApplicationWizardConfirmation_query.graphql";
import { ApplicationWizardConfirmation_applicationRevision } from "ApplicationWizardConfirmation_applicationRevision.graphql";
import ApplicationDetailsContainer from "./ApplicationDetailsContainer";
import ApplicationOverrideJustification from "components/Application/ApplicationOverrideJustification";
import type { FormJson } from "types";
import ScrollableApplicationDisclaimer from "components/Application/ScrollableApplicationDisclaimer";

/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */

interface Props {
  query: ApplicationWizardConfirmation_query;
  applicationRevision: ApplicationWizardConfirmation_applicationRevision;
  relay: RelayProp;
}

export const ApplicationWizardConfirmationComponent: React.FunctionComponent<Props> = ({
  applicationRevision,
  query,
}) => {
  const hasErrors = useMemo(() => {
    return applicationRevision.orderedFormResults.edges.some(
      ({ node: { formResult, formJsonByFormId } }) => {
        const { schema, customFormats } = formJsonByFormId.formJson as FormJson;

        const { errors } = validateJsonSchema(
          formResult,
          schema,
          undefined,
          undefined,
          undefined,
          customFormats
        );
        return errors.length > 0;
      }
    );
  }, [applicationRevision]);

  const [overrideActive, setOverrideActive] = useState(
    applicationRevision.overrideJustification !== null
  );
  const [applicationDetailsRendered, setApplicationDetailsRendered] = useState(
    false
  );

  const hasValidationWarnings = applicationRevision.validation.edges.some(
    ({ node }) => node.isOk === false
  );

  const validationAlert = (
    <Alert variant="warning">
      <p>
        <strong>
          Some inconsistencies were found in your application. Please address
          these items before submitting by correcting the reported values or
          adding a comment in the relevant section to provide an explanation.
        </strong>
      </p>
      <ul>
        {applicationRevision.validation.edges
          .filter(({ node }) => node.isOk === false)
          .map(({ node }) => (
            <li key={node.validationDescription}>
              {node.validationFailedMessage}
            </li>
          ))}
      </ul>
    </Alert>
  );

  // Ensure the application being submitted is either for the correct reporting year (i.e. not a previous year), or a version greater than 1 (i.e. an existing application being re-submitted)
  const showSubmitButton =
    applicationRevision.applicationByApplicationId.reportingYear ===
      query.openedReportingYear?.reportingYear ||
    applicationRevision.versionNumber > 1;

  return (
    <>
      <h1>Summary of your application:</h1>
      <p style={{ fontSize: "1.25rem", fontWeight: 500 }}>
        Please review the information you have provided before continuing.
      </p>
      {hasValidationWarnings && validationAlert}
      <br />
      <ApplicationOverrideJustification
        overrideActive={overrideActive}
        setOverrideActive={setOverrideActive}
        applicationOverrideJustification={
          applicationRevision.overrideJustification
        }
        revisionId={applicationRevision.id}
        hasErrors={hasErrors}
        applicationDetailsRendered={applicationDetailsRendered}
      />
      <ApplicationDetailsContainer
        liveValidate
        query={query}
        applicationRevision={applicationRevision}
        review={false}
        setApplicationDetailsRendered={setApplicationDetailsRendered}
        diffQuery={null}
      />
      <br />
      {hasErrors && !overrideActive ? (
        <div className="errors">
          Your Application contains errors that must be fixed before submission.
        </div>
      ) : (
        <>
          <Card id="next-step">
            <Card.Header>
              <h2>Before you submit</h2>
            </Card.Header>
            <Card.Body>
              <p>
                Thank you for reviewing your application to the CleanBC
                Industrial Incentive Program.
              </p>
              <p>
                Your application is almost complete. Prior to submitting your
                application, please review and accept the following terms below.
              </p>
              <p>
                By submitting the application you agree that the information
                contained in this application, or information contained in
                emissions reports submitted under the{" "}
                <a
                  href="https://www.bclaws.ca/civix/document/id/complete/statreg/14029_01"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <em>Greenhouse Gas Industrial Reporting and Control Act</em>
                </a>
                , may be disclosed to British Columbia government employees,
                contractors and agencies for the purpose of administering the
                CleanBC Program for Industry or the{" "}
                <a
                  href="https://www.bclaws.ca/civix/document/id/complete/statreg/14029_01"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <em>Greenhouse Gas Industrial Reporting and Control Act</em>
                </a>
                .
              </p>
              <ScrollableApplicationDisclaimer />
            </Card.Body>
          </Card>
          <br />
          {showSubmitButton && (
            <SubmitApplication applicationRevision={applicationRevision} />
          )}
        </>
      )}
      <style jsx global>
        {`
          h1 {
            font-size: 30px;
          }
          .errors {
            margin-left: 20px;
            padding: 20px;
            background: #ce5c5c;
            color: white;
            font-size: 20px;
          }
          @media print {
            .print-hide {
              display: none !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default createFragmentContainer(ApplicationWizardConfirmationComponent, {
  applicationRevision: graphql`
    fragment ApplicationWizardConfirmation_applicationRevision on ApplicationRevision {
      id
      overrideJustification
      versionNumber
      ...SubmitApplication_applicationRevision
      ...ApplicationDetailsContainer_applicationRevision
      orderedFormResults {
        edges {
          node {
            formResult
            formJsonByFormId {
              formJson
            }
          }
        }
      }
      validation {
        edges {
          node {
            validationDescription
            validationFailedMessage
            isOk
          }
        }
      }
      applicationByApplicationId {
        reportingYear
      }
    }
  `,
  query: graphql`
    fragment ApplicationWizardConfirmation_query on Query {
      ...ApplicationDetailsContainer_query
      openedReportingYear {
        reportingYear
      }
    }
  `,
});
