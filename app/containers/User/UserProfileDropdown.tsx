import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Form, Dropdown} from 'react-bootstrap';
import Link from 'next/link';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {UserProfileDropdown_user} from '__generated__/UserProfileDropdown_user.graphql';
import {ButtonCSS} from 'components/Layout/Header';

interface Props {
  user: UserProfileDropdown_user;
}

// Bootstrap's Dropdown.Item component doesn't naturally tab and submit the Form item.
const submitForm = (e) => {
  if (e.key === 'Enter' || e.which === 13) {
    e.currentTarget.submit();
  }
};

const UserProfileDropdown: React.FunctionComponent<Props> = ({user}) => {
  return (
    <>
      <li className="d-none d-lg-block">
        <Dropdown alignRight style={{paddingLeft: '6px'}}>
          <Dropdown.Toggle variant="primary" aria-label="User menu toggle">
            <div className="user-icon">
              <FontAwesomeIcon
                color="#036"
                icon={faUser}
                style={{
                  fontSize: '30px',
                  verticalAlign: 'middle',
                  paddingBottom: '2px'
                }}
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} href="/user/profile">
              <a className="dropdown-item text-right">
                <div>
                  <span>{user.firstName}</span> <span>{user.lastName}</span>
                </div>
                <div className="small text-muted text-nowrap">
                  {user.emailAddress}
                </div>
              </a>
            </Dropdown.Item>
            <Dropdown.Item
              as={Form}
              action="/logout"
              method="post"
              tabIndex={0}
              onKeyPress={submitForm}
            >
              <button type="submit" className="w-100 text-right">
                Logout
              </button>
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
            <div className="small text-nowrap">{user.emailAddress}</div>
          </a>
        </Link>
      </li>
      <li className="d-lg-none">
        <Form action="/logout" method="post">
          <button type="submit" className="nav-button text-right">
            Logout
          </button>
        </Form>
      </li>
      <style jsx>{ButtonCSS}</style>
      <style jsx>{`
        .user-icon {
          background: #f8f9fa;
          border-radius: 100%;
          display: inline-block;
          height: 45px;
          line-height: 45px;
          width: 48px;
        }
      `}</style>
    </>
  );
};

export {UserProfileDropdown as UserProfileDropdownComponent};
export default createFragmentContainer(UserProfileDropdown, {
  user: graphql`
    fragment UserProfileDropdown_user on CiipUser {
      firstName
      lastName
      emailAddress
    }
  `
});
