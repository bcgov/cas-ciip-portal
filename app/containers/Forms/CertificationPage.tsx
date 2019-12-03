import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {CertificationPage_application} from 'CertificationPage_application.graphql';
import ApplicationDetailsCardItem from 'containers/Applications/ApplicationDetailsCardItem';

/*
 * The ApplicationDetails renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */

interface Props {
  application: CertificationPage_application;
  relay: RelayProp;
  isAnalyst: boolean;
}

export const CertificationPageComponent: React.FunctionComponent<Props> = props => {
  const formResults = props.application.formResultsByApplicationId.edges;

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

export default createFragmentContainer(CertificationPageComponent, {
  application: graphql`
    fragment CertificationPage_application on Application {
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
  `
});
