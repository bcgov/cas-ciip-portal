import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import OrganisationsFragment from './OrganisationsFragment';
import { Accordian } from 'react-bootstrap';

const Organisations = (props) => {

  if (!props || !props.query || !props.query.allOrganisations || !props.query.allOrganisations.edges) {
    return null;
  }
  return (<div><Accordion>{props.query.allOrganisations.edges.map(({ node }) => { return <OrganisationsFragment key={node.id} organisation={node} /> })}</Accordion></div>);
}
export default createFragmentContainer(Organisations, {
  query: graphql`
    fragment Organisations_query on Query{
    allOrganisations{
        edges{
          node{
            id
            ...OrganisationsFragment_organisation
          }
        }
      }
    }`
});


