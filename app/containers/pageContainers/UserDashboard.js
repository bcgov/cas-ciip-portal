import React, {Component} from 'react';
import {Col, Row, Accordion, Card, Button} from 'react-bootstrap';
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
      <DefaultLayout showSubheader title="My Operations">
        <Row>
          <Col md={8}>
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
            <h5 style={{marginBottom: '20px'}}>Frequently Asked Questions</h5>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    What is an Operation?
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum.
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    What happens when I request access to a Reporting Operation?
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <p>
                      At vero eos et accusam et justo duo dolores et ea rebum.{' '}
                    </p>
                    <p>
                      Stet clita kasd gubergren, no sea takimata sanctus est
                      Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    How long does request approval take?
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    {' '}
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}
