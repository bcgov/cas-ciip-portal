import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Dropdown} from 'react-bootstrap';

export const OrganisationComponent = props => {
  const {organisation} = props;
  if (!organisation) {
    return null;
  }

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
