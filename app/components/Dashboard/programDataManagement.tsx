import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import Link from 'next/link';

interface Props {
  viewOnly?: boolean;
}

const ProgramDataManagement: React.FunctionComponent<Props> = ({
  viewOnly = false
}) => {
  let EditProduct = null;

  if (!viewOnly) {
    EditProduct = (
      <ListGroup.Item>
        <Link href="/admin/products-benchmarks">
          <Card.Link href="#">Edit Products and Benchmarks</Card.Link>
        </Link>
      </ListGroup.Item>
    );
  }

  return (
    <Card className="admin-control-card">
      <Card.Body>
        <Card.Title>Program and Data management</Card.Title>
        <Card.Text>
          Update program parameters, view program insights etc.
        </Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        {EditProduct}
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
  );
};

export default ProgramDataManagement;
