import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import Link from 'next/link';

const UserManagement: React.FunctionComponent = () => {
  return (
    <Card className="admin-control-card">
      <Card.Body>
        <Card.Title>Users</Card.Title>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Link href="/admin/users">
            <Card.Link href="#">View all users</Card.Link>
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default UserManagement;
