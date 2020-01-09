import React, {Component} from 'react';
import {Card, ListGroup, Row} from 'react-bootstrap';
import Link from 'next/link';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {adminQueryResponse} from 'adminQuery.graphql';
import DefaultLayout from 'layouts/default-layout';

interface Props extends CiipPageComponentProps {
  query: adminQueryResponse['query'];
}
class Admin extends Component<Props> {
  static query = graphql`
    query adminQuery {
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
      <DefaultLayout session={session} title="Administrator Dashboard">
        <div>
          <Row>
            <Card className="admin-control-card">
              <Card.Body>
                <Card.Title>User Management</Card.Title>
                <Card.Text>
                  Edit user permissions, grant/revoke access etc.
                </Card.Text>
              </Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Link href="/admin/user-list">
                    <Card.Link href="#">View all users</Card.Link>
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link href="/admin/organisation-requests">
                    <Card.Link href="#">Organisation access requests</Card.Link>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Card>

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
                  <Link href="/admin/products-benchmarks">
                    <Card.Link href="#">Edit Products and Benchmarks</Card.Link>
                  </Link>
                </ListGroup.Item>
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
            <Card className="admin-control-card">
              <Card.Body>
                <Card.Title>DevOps Management</Card.Title>
                <Card.Text>
                  View and Perform DevOps actions, e.g. deploy new features etc.
                </Card.Text>
              </Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Card.Link
                    href="https://cas-shipit.pathfinder.gov.bc.ca/"
                    target="_blank"
                  >
                    Deploy new features (Shipit)
                  </Card.Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Card.Link href="#" target="_blank">
                    Airflow
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

export default Admin;
