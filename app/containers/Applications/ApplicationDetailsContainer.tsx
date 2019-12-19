import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ApplicationDetailsContainer_query} from 'ApplicationDetailsContainer_query.graphql';
import {ApplicationDetailsContainer_application} from 'ApplicationDetailsContainer_application.graphql';
import IncentiveCalculatorContainer from 'containers/Incentives/IncentiveCalculatorContainer';
import ApplicationDetailsCardItem from './ApplicationDetailsCardItem';

/*
 * The ApplicationDetails renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */

interface Props {
  query: ApplicationDetailsContainer_query;
  application: ApplicationDetailsContainer_application;
  relay: RelayProp;
  isAnalyst: boolean;
}

export const ApplicationDetailsComponent: React.FunctionComponent<Props> = props => {
  const formResults = props.application.orderedFormResults.edges;

  return (
    <div>
      {formResults.map(({node}) => (
        <ApplicationDetailsCardItem
          key={node.id}
          isAnalyst={props.isAnalyst}
          formResult={node}
          query={props.query.query}
        />
      ))}
      <IncentiveCalculatorContainer
        applicationRevision={props.query.query.applicationRevision}
      />
    </div>
  );
};

export default createFragmentContainer(ApplicationDetailsComponent, {
  query: graphql`
    fragment ApplicationDetailsContainer_query on Query
      @argumentDefinitions(revisionId: {type: "ID!"}) {
      query {
        ...ApplicationDetailsCardItem_query
        applicationRevision(id: $revisionId) {
          ...IncentiveCalculatorContainer_applicationRevision
        }
      }
    }
  `,
  application: graphql`
    fragment ApplicationDetailsContainer_application on Application
      @argumentDefinitions(version: {type: "String!"}) {
      id
      orderedFormResults(versionNumberInput: $version) {
        edges {
          node {
            id
            ...ApplicationDetailsCardItem_formResult
          }
        }
      }
    }
  `
});
