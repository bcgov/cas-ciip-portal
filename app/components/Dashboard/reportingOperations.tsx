import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import Link from 'next/link';

const ApplicationManagement: React.FunctionComponent = () => {
  return (
    <Card className="admin-control-card">
      <Card.Body>
        <Card.Title>Reporting Operations</Card.Title>
        <Card.Text>Manage, search, and create:</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Link href="/analyst/organisation-requests">
            <Card.Link href="#">Access Requests</Card.Link>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link href="/analyst/add-organisation">
            <Card.Link href="#">Operators</Card.Link>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link href="/analyst/add-facility">
            <Card.Link href="#">Facilities</Card.Link>
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ApplicationManagement;
