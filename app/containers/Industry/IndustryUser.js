import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import UserDetail from './UserDetail';

const IndustryUser = props => {
  const {query} = props;
  console.log(props);
  if (!query || !query.allUsers) {
    return null;
  }

  const {firstName} = query.allUsers.edges[0].node;
  const {lastName} = query.allUsers.edges[0].node;
  const {emailAddress} = query.allUsers.edges[0].node;
  const {occupation} = query.allUsers.edges[0].node;
  const {phoneNumber} = query.allUsers.edges[0].node;
  console.log(firstName, lastName);
  return (
    <>
      <UserDetail
        firstName={firstName}
        lastName={lastName}
        email={emailAddress}
        role={occupation}
        phone={phoneNumber}
      />
    </>
  );
};

export default createFragmentContainer(IndustryUser, {
  query: graphql`
    fragment IndustryUser_query on Query {
      allUsers {
        edges {
          node {
            rowId
            firstName
            lastName
            emailAddress
            occupation
            phoneNumber
          }
        }
      }
    }
  `
});
