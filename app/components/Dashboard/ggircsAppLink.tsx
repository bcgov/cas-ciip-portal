import getConfig from "next/config";
import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const { GGIRCS_HOST } = getConfig().publicRuntimeConfig || {};

const GgircsAppLink: React.FunctionComponent = () => {
  return (
    <Card className="admin-control-card">
      <Card.Body>
        <Card.Title>GGIRCS</Card.Title>
        <Card.Text>
          Manage fuel, carbon tax and other data in the SWRS database
        </Card.Text>
        <Card.Text>Access SWRS reports and attachments</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Card.Link target="_blank" href={`${GGIRCS_HOST}`}>
            Access the GGIRCS App
          </Card.Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default GgircsAppLink;
