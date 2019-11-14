import React, {Component} from 'react';
import {Button, Row, Col, Card, Form} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {loginRedirectQueryResponse} from 'loginRedirectQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import DefaultLayout from '../layouts/default-layout';

interface Props extends CiipPageComponentProps {
  query: loginRedirectQueryResponse['query'];
}

export default class LoginRedirect extends Component<Props> {
  static query = graphql`
    query loginRedirectQuery {
      query {
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {query} = this.props;
    const {session} = query || {};
    return (
      <DefaultLayout
        showSubheader={false}
        session={session}
        needsSession={false}
        needsUser={false}
      >
        <Row style={{marginTop: '60px'}}>
          <Col md={6}>
            <h3 className="blue">
              You need to be logged in to access this page.
            </h3>
            <p>
              Please log in or register in order to access this page.
              <br />
              You will be redirected to the requested page after doing so.
            </p>
          </Col>
          <Col md={{span: 5, offset: 1}}>
            <Card
              className="ciip-card"
              style={{width: '100%', margin: '30px 0'}}
            >
              <Card.Body>
                <Card.Title className="blue">
                  Apply for CleanBC Industrial Incentive Program (CIIP)
                </Card.Title>
                <Card.Text style={{padding: '10px 0 10px 0'}}>
                  Operators must submit a CIIP application form by June 30,
                  2019. As part of the application, information about the
                  operation’s energy use, emissions, and production is required.
                </Card.Text>
                <Form action="/login" method="post">
                  <Button
                    type="submit"
                    style={{padding: '15px'}}
                    className="full-width"
                    variant="primary"
                    size="lg"
                  >
                    Register and Apply
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <Form action="/login" method="post">
              <button type="submit" className="login-link text-center">
                Already have an account? Click here to login.
              </button>
            </Form>
          </Col>
        </Row>
        <style jsx>{`
          .login-link {
            border: 1px solid #666;
            padding: 20px;
            border-radius: 4px;
            background-color: transparent;
            width: 100%;
            text-decoration: underline;
          }
        `}</style>
      </DefaultLayout>
    );
  }
}
