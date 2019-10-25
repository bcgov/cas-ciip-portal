import React, {Component} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import {graphql} from 'react-relay';
import Organisations from '../Organisations/Organisations';
import DefaultLayout from '../../layouts/default-layout';
import {userOrganisationMutation} from '../../mutations/user_organisation/UserOrganisation';

export default class UserDashBoard extends Component {
  static query = graphql`
    query UserDashboardQuery($id: ID!) {
      query {
        ...Organisations_query @arguments(id: $id)
      }
    }
  `;

  state = {
    orgInput: '',
    selectedOrg: null,
    confirmOrg: false
  };

  handleInputChange = event => {
    this.setState({orgInput: event});
  };

  handleContextChange = () => {
    this.state.confirmOrg
      ? this.setState({confirmOrg: false})
      : this.setState({confirmOrg: true});
  };

  handleOrgChange = orgId => {
    this.setState({selectedOrg: orgId});
  };

  handleOrgConfirm = async environment => {
    const response = await userOrganisationMutation(
      environment,
      {
        input: {
          userOrganisation: {
            userId: Number(this.props.router.query.userId),
            organisationId: this.state.selectedOrg,
            status: 'pending'
          }
        }
      },
      this.props.router.query.id
    );
    console.log(response);
  };

  render() {
    return (
      <DefaultLayout>
        <Container>
          <Row>
            <Col>
              <Row>
                <h2>Apply for CIIP 2019</h2>
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </Row>
              <Row>
                <h2>Pre-requisites:</h2>
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </Row>
            </Col>
            <Col md={{span: 1}} />
            <Col>
              <h2>Reporting organisations</h2>
              <Organisations
                query={this.props.query}
                userId={this.props.router.query.id}
                orgInput={this.state.orgInput}
                selectedOrg={this.state.selectedOrg}
                confirmOrg={this.state.confirmOrg}
                handleInputChange={this.handleInputChange}
                handleContextChange={this.handleContextChange}
                handleOrgChange={this.handleOrgChange}
                handleOrgConfirm={this.handleOrgConfirm}
              />
            </Col>
          </Row>
        </Container>
      </DefaultLayout>
    );
  }
}
