import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Header from '../../components/Header';
import FormCreateUser from '../Forms/FormCreateUser';

class Registration extends Component {
  render() {
    return (
      <>
        <Header />
        <Container className="w-50">
          <Row>
            <Col>
              <h2 className="mb-5">Registration</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormCreateUser />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Registration;
