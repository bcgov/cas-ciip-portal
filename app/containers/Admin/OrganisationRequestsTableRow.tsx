import React from 'react';
import {Button, ButtonGroup, Badge} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {OrganisationRequestsTableRow_userOrganisation} from 'OrganisationRequestsTableRow_userOrganisation.graphql';
import {updateUserOrganisationMutation} from '../../mutations/user_organisation/updateUserOrganisation';
interface Props {
  relay: RelayProp;
  userOrganisation: OrganisationRequestsTableRow_userOrganisation;
  key: string;
}
export const OrganisationRequestsTableRowComponent: React.FunctionComponent<Props> = props => {
  const {userOrganisation} = props;

  const statusBadgeColor = {
    REJECTED: 'danger',
    PENDING: 'info',
    APPROVED: 'success'
  };

  const handleStatusChange = async status => {
    const variables = {
      input: {
        id: userOrganisation.id,
        ciipUserOrganisationPatch: {
          status
        }
      }
    };

    const response = await updateUserOrganisationMutation(
      props.relay.environment,
      variables
    );
    console.log(response);
  };

  return (
    <tr>
      <td>{userOrganisation.userId}</td>
      <td>{userOrganisation.ciipUserByUserId.firstName}</td>
      <td>{userOrganisation.ciipUserByUserId.lastName}</td>
      <td>{userOrganisation.ciipUserByUserId.emailAddress}</td>
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
        <ButtonGroup aria-label="Status change">
          {userOrganisation.status === 'PENDING' ? (
            <Button
              variant="success"
              onClick={async () => handleStatusChange('APPROVED')}
            >
              Approve
            </Button>
          ) : null}
          {userOrganisation.status === 'PENDING' ||
          userOrganisation.status === 'APPROVED' ? (
            <Button
              variant="danger"
              onClick={async () => handleStatusChange('REJECTED')}
            >
              Reject
            </Button>
          ) : null}
          {userOrganisation.status === 'REJECTED' ? (
            <Button
              variant="info"
              onClick={async () => handleStatusChange('PENDING')}
            >
              Reset
            </Button>
          ) : null}
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default createFragmentContainer(OrganisationRequestsTableRowComponent, {
  userOrganisation: graphql`
    fragment OrganisationRequestsTableRow_userOrganisation on CiipUserOrganisation {
      id
      status
      userId
      ciipUserByUserId {
        firstName
        lastName
        emailAddress
      }
      organisationByOrganisationId {
        operatorName
      }
    }
  `
});
