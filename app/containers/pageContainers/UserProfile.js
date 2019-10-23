import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../../layouts/default-layout';
import IndustryUser from '../Industry/IndustryUser';

class UserProfile extends Component {
  static query = graphql`
    query UserProfileQuery {
      query {
        ...IndustryUser_query
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <>
        <DefaultLayout>
          <IndustryUser query={query} />
        </DefaultLayout>
      </>
    );
  }
}
export default UserProfile;
