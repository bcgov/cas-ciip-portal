import React, {Component} from 'react';
import {Col, Row, ListGroup} from 'react-bootstrap';
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
      <DefaultLayout showSubheader title="My Operators">
        <Row>
          <Col md={{span: 8}}>
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
          <Col md={4}>
            <h5 style={{marginBottom: '20px'}}>How to apply for CIIP</h5>
            <div className="how-to-apply">
              <ListGroup>
                <ListGroup.Item>
                  <strong>Step 1:</strong>
                  <br />
                  Request access to one or more Operators.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Step 2:</strong>
                  <br />
                  CIIP administrators will approve your request.{' '}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Step 3:</strong>
                  <br />
                  Once approved, you can view all the facilities for the
                  Operator.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Step 4:</strong>
                  <br />
                  You can apply for CIIP for each facility.
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}
