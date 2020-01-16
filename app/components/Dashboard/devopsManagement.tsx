import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';

const DevOpsManagement: React.FunctionComponent = () => {
  return (
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
  );
};

export default DevOpsManagement;
