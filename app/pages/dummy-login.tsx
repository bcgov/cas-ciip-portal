import React, {Component} from 'react';
import Link from 'next/link';
import {Button, Row, Col, Form, Alert} from 'react-bootstrap';
import DefaultLayout from '../layouts/default-layout';

class CompleteSubmit extends Component {
  render() {
    return (
      <DefaultLayout>
        <Row>
          <Col md={{span: 4, offset: 4}}>
            <Alert variant="success">
              <p>
                For the purpose of this test please press{' '}
                <strong>Login </strong>
                to continue. You will be automatically logged-in.
              </p>
            </Alert>
            <h4 style={{margin: '20px 0'}} className="blue">
              Login{' '}
            </h4>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value="DouglasFir"
                  disabled="disabled"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value="xxxxxxxxxxx"
                  disabled="disabled"
                />
              </Form.Group>
              <Link
                href={{
                  pathname: '/user-dashboard',
                  query: {userId: 1, id: 'WyJ1c2VycyIsMV0='}
                }}
              >
                <Button variant="primary">Login</Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}

export default CompleteSubmit;
