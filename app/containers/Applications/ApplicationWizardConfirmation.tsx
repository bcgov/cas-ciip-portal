import React from 'react';
import {Button} from 'react-bootstrap';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {ApplicationWizardConfirmation_query} from 'ApplicationWizardConfirmation_query.graphql';
import {CiipApplicationStatus} from 'createApplicationStatusMutation.graphql';
import createApplicationStatusMutation from 'mutations/application/createApplicationStatusMutation';
import ApplicationDetailsContainer from './ApplicationDetailsContainer';
/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */

interface Props {
  query: ApplicationWizardConfirmation_query;
  relay: RelayProp;
}

export const ApplicationWizardConfirmationComponent: React.FunctionComponent<Props> = props => {
  const router = useRouter();
  // Change application status to 'pending' on application submit
  const submitApplication = async () => {
    const {environment} = props.relay;
    const date = new Date().toUTCString();
    // TODO: created_at should be set by a trigger
    const variables = {
      input: {
        applicationStatus: {
          applicationId: props.query.application.rowId,
          applicationStatus: 'PENDING' as CiipApplicationStatus,
          createdAt: date,
          createdBy: 'Admin'
        }
      }
    };
    const response = await createApplicationStatusMutation(
      environment,
      variables
    );
    console.log(response);
    // TODO: check response
    router.push('/complete-submit');
  };

  return (
    <>
      <h1>Summary of your application:</h1>
      <h5>
        Please review the information you have provided before continuing.
      </h5>
      <br />

      <ApplicationDetailsContainer isAnalyst={false} query={props.query} />

      <Link
        passHref
        href={{
          pathname: '/complete-submit'
        }}
      >
        <Button
          className="float-right"
          style={{marginTop: '10px'}}
          onClick={submitApplication}
        >
          Submit Application
        </Button>
      </Link>
    </>
  );
};

export default createFragmentContainer(ApplicationWizardConfirmationComponent, {
  query: graphql`
    fragment ApplicationWizardConfirmation_query on Query
      @argumentDefinitions(applicationId: {type: "ID!"}) {
      application(id: $applicationId) {
        rowId
        applicationStatus {
          id
        }
      }
      ...ApplicationDetailsContainer_query
        @arguments(applicationId: $applicationId)
    }
  `
});
