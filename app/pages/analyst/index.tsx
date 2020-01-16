import React, {Component} from 'react';
import {Card, ListGroup, Row} from 'react-bootstrap';
import Link from 'next/link';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {analystQueryResponse} from 'analystQuery.graphql';
import DefaultLayout from 'layouts/default-layout';

interface Props extends CiipPageComponentProps {
  query: analystQueryResponse['query'];
}
class Analyst extends Component<Props> {
  static query = graphql`
    query analystQuery {
      query {
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {
      query: {session}
    } = this.props;
    return (
      <DefaultLayout session={session} title="Analyst Dashboard">
        <div>
          <Row>
            <Card className="admin-control-card">
              <Card.Body>
                <Card.Title>Application Management</Card.Title>
                <Card.Text>
                  View Application details, update applications etc.
                </Card.Text>
              </Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Link href="/analyst/applications">
                    <Card.Link href="#">View all applications</Card.Link>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Card>

            <Card className="admin-control-card">
              <Card.Body>
                <Card.Title>Program and Data management</Card.Title>
                <Card.Text>
                  Update program parameters, view program insights etc.
                </Card.Text>
              </Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Card.Link
                    target="_blank"
                    href="https://cas-metabase.pathfinder.gov.bc.ca/"
                  >
                    Data and Insights (Metabase)
                  </Card.Link>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Row>

          <style global jsx>
            {`
              .buttons {
                padding: 15px;
                margin: 0 0 25px 0;
              }
              .admin-control-card {
                width: 18rem;
                margin: 20px;
              }
            `}
          </style>
        </div>
      </DefaultLayout>
    );
  }
}

export default Analyst;
