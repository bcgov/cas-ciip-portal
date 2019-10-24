import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Badge} from 'react-bootstrap';

export const UserOrganisationComponent = props => {
  const {userOrganisation} = props;
  if (!userOrganisation) {
    return null;
  }

  console.log('UO', props);
  const statusBadgeColor = {
    attention: 'warning',
    pending: 'info',
    expired: 'danger',
    active: 'success'
  };

  return (
    <tr>
      <td>{userOrganisation.organisationByOrganisationId.operatorName}</td>
      <td>
        <Badge
          pill
          style={{width: '100%'}}
          variant={statusBadgeColor[userOrganisation.status]}
        >
          {userOrganisation.status}
        </Badge>
      </td>
    </tr>
  );
};

export default createFragmentContainer(UserOrganisationComponent, {
  userOrganisation: graphql`
    fragment UserOrganisation_userOrganisation on UserOrganisation {
      status
      organisationByOrganisationId {
        operatorName
      }
    }
  `
});
