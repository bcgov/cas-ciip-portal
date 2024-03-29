import React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { UserProfileDropdown_user } from "__generated__/UserProfileDropdown_user.graphql";
import { ButtonCSS } from "components/Layout/Header";

interface Props {
  user: UserProfileDropdown_user;
}

const UserProfileDropdown: React.FunctionComponent<Props> = ({ user }) => {
  return (
    <>
      <li className="d-none d-lg-block">
        <Dropdown alignRight style={{ paddingLeft: "6px" }}>
          <Dropdown.Toggle
            id="user-icon"
            as="button"
            variant="primary"
            aria-label="User menu toggle"
            style={{
              borderRadius: "50%",
              width: 40,
              height: 40,
              border: "none",
              background: "#fff",
              position: "relative",
            }}
          >
            <FontAwesomeIcon
              color="#036"
              icon={faUser}
              style={{
                fontSize: "30px",
                verticalAlign: "middle",
                height: "0.8em",
                paddingBottom: "2px",
              }}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} href="/user/profile">
              <a className="dropdown-item text-right">
                <div>
                  <span>{user.firstName}</span> <span>{user.lastName}</span>
                </div>
                <div className="small text-muted">{user.emailAddress}</div>
              </a>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li className="d-lg-none">
        <Link href="/user/profile">
          <a className="nav-button text-right">
            <div>
              <span>{user.firstName}</span> <span>{user.lastName}</span>
            </div>
            <div className="small">{user.emailAddress}</div>
          </a>
        </Link>
      </li>
      <style jsx>{ButtonCSS}</style>
      <style jsx global>{`
        #user-icon.dropdown-toggle::after {
          position: absolute;
          right: -14px;
          top: 46%;
          color: #fff;
        }
      `}</style>
    </>
  );
};

export { UserProfileDropdown as UserProfileDropdownComponent };
export default createFragmentContainer(UserProfileDropdown, {
  user: graphql`
    fragment UserProfileDropdown_user on CiipUser {
      firstName
      lastName
      emailAddress
    }
  `,
});
