import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Card, Accordion, Button} from 'react-bootstrap';
import FacilitiesFragment from './FacilitiesFragment';

const OrganisationsFragment = props => {
  // Console.log(props);
  if (
    !props ||
    !props.organisation ||
    !props.organisation.facilitiesByOrganisationId ||
    !props.organisation.facilitiesByOrganisationId.edges
  ) {
    return null;
  }

  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle
          as={Button}
          variant="link"
          eventKey={props.organisation.rowId}
        >
          {props.organisation.operatorName}
        </Accordion.Toggle>
      </Card.Header>
      {props.organisation.facilitiesByOrganisationId.edges.map(({node}) => {
        return <FacilitiesFragment key={node.id} facility={node} />;
      })}
    </Card>
  );
};

export default createFragmentContainer(OrganisationsFragment, {
  organisation: graphql`
    fragment OrganisationsFragment_organisation on Organisation {
      id
      rowId
      reportingYear
      operatorName
      facilitiesByOrganisationId {
        edges {
          node {
            id
            ...FacilitiesFragment_facility
          }
        }
      }
    }
  `
});
