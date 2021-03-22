import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import Link from 'next/link';

interface Props {
  viewOnly?: boolean;
}

const ProgramDataManagement: React.FunctionComponent<Props> = ({
  viewOnly = false
}) => {
  let EditableItems = null;

  if (!viewOnly) {
    EditableItems = (
      <>
        <ListGroup.Item>
          <Link href="/admin/products-benchmarks" passHref>
            <Card.Link href="#">Products and Benchmarks</Card.Link>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link href="/admin/reporting-years" passHref>
            <Card.Link href="#">Reporting Periods</Card.Link>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link href="/admin/naics-codes" passHref>
            <Card.Link href="#">Naics Codes</Card.Link>
          </Link>
        </ListGroup.Item>
      </>
    );
  }

  return (
    <Card className="admin-control-card">
      <Card.Body>
        <Card.Title>Program Administration</Card.Title>
        <Card.Text>
          Review applications and administer program details:
        </Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Link href="/analyst/applications" passHref>
            <Card.Link href="#">Submitted applications</Card.Link>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Link
            target="_blank"
            href="https://cas-metabase.pathfinder.gov.bc.ca/"
          >
            Data Insights (Metabase)
          </Card.Link>
        </ListGroup.Item>
        {EditableItems}
      </ListGroup>
    </Card>
  );
};

export default ProgramDataManagement;
