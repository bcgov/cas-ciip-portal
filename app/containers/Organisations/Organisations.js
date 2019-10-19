import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Accordion} from 'react-bootstrap';
import Organisation from './Organisation';

const Organisations = ({query: {allOrganisations}}) => {
  if (
    !allOrganisations ||
    !allOrganisations.edges ||
    allOrganisations.edges.length === 0
  ) {
    return (
      <>You are not registered to report for any organisation at this time.</>
    );
  }

  return (
    <Accordion defaultActiveKey={allOrganisations.edges[0].node.id}>
      {allOrganisations.edges.map(({node}) => {
        return <Organisation key={node.id} organisation={node} />;
      })}
    </Accordion>
  );
};

export default createFragmentContainer(Organisations, {
  query: graphql`
    fragment Organisations_query on Query {
      allOrganisations {
        edges {
          node {
            id
            ...Organisation_organisation
          }
        }
      }
    }
  `
});
