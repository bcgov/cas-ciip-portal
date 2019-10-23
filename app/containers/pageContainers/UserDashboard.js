import React, {Component} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import {graphql} from 'react-relay';
import Organisations from '../Organisations/Organisations';
import DefaultLayout from '../../layouts/default-layout';

export default class UserDashBoard extends Component {
  static query = graphql`
    query UserDashboardQuery {
      query {
        ...Organisations_query
      }
    }
  `;

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
              <Organisations query={this.props.query} />
            </Col>
          </Row>
        </Container>
      </DefaultLayout>
    );
  }
}
