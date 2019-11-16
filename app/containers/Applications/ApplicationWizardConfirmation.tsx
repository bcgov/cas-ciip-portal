import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import ApplicationWizardConfirmationCardItem from './ApplicationWizardConfirmationCardItem';

/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */
export const ApplicationWizardConfirmationComponent = props => {
  const formResults = props.query.application.formResultsByApplicationId.edges;

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
      }
    }
  `
});
