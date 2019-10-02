import React, { Component } from 'react';
import { graphql, fetchQuery } from 'react-relay';
import { Container } from 'react-bootstrap';
import UserDetails from '../../components/Industry/UserDetails';

import initEnvironment from '../../lib/createRelayEnvironment';

const environment = initEnvironment();

const getUser = graphql`
  query IndustryUserQuery {
    allUsers {
      nodes {
        rowId
        firstName
        lastName
        emailAddress
        userDetailsByUserId {
          nodes {
            rowId
            userId
            role
            phone
            email
          }
        }
      }
    }
  }
`;

class IndustryUser extends Component {
  state = {
    firstName: null,
    lastName: null,
    emailAddress: null,
    role: null,
    phone: null,
    rowId: null,
    rowIdUserDetails: null,
  };

  getUserData = async () => {
    const userQuery = await fetchQuery(environment, getUser);
    const user = userQuery.allUsers.nodes[0];
    // Console.log(user)

    this.setState(state => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        role: user.userDetailsByUserId.nodes[0].role,
        phone: user.userDetailsByUserId.nodes[0].phone,
        rowId: user.rowId,
        rowIdUserDetails: user.userDetailsByUserId.nodes[0].rowId
      };
    });
  };

  componentDidMount() {
    this.getUserData();
    // Console.log(this.state);
  }

  render() {
    return (
      <div>
        <UserDetails
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          role={this.state.role}
          phone={this.state.phone}
          emailAddress={this.state.emailAddress}
          rowId={this.state.rowId}
          rowIdUserDetails={this.state.rowIdUserDetails}
        />
      </div>
    );
  }
}
export default IndustryUser;
