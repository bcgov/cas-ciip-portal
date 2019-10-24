import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../../layouts/default-layout';
import UserDetail from '../Industry/UserDetail';

class UserProfile extends Component {
  static query = graphql`
    query UserProfileQuery {
      query {
        user(id: "WyJ1c2VycyIsMV0=") {
          ...UserDetail_user
        }
      }
    }
  `;

  render() {
    const {user} = this.props.query;
    return (
      <>
        <DefaultLayout>
          <UserDetail user={user} />
        </DefaultLayout>
      </>
    );
  }
}
export default UserProfile;
