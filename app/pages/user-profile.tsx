import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {userProfileQueryResponse} from 'userProfileQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import UserProfileContainer from 'containers/User/UserProfile';

interface Props {
  query: userProfileQueryResponse['query'];
}
class UserProfile extends Component<Props> {
  static query = graphql`
    query userProfileQuery {
      query {
        session {
          ...defaultLayout_session
          ciipUserBySub {
            ...UserProfile_user
          }
        }
      }
    }
  `;

  render() {
    const {session} = this.props.query;

    return (
      <DefaultLayout session={session}>
        <UserProfileContainer user={session ? session.ciipUserBySub : null} />
      </DefaultLayout>
    );
  }
}
export default UserProfile;
