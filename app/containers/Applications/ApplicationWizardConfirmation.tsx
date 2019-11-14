import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import ApplicationWizardConfirmationCardItem from './ApplicationWizardConfirmationCardItem';

/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */
export const ApplicationWizardConfirmationComponent = props => {
  const formResults = props.query.application.formResultsByApplicationId.edges;
  console.log(formResults);
  // Const resultObject = {};
  // // Create a parsed result object from each formResult page
  // formResults.forEach(result => {
  //   const parsedResult = JSON.parse(result.node.formResult);
  //   const resultTitle = Object.keys(parsedResult).toString();

  //   resultObject[resultTitle] = parsedResult;
  // });
  // // Create an array of keys to traverse the resultObject
  // const formArray = Object.keys(resultObject);

  // Change application status to 'pending' on application submit

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
      {/*
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
      </Link> */}
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
