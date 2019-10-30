import React from 'react';
import {Button} from 'react-bootstrap';
import {useRouter} from 'next/router';
import {createFragmentContainer, graphql} from 'react-relay';
import updateApplicationStatusMutation from '../../mutations/application/updateApplicationStatusMutation';
import ApplicationWizardConfirmationCardItem from './ApplicationWizardConfirmationCardItem';

/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */
export const ApplicationWizardConfirmationComponent = props => {
  const router = useRouter();
  const formResults = props.query.application.formResultsByApplicationId.edges;
  const resultObject = {};
  // Create a parsed result object from each formResult page
  formResults.forEach(result => {
    const parsedResult = JSON.parse(result.node.formResult);
    const resultTitle = Object.keys(parsedResult);

    resultObject[resultTitle] = parsedResult;
  });
  // Create an array of keys to traverse the resultObject
  const formArray = Object.keys(resultObject);

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
    const newUrl = {
      pathname: '/complete-submit'
    };
    router.replace(newUrl, newUrl, {shallow: true});
  };

  return (
    <>
      {formArray.map(formTitle =>
        Object.keys(resultObject[formTitle]).map(formSubtitle => (
          <ApplicationWizardConfirmationCardItem
            key={(formTitle, formSubtitle)}
            formTitle={formTitle}
            formSubtitle={formSubtitle}
            resultObject={resultObject}
          />
        ))
      )}

      <Button
        className="float-right"
        style={{marginTop: '10px'}}
        onClick={submitApplication}
      >
        Submit
      </Button>
    </>
  );
};

export default createFragmentContainer(ApplicationWizardConfirmationComponent, {
  query: graphql`
    fragment ApplicationWizardConfirmation_query on Query
      @argumentDefinitions(applicationId: {type: "ID!"}) {
      application(id: $applicationId) {
        formResultsByApplicationId {
          edges {
            node {
              formResult
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
