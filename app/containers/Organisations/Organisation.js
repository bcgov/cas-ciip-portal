import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Card, Accordion, Button, Dropdown} from 'react-bootstrap';
import Facility from './Facility';

export const OrganisationComponent = props => {
  const {organisation} = props;
  if (
    !organisation
    // !organisation.facilitiesByOrganisationId ||
    // !organisation.facilitiesByOrganisationId.edges
  ) {
    return null;
  }

  console.log(props);
  return organisation.operatorName
    .toLowerCase()
    .includes(props.orgInput.toLowerCase()) ? (
    <Dropdown.Item
      onSelect={() =>
        props.selectOrg(organisation.operatorName, organisation.rowId)
      }
    >
      {organisation.operatorName}
    </Dropdown.Item>
  ) : null;
};

export default createFragmentContainer(OrganisationComponent, {
  organisation: graphql`
    fragment Organisation_organisation on Organisation {
      id
      rowId
      operatorName
    }
  `
});
