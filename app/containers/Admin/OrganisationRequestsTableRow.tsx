import React from 'react';
import {Button} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import {OrganisationRequestsTableRow_userOrganisation} from '__generated__/OrganisationRequestsTableRow_userOrganisation.graphql';
interface Props {
  userOrganisation: OrganisationRequestsTableRow_userOrganisation;
  key: string;
}
export const OrganisationRequestsTableRowComponent: React.FunctionComponent<
  Props
> = props => {
  console.log(props);
  const {userOrganisation} = props;
  return (
    <tr>
      <td>{userOrganisation.userId}</td>
      <td>{userOrganisation.userByUserId.firstName}</td>
      <td>{userOrganisation.userByUserId.lastName}</td>
      <td>{userOrganisation.organisationByOrganisationId.operatorName}</td>
      <td>{userOrganisation.status}</td>
      <td>
        <Button variant="success">Approve</Button>
      </td>
      <td>
        <Button variant="danger">Reject</Button>
      </td>
    </tr>
  );
};

export default createFragmentContainer(OrganisationRequestsTableRowComponent, {
  userOrganisation: graphql`
    fragment OrganisationRequestsTableRow_userOrganisation on UserOrganisation {
      status
      userId
      userByUserId {
        firstName
        lastName
      }
      organisationByOrganisationId {
        operatorName
      }
    }
  `
});
