import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import Link from 'next/link';

const ApplicationManagement: React.FunctionComponent = () => {
  return (
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
        <ListGroup.Item>
          <Link href="/analyst/organisation-requests">
            <Card.Link href="#">Organisation access requests</Card.Link>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link href="/analyst/add-organisation">
            <Card.Link href="#">Add new organisation</Card.Link>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link href="/analyst/add-facility">
            <Card.Link href="#">Add new facility</Card.Link>
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ApplicationManagement;
