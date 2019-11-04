import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../../layouts/default-layout';
import UserDetailContainer from '../Industry/UserDetailContainer';

class UserProfile extends Component {
  static query = graphql`
    query UserProfileQuery {
      query {
        session {
          ...Header_session
          userBySub {
            ...UserDetailContainer_user
          }
        }
      }
    }
  `;

  render() {
    const {session} = this.props.query;
    if (!session) return 'No session exists, the user should go sign in.';
    if (!session.userBySub) return 'A session exists but not a user!';
    return (
      <>
        <DefaultLayout session={session}>
          <UserDetailContainer user={session.userBySub} />
        </DefaultLayout>
      </>
    );
  }
}
export default UserProfile;
