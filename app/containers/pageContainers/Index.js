import React, {Component} from 'react';
import {Button, Container, Row, Col, Card, Jumbotron} from 'react-bootstrap';
import Link from 'next/link';
import DefaultLayout from '../../layouts/default-layout';

const heading = {
  color: '#003366',
  fontSize: 'Bold 25px',
  fontWeight: 'bold',
  textAlign: 'center'
};

const Cards = {
  marginTop: '50px',
  marginBottom: '25px',
  borderRadius: '15px',
  textAlign: 'center'
};

const CardBody1 = {
  backgroundColor: '#003366',
  padding: '50px',
  borderRadius: '15px'
};
const CardTitle1 = {
  color: 'white',
  fontSize: '25px',
  marginBottom: '15px',
  fontWeight: 'bold'
};
const CardTitle2 = {
  fontSize: '25px',
  color: '#003366',
  marginBottom: '15px',
  fontWeight: 'bold'
};
export default class Index extends Component {
  render() {
    return (
      <DefaultLayout>
        <Jumbotron>
          <h1 style={heading}>Welcome to the CIIP Portal</h1>
        </Jumbotron>
        <Container>
          <Row>
            <Col md>
              <Card style={Cards}>
                <Card.Body style={CardBody1}>
                  <Card.Title style={CardTitle1}>Login</Card.Title>
                  <Card.Text style={{color: 'white'}}>
                    If you have already registered, click below to log in.
                  </Card.Text>
                  <Link
                    href={{
                      pathname: '/user-dashboard',
                      query: {userId: 1, id: 'WyJ1c2VycyIsMV0='}
                    }}
                  >
                    <Button
                      style={{backgroundColor: '#EDA500', color: '#003366'}}
                      size="lg"
                    >
                      Login
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={Cards}>
                <Card.Body style={{padding: '50px'}}>
                  <Card.Title style={CardTitle2}>Register for CIIP</Card.Title>
                  <Card.Text style={{color: '#003366'}}>
                    Click here to create your industrial reporter account.
                  </Card.Text>
                  <Link href="/registration">
                    <Button
                      style={{backgroundColor: '#003366'}}
                      size="lg"
                      onClick={this.showModal}
                    >
                      Register for CIIP
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </DefaultLayout>
    );
  }
}
