import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Badge} from 'react-bootstrap';
import Link from 'next/link';
import {updateUserOrganisationMutation} from '../../mutations/user_organisation/UpdateUserOrganisation';

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

  /** TODO: INTENDED FOR DEMO ONLY. To be removed */
  const setStatusActive = async id => {
    const {environment} = props.relay;
    const variables = {
      input: {
        id,
        userOrganisationPatch: {
          status: 'active'
        }
      }
    };
    const response = await updateUserOrganisationMutation(
      environment,
      variables
    );
    console.log(response);
  };

  if (userOrganisation.status !== 'active') {
    setTimeout(setStatusActive, 4000, userOrganisation.id);
  }
  /** End removal block */

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
        {userOrganisation.status === 'active' ? (
          <Link
            href={{
              pathname: '/user-organisation-facilities',
              query: {
                organisationId: userOrganisation.organisationByOrganisationId.id
              }
            }}
          >
            <a className="btn btn-outline-primary" href="#">
              View Facilities
            </a>
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
    fragment UserOrganisation_userOrganisation on UserOrganisation {
      id
      status
      organisationByOrganisationId {
        id
        operatorName
      }
    }
  `
});
