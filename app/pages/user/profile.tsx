import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {profileQueryResponse} from 'profileQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import UserProfileContainer from 'containers/User/UserProfile';
import {INCENTIVE_ANALYST, ADMIN_GROUP, USER} from 'data/group-constants';
import SupportedBrowserNotice from 'components/SupportedBrowserNotice';

const ALLOWED_GROUPS = [INCENTIVE_ANALYST, ...ADMIN_GROUP, USER];
interface Props {
  query: profileQueryResponse['query'];
}
class Profile extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query profileQuery {
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
      <DefaultLayout showSubheader session={session} title="User Profile">
        <SupportedBrowserNotice />
        <UserProfileContainer user={session ? session.ciipUserBySub : null} />
      </DefaultLayout>
    );
  }
}
export default Profile;
