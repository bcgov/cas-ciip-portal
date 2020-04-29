import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Badge} from 'react-bootstrap';
import Link from 'next/link';

export const UserOrganisationComponent = (props) => {
  const {userOrganisation} = props;
  if (!userOrganisation) {
    return null;
  }

  const statusBadgeColor = {
    REJECTED: 'danger',
    PENDING: 'info',
    APPROVED: 'success'
  };

  return (
    <tr>
      <td>{userOrganisation.organisationByOrganisationId.operatorName}</td>
      <td>
        <Badge
          pill
          style={{width: '100%', padding: '8px'}}
          variant={statusBadgeColor[userOrganisation.status]}
        >
          {userOrganisation.status}
        </Badge>
      </td>
      <td>
        {' '}
        {userOrganisation.status === 'APPROVED' ? (
          <Link
            href={{
              pathname: '/reporter/facilities-list',
              query: {
                organisationId:
                  userOrganisation.organisationByOrganisationId.id,
                organisationRowId:
                  userOrganisation.organisationByOrganisationId.rowId
              }
            }}
          >
            <a className="btn btn-outline-primary">View Facilities</a>
          </Link>
        ) : null}
      </td>
      <style jsx>
        {`
          td {
            padding: 20px;
          }
        `}
      </style>
    </tr>
  );
};

export default createFragmentContainer(UserOrganisationComponent, {
  userOrganisation: graphql`
    fragment UserOrganisation_userOrganisation on CiipUserOrganisation {
      id
      status
      organisationByOrganisationId {
        id
        rowId
        operatorName
      }
    }
  `
});
