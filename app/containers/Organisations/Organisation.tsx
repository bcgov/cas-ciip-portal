import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Dropdown} from 'react-bootstrap';

export const OrganisationComponent = (props) => {
  const {organisation} = props;
  if (!organisation) {
    return null;
  }

  if (
    !organisation.operatorName
      .toLowerCase()
      .includes(props.orgInput.toLowerCase())
  )
    return null;

  return (
    <Dropdown.Item
      onSelect={() =>
        props.selectOrg(
          organisation.operatorName,
          organisation.rowId,
          organisation.operatorTradeName,
          organisation.craBusinessNumber
        )
      }
    >
      {organisation.operatorName}
    </Dropdown.Item>
  );
};

export default createFragmentContainer(OrganisationComponent, {
  organisation: graphql`
    fragment Organisation_organisation on Organisation {
      rowId
      operatorName
      operatorTradeName
      craBusinessNumber
    }
  `
});
