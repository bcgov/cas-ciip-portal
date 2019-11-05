import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../../layouts/default-layout';
import UserTable from '../Admin/UserTable';

class Users extends Component {
  static query = graphql`
    query UsersQuery {
      query {
        ...UserTable_query
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout title="User List">
        <UserTable query={query} />
      </DefaultLayout>
    );
  }
}

export default Users;
