import React, {useState, useMemo} from 'react';
import {Card, Alert} from 'react-bootstrap';
import validateJsonSchema from '@rjsf/core/dist/cjs/validate';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import SubmitApplication from 'components/SubmitApplication';
import {ApplicationWizardConfirmation_query} from 'ApplicationWizardConfirmation_query.graphql';
import {ApplicationWizardConfirmation_application} from 'ApplicationWizardConfirmation_application.graphql';
import ApplicationDetailsContainer from './ApplicationDetailsContainer';
import ApplicationOverrideJustification from 'components/Application/ApplicationOverrideJustification';
import {FormJson} from 'next-env';

/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */

interface Props {
  query: ApplicationWizardConfirmation_query;
  application: ApplicationWizardConfirmation_application;
  relay: RelayProp;
}

export const ApplicationWizardConfirmationComponent: React.FunctionComponent<Props> = ({
  application,
  query
}) => {
  const hasErrors = useMemo(() => {
    return application.orderedFormResults.edges.some(
      ({node: {formResult, formJsonByFormId}}) => {
        const {schema, customFormats} = formJsonByFormId.formJson as FormJson;

        const {errors} = validateJsonSchema(
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
  }, [application]);

  const revision = application.latestDraftRevision;
  const [overrideActive, setOverrideActive] = useState(
    revision.overrideJustification !== null
  );
  const [applicationDetailsRendered, setApplicationDetailsRendered] = useState(
    false
  );

  const hasValidationWarnings = application.validation.edges.some(
    ({node}) => node.isOk === false
  );

  const validationAlert = (
    <Alert variant="warning">
      <p>
        <strong>
          Some inconsistencies were found in your application. If possible,
          please address the following items before submitting:
        </strong>
      </p>
      <ul>
        {application.validation.edges
          .filter(({node}) => node.isOk === false)
          .map(({node}) => (
            <li key={node.validationDescription}>
              {node.validationFailedMessage}
            </li>
          ))}
      </ul>
    </Alert>
  );

  return (
    <>
      <h1>Summary of your application:</h1>
      <p style={{fontSize: '1.25rem', fontWeight: 500}}>
        Please review the information you have provided before continuing.
      </p>
      {hasValidationWarnings && validationAlert}
      <br />
      <ApplicationOverrideJustification
        overrideActive={overrideActive}
        setOverrideActive={setOverrideActive}
        applicationOverrideJustification={
          application.latestDraftRevision.overrideJustification
        }
        revisionId={application.latestDraftRevision.id}
        hasErrors={hasErrors}
        applicationDetailsRendered={applicationDetailsRendered}
      />
      <ApplicationDetailsContainer
        liveValidate
        query={query}
        application={application}
        review={false}
        setApplicationDetailsRendered={setApplicationDetailsRendered}
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
              By submitting the application the applicant agrees that the
              information contained on this application, or information
              contained in emission reports under the Greenhouse Gas Industrial
              Reporting and Control Act, may be disclosed to British Columbia
              government employees, contractors and agencies for the purpose of
              administering the CleanBC Program for Industry or the Greenhouse
              Gas Industrial Reporting and Control Act.
            </Card.Body>
          </Card>
          <br />
          <SubmitApplication application={application} />
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
  application: graphql`
    fragment ApplicationWizardConfirmation_application on Application
    @argumentDefinitions(version: {type: "String!"}) {
      id
      ...SubmitApplication_application
      ...ApplicationDetailsContainer_application @arguments(version: $version)
      orderedFormResults(versionNumberInput: $version) {
        edges {
          node {
            formResult
            formJsonByFormId {
              formJson
            }
          }
        }
      }
      latestDraftRevision {
        id
        overrideJustification
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
    }
  `,
  query: graphql`
    fragment ApplicationWizardConfirmation_query on Query {
      ...ApplicationDetailsContainer_query
        @arguments(
          applicationId: $applicationId
          oldVersion: $version
          newVersion: $version
        )
    }
  `
});
