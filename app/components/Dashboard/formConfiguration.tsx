import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import Link from 'next/link';

const FormConfiguration: React.FunctionComponent = () => {
  return (
    <Card className="admin-control-card">
      <Card.Body>
        <Card.Title>Form Configuration</Card.Title>
        <Card.Text>Define and manage:</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Link href="/admin/naics-codes" passHref>
            <Card.Link href="#">NAICS Codes</Card.Link>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link href="/admin/naics-products" passHref>
            <Card.Link href="#">Allowed &amp; Mandatory Products</Card.Link>
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default FormConfiguration;
