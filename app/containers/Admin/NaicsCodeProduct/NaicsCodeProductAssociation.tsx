import React, {useState} from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {NaicsCodeList} from 'components/Admin/NaicsCodeProduct/NaicsCodeList';
import {createFragmentContainer, graphql} from 'react-relay';
import {NaicsCodeProductAssociation_query} from '__generated__/NaicsCodeProductAssociation_query.graphql';
import AllowableProductsSearch from './AllowableProductsSearch';

interface Props {
  query: NaicsCodeProductAssociation_query;
}

export const NaicsCodeProductAssociationContainer: React.FunctionComponent<Props> = ({
  query
}) => {
  const [currentNaics, setCurrentNaics] = useState('');

  const naicsCodes = Object.fromEntries(
    query.allNaicsCodes?.edges.map((e) => [
      e.node.naicsCode,
      e.node.naicsDescription
    ])
  );

  return (
    <>
      <Row>
        <Col md="4">
          <Card>
            <Card.Header className="bc-card-header">
              Select an Industry (NAICS) code:
            </Card.Header>
            <NaicsCodeList
              naicsCodes={naicsCodes}
              selectionChanged={(naics) => setCurrentNaics(naics)}
            />
          </Card>
        </Col>
        <Col md="8">
          {currentNaics && (
            <>
              <Row>
                <Col md="12">
                  <h3>
                    {naicsCodes[currentNaics]} - {currentNaics}
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <AllowableProductsSearch
                    naicsCodeId={0}
                    query={query}
                    existingProductIds={[]}
                    addAllowedProduct={(a, b) => {
                      console.log({a, b});
                    }}
                  />
                </Col>
              </Row>
            </>
          )}
          {!currentNaics && (
            <Row>
              <Col>
                Please select a NAICS code on the left to add allowable products
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <style jsx global>{`
        .bc-card-header {
          color: white;
          background: #003366;
        }
      `}</style>
    </>
  );
};

export default createFragmentContainer(NaicsCodeProductAssociationContainer, {
  query: graphql`
    fragment NaicsCodeProductAssociation_query on Query {
      ...AllowableProductsSearch_query
      allNaicsCodes(
        filter: {deletedAt: {isNull: true}}
        orderBy: NAICS_CODE_ASC
      ) {
        edges {
          node {
            rowId
            naicsCode
            naicsDescription
          }
        }
      }
    }
  `
});
