import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../../layouts/default-layout';
import IndustryUser from '../Industry/IndustryUser';

class UserProfile extends Component {
  state = {
    userId: 1
  };

  static query = graphql`
    query UserProfileQuery($condition: UserCondition!) {
      query {
        ...IndustryUser_query @arguments(condition: $condition)
      }
    }
  `;

  static getInitialProps = () => {
    return {
      variables: {
        condition: {rowId: this.state ? this.state.userId : 1}
      }
    };
  };

  render() {
    const {query} = this.props;
    return (
      <>
        <DefaultLayout>
          <IndustryUser query={query} userId={this.state.userId} />
        </DefaultLayout>
      </>
    );
  }
}
export default UserProfile;
