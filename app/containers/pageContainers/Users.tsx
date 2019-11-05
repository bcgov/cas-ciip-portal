import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {UsersQueryResponse} from 'UsersQuery.graphql';
import DefaultLayout from '../../layouts/default-layout';
import UserTable from '../Admin/UserTable';

interface Props {
  query: UsersQueryResponse['query'];
}

class Users extends Component<Props> {
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
