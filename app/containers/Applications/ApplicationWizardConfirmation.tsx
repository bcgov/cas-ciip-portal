import React from 'react';
import {Button} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import Link from 'next/link';
import updateApplicationStatusMutation from '../../mutations/application/updateApplicationStatusMutation';
import ApplicationWizardConfirmationCardItem from './ApplicationWizardConfirmationCardItem';

/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */
export const ApplicationWizardConfirmationComponent = props => {
  const formResults = props.query.application.formResultsByApplicationId.edges;

  // Change application status to 'pending' on application submit
  const submitApplication = async () => {
    const {environment} = props.relay;
    const variables = {
      input: {
        id:
          props.query.application.applicationStatusesByApplicationId.edges[0]
            .node.id,
        applicationStatusPatch: {
          applicationStatus: 'pending'
        }
      }
    };
    const response = await updateApplicationStatusMutation(
      environment,
      variables
    );
    console.log(response);
  };

  return (
    <>
      <h1>Summary of your application:</h1>
      <h5>
        Please review the information you have provided before continuing.
      </h5>
      <br />

      {formResults.map(({node}) => (
        <ApplicationWizardConfirmationCardItem
          key={node.id}
          formResult={node}
        />
      ))}
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
        id
        formResultsByApplicationId {
          edges {
            node {
              id
              ...ApplicationWizardConfirmationCardItem_formResult
            }
          }
        }
        applicationStatusesByApplicationId(orderBy: CREATED_AT_DESC) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `
});
