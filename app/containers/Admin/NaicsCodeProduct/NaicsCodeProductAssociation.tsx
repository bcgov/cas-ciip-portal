import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {NaicsCodeList} from 'components/Admin/NaicsCodeProduct/NaicsCodeList';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {NaicsCodeProductAssociation_query} from '__generated__/NaicsCodeProductAssociation_query.graphql';
import AllowableProductsSearch from './AllowableProductsSearch';
import {useRouter} from 'next/router';
import AllowableProductsTable from './AllowableProductsTable';

interface Props {
  relay: RelayProp;
  query: NaicsCodeProductAssociation_query;
}

export const NaicsCodeProductAssociationContainer: React.FunctionComponent<Props> = ({
  query
}) => {
  const naicsCodes = query.allNaicsCodes?.edges.map((e) => {
    return {
      code: e.node.naicsCode,
      id: e.node.id,
      rowId: e.node.rowId,
      description: e.node.naicsDescription
    };
  });
  const router = useRouter();
  const currentNaics = naicsCodes.find(
    (code) => code.id === router.query.naicsCodeId
  );

  return (
    <>
      <Row>
        <Col md="4">
          <Card>
            <Card.Header className="bc-card-header">
              Select an Industry (NAICS) code:
            </Card.Header>
            <NaicsCodeList naicsCodes={naicsCodes} />
          </Card>
        </Col>
        <Col md="8">
          {currentNaics && query.naicsCode && (
            <>
              <Row>
                <Col md="12">
                  <h3>
                    {currentNaics.code} - {currentNaics.description}
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <AllowableProductsSearch query={query} />
                </Col>
              </Row>
              <br />
              <Row>
                <Col md="12">
                  <AllowableProductsTable naicsCode={query.naicsCode} />
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
    fragment NaicsCodeProductAssociation_query on Query
    @argumentDefinitions(naicsCodeId: {type: "ID!"}) {
      ...AllowableProductsSearch_query @arguments(naicsCodeId: $naicsCodeId)
      naicsCode(id: $naicsCodeId) {
        ...AllowableProductsTable_naicsCode
      }
      allNaicsCodes(
        filter: {deletedAt: {isNull: true}}
        orderBy: NAICS_CODE_ASC
      ) {
        edges {
          node {
            id
            rowId
            naicsCode
            naicsDescription
          }
        }
      }
    }
  `
});
