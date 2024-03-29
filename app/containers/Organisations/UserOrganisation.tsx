import React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { Badge } from "react-bootstrap";
import Link from "next/link";
import statusBadgeColor from "components/helpers/StatusBadgeColor";

export const UserOrganisationComponent = (props) => {
  const { userOrganisation } = props;
  if (!userOrganisation) {
    return null;
  }

  return (
    <tr>
      <td>{userOrganisation.organisationByOrganisationId.operatorName}</td>
      <td>
        <Badge
          pill
          style={{ width: "100%", padding: "8px" }}
          variant={statusBadgeColor[userOrganisation.status]}
        >
          {userOrganisation.status}
        </Badge>
      </td>
      <td>
        {" "}
        {userOrganisation.status === "APPROVED" ? (
          <Link
            href={{
              pathname: "/reporter/facilities",
              query: {
                filterArgs: JSON.stringify({
                  organisationRowId:
                    userOrganisation.organisationByOrganisationId.rowId,
                }),
              },
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
      status
      organisationByOrganisationId {
        rowId
        operatorName
      }
    }
  `,
});
