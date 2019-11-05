import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {userProfileQueryResponse} from 'userProfileQuery.graphql';
import DefaultLayout from '../layouts/default-layout';
import UserDetailContainer from '../containers/Industry/UserDetailContainer';

interface Props {
  query: userProfileQueryResponse['query'];
}
class UserProfile extends Component<Props> {
  static query = graphql`
    query userProfileQuery {
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
