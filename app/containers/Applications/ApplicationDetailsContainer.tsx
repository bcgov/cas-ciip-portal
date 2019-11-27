import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ApplicationDetailsContainer_query} from 'ApplicationDetailsContainer_query.graphql';
import ApplicationDetailsCardItem from './ApplicationDetailsCardItem';

/*
 * The ApplicationDetails renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */

interface Props {
  query: ApplicationDetailsContainer_query;
  relay: RelayProp;
}

export const ApplicationDetailsComponent: React.FunctionComponent<Props> = props => {
  const formResults = props.query.application.formResultsByApplicationId.edges;

  return (
    <>
      {formResults.map(({node}) => (
        <ApplicationDetailsCardItem
          key={node.id}
          isAnalyst={props.isAnalyst}
          formResult={node}
        />
      ))}
    </>
  );
};

export default createFragmentContainer(ApplicationDetailsComponent, {
  query: graphql`
    fragment ApplicationDetailsContainer_query on Query
      @argumentDefinitions(applicationId: {type: "ID!"}) {
      application(id: $applicationId) {
        id
        formResultsByApplicationId {
          edges {
            node {
              id
              ...ApplicationDetailsCardItem_formResult
            }
          }
        }
      }
    }
  `
});
