import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import Link from 'next/link';

const UserManagement: React.FunctionComponent = () => {
  return (
    <Card className="admin-control-card">
      <Card.Body>
        <Card.Title>User Management</Card.Title>
        <Card.Text>Edit user permissions, grant/revoke access etc.</Card.Text>
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
  );
};

export default UserManagement;
