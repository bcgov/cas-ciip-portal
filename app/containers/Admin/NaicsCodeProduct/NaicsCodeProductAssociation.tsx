import React, {useState} from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {NaicsCodeList} from 'components/Admin/NaicsCodeProduct/NaicsCodeList';
import {createFragmentContainer, graphql} from 'react-relay';
import {NaicsCodeProductAssociation_query} from '__generated__/NaicsCodeProductAssociation_query.graphql';

interface Props {
  query: NaicsCodeProductAssociation_query;
}

export const NaicsCodeProductAssociationContainer: React.FunctionComponent<Props> = ({
  query
}) => {
  const [currentNaics, setCurrentNaics] = useState('');
  const naicsCodes = query.allNaicsCodes.edges.map((e) => e.node.naicsCode);

  return (
    <Row>
      <Col md="4">
        <Card>
          <Card.Header>Select an Industry (NAICS) code:</Card.Header>
          <NaicsCodeList
            naicsCodes={naicsCodes}
            selectionChanged={(naics) => setCurrentNaics(naics)}
          />
        </Card>
      </Col>
      <Col md="8">{currentNaics}</Col>
    </Row>
  );
};

export default createFragmentContainer(NaicsCodeProductAssociationContainer, {
  query: graphql`
    fragment NaicsCodeProductAssociation_query on Query {
      allNaicsCodes {
        edges {
          node {
            naicsCode
            naicsDescription
            deletedAt
          }
        }
      }
    }
  `
});
