import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Badge, Button} from 'react-bootstrap';
import Link from 'next/link';

export const UserOrganisationComponent = props => {
  const {userOrganisation} = props;
  if (!userOrganisation) {
    return null;
  }

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
      <td>
        {' '}
        {userOrganisation.status === 'active' ? (
          <Link
            href={{
              pathname: '/user-organisation-facilities',
              query: {
                organisationId:
                  userOrganisation.organisationByOrganisationId.id,
                organisationName:
                  userOrganisation.organisationByOrganisationId.operatorName
              }
            }}
          >
            <Button variant="primary">View</Button>
          </Link>
        ) : null}
      </td>
    </tr>
  );
};

export default createFragmentContainer(UserOrganisationComponent, {
  userOrganisation: graphql`
    fragment UserOrganisation_userOrganisation on UserOrganisation {
      status
      organisationByOrganisationId {
        id
        operatorName
      }
    }
  `
});
