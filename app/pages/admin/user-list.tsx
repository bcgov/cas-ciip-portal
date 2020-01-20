import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {userListQueryResponse} from 'userListQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import UserTable from 'containers/Admin/UserTable';
import {ADMIN_GROUP} from 'data/group-constants';

const ALLOWED_GROUPS = ADMIN_GROUP;

interface Props {
  query: userListQueryResponse['query'];
}

class UserList extends Component<Props> {
  static query = graphql`
    query userListQuery {
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

export default UserList;
