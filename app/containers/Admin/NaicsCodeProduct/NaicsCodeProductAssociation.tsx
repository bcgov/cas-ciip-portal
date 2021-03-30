import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {NaicsCodeList} from 'components/Admin/NaicsCodeProduct/NaicsCodeList';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {NaicsCodeProductAssociation_query} from '__generated__/NaicsCodeProductAssociation_query.graphql';
import AllowableProductsSearch from './AllowableProductsSearch';
import {useRouter} from 'next/router';
import AllowableProductsTable from './AllowableProductsTable';
import {createProductNaicsCodeMutationVariables} from '__generated__/createProductNaicsCodeMutation.graphql';
import createProductNaicsCodeMutation from 'mutations/product_naics_code/createProductNaicsCodeMutation';

interface Props {
  relay: RelayProp;
  query: NaicsCodeProductAssociation_query;
}

export const NaicsCodeProductAssociationContainer: React.FunctionComponent<Props> = ({
  relay,
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

  const addAllowableProduct = async (productId: number, mandatory: boolean) => {
    const {environment} = relay;
    const variables: createProductNaicsCodeMutationVariables = {
      input: {
        isMandatoryInput: mandatory,
        naicsCodeIdInput: currentNaics.rowId,
        productIdInput: productId
      }
    };

    try {
      await createProductNaicsCodeMutation(
        environment,
        variables,
        currentNaics.id
      );
    } catch (e) {
      console.error(e);
    }
  };

  console.log(query);

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
          {currentNaics && (
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
                  <AllowableProductsSearch
                    naicsCodeRowId={currentNaics.rowId}
                    query={query}
                    existingProductIds={[]}
                    addAllowableProduct={addAllowableProduct}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col md="12">
                  <AllowableProductsTable query={query.naicsCode} />
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
      ...AllowableProductsSearch_query
      naicsCode(id: $naicsCodeId) {
        ...AllowableProductsTable_query
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
