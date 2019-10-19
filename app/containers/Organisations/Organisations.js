import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Accordion} from 'react-bootstrap';
import OrganisationsFragment from './OrganisationsFragment';

const Organisations = props => {
  if (
    !props ||
    !props.query ||
    !props.query.allOrganisations ||
    !props.query.allOrganisations.edges
  ) {
    return null;
  }

  return (
    <Accordion>
      {props.query.allOrganisations.edges.map(({node}) => {
        return <OrganisationsFragment key={node.id} organisation={node} />;
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
            ...OrganisationsFragment_organisation
          }
        }
      }
    }
  `
});
