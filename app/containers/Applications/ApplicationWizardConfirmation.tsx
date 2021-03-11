import React, {useState} from 'react';
import {Card} from 'react-bootstrap';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import SubmitApplication from 'components/SubmitApplication';
import {ApplicationWizardConfirmation_query} from 'ApplicationWizardConfirmation_query.graphql';
import {ApplicationWizardConfirmation_application} from 'ApplicationWizardConfirmation_application.graphql';
import ApplicationDetailsContainer from './ApplicationDetailsContainer';
import ApplicationOverrideJustification from 'components/Application/ApplicationOverrideJustification';

/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */

interface Props {
  query: ApplicationWizardConfirmation_query;
  application: ApplicationWizardConfirmation_application;
  relay: RelayProp;
}

export const ApplicationWizardConfirmationComponent: React.FunctionComponent<Props> = (
  props
) => {
  // State of hasErrors is set to null until the child component ApplicationDetailsContainer returns a valid true/false decision
  const [hasErrors, setHasErrors] = useState(false);
  const revision = props.application.latestDraftRevision;
  const [overrideActive, setOverrideActive] = useState(
    revision.overrideJustification !== null
  );
  const [applicationDetailsRendered, setApplicationDetailsRendered] = useState(
    false
  );

  return (
    <>
      <h1>Summary of your application:</h1>
      <p style={{fontSize: '1.25rem', fontWeight: 500}}>
        Please review the information you have provided before continuing.
      </p>
      <br />
      <ApplicationOverrideJustification
        overrideActive={overrideActive}
        setOverrideActive={setOverrideActive}
        applicationOverrideJustification={
          props.application.latestDraftRevision.overrideJustification
        }
        revisionId={props.application.latestDraftRevision.id}
        hasErrors={hasErrors}
        applicationDetailsRendered={applicationDetailsRendered}
      />
      <ApplicationDetailsContainer
        liveValidate
        query={props.query}
        application={props.application}
        review={false}
        setHasErrors={setHasErrors}
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
          <SubmitApplication application={props.application} />
        </>
      )}
      <style jsx global>
        {`
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
      rowId
      ...SubmitApplication_application
      ...ApplicationDetailsContainer_application @arguments(version: $version)
      latestDraftRevision {
        id
        versionNumber
        overrideJustification
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
