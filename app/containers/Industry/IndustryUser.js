import React from 'react';
import {graphql, createRefetchContainer} from 'react-relay';
import UserDetail from './UserDetail';

const IndustryUser = props => {
  const {query} = props;
  console.log(props);
  if (!query || !query.allUsers || !query.allUsers.edges) {
    return null;
  }

  // Const refetchVariables = {
  //   condition: {rowId: Number(props.userId)}
  // };
  // props.relay.refetch(refetchVariables);
  return (
    <>
      <UserDetail user={query.allUsers.edges[0].node} />
    </>
  );
};

export default createRefetchContainer(IndustryUser, {
  query: graphql`
    fragment IndustryUser_query on Query
      @argumentDefinitions(condition: {type: "UserCondition"}) {
      allUsers(condition: $condition) {
        edges {
          node {
            ...UserDetail_user
          }
        }
      }
    }
  `
});
