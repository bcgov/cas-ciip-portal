import React from "react";
import { Button } from "react-bootstrap";
import { graphql, createFragmentContainer, RelayProp } from "react-relay";
import { ManageBceidUserTableRow_user } from "ManageBceidUserTableRow_user.graphql";
import updateUserMutation from "mutations/user/updateUserMutation";
import Link from "next/link";

interface Props {
  relay: RelayProp;
  user: ManageBceidUserTableRow_user;
  key: string;
}
export const ManageBceidUserTableRowComponent: React.FunctionComponent<Props> = (
  props
) => {
  const { user } = props;

  const handleChange = async () => {
    const variables = {
      input: {
        id: user.id,
        ciipUserPatch: {
          allowUuidUpdate: !user.allowUuidUpdate,
        },
      },
    };
    await updateUserMutation(props.relay.environment, variables);
  };

  const url = `/analyst/organisation-requests?filterArgs=${encodeURIComponent(
    `{"user_id":${user.rowId}}`
  )}`;

  return (
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.emailAddress}</td>
      <td>
        <Link href={`${url}`} passHref>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="alert-link"
          >
            Access Requests
          </a>
        </Link>
      </td>
      <td>
        {user.allowUuidUpdate ? (
          <Button
            variant="outline-primary"
            onClick={async () => handleChange()}
          >
            Disable New BCeID Login
          </Button>
        ) : (
          <Button variant="primary" onClick={handleChange}>
            Enable New BCeID Login
          </Button>
        )}
      </td>
    </tr>
  );
};

export default createFragmentContainer(ManageBceidUserTableRowComponent, {
  user: graphql`
    fragment ManageBceidUserTableRow_user on CiipUser {
      id
      rowId
      firstName
      lastName
      emailAddress
      allowUuidUpdate
    }
  `,
});
