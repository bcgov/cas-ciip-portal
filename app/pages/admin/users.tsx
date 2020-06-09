import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {usersQueryResponse} from 'usersQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import UserTable from 'containers/Admin/UserTable';
import {ADMIN_GROUP} from 'data/group-constants';

const ALLOWED_GROUPS = ADMIN_GROUP;

interface Props {
  query: usersQueryResponse['query'];
}

class Users extends Component<Props> {
  static query = graphql`
    query usersQuery {
      query {
        ...UserTable_query
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout
        session={query.session}
        title="User List"
        allowedGroups={ALLOWED_GROUPS}
      >
        <UserTable query={query} />
      </DefaultLayout>
    );
  }
}

export default Users;
