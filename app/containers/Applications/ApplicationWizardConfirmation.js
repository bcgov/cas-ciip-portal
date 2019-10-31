import React from 'react';
import {Button} from 'react-bootstrap';
import Link from 'next/link';
import {createFragmentContainer, graphql} from 'react-relay';
import ApplicationWizardConfirmationCardItem from './ApplicationWizardConfirmationCardItem';

/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */
export const ApplicationWizardConfirmationComponent = props => {
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

      <Link
        passHref
        href={{
          pathname: '/ciip-application',
          query: {
            formResultId:
              props.query.application.orderedFormResults.edges[
                props.query.application.orderedFormResults.edges.length - 1
              ].node.id,
            applicationId: props.query.application.id,
            certificationPage: true
          }
        }}
      >
        <Button className="float-right" style={{marginTop: '10px'}}>
          Next
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
              formResult
            }
          }
        }
        orderedFormResults {
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
