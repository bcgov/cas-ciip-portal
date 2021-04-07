import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {NaicsCodeSelectionComponent} from 'components/Admin/NaicsCodeSelectionComponent';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import AllowableProductsSearch from './AllowableProductsSearch';
import {useRouter} from 'next/router';
import AllowableProductsTable from './AllowableProductsTable';
import {ProductNaicsCodeAssociation_query} from '__generated__/ProductNaicsCodeAssociation_query.graphql';
import Link from 'next/link';

interface Props {
  relay: RelayProp;
  query: ProductNaicsCodeAssociation_query;
}

export const ProductNaicsCodeAssociationContainer: React.FunctionComponent<Props> = ({
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
      <Row className="mb-5">
        <Col className="col-md-auto">
          <Link href="/admin/naics-codes" passHref>
            <a href="#" className="alert-link">
              Manage Industry (NAICS) Codes
            </a>
          </Link>
        </Col>
        <Col>
          <Link href="/admin/products-benchmarks" passHref>
            <a href="#" className="alert-link">
              Manage Products
            </a>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <Card>
            <Card.Header className="bc-card-header">
              Select an Industry (NAICS) code:
            </Card.Header>
            <NaicsCodeSelectionComponent naicsCodes={naicsCodes} />
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
      <style jsx>{`
        .bc-card-header {
          color: white;
          background: #003366;
        }
      `}</style>
    </>
  );
};

export default createFragmentContainer(ProductNaicsCodeAssociationContainer, {
  query: graphql`
    fragment ProductNaicsCodeAssociation_query on Query
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
