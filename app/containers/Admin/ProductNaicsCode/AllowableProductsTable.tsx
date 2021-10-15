import React, { useMemo } from "react";
import { Alert, Table } from "react-bootstrap";
import { createFragmentContainer, graphql, RelayProp } from "react-relay";
import AllowableProductsTableRow from "./AllowableProductsTableRow";
import { AllowableProductsTable_naicsCode } from "__generated__/AllowableProductsTable_naicsCode.graphql";

interface Props {
  relay: RelayProp;
  naicsCode: AllowableProductsTable_naicsCode;
}

export const AllowableProductsTableComponent: React.FunctionComponent<Props> = (
  props
) => {
  const sortedProductNaicsCodes = useMemo(() => {
    return props.naicsCode.productNaicsCodesByNaicsCodeId.edges
      .map((e) => e.node)
      .sort((a, b) =>
        a.productByProductId.productName.localeCompare(
          b.productByProductId.productName
        )
      );
  }, [props.naicsCode.productNaicsCodesByNaicsCodeId.edges]);

  if (!props.naicsCode.productNaicsCodesByNaicsCodeId.edges.length) {
    return (
      <Alert variant="secondary" id="no-search-results">
        No allowed products have been set for this NAICS code.
      </Alert>
    );
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col" className="centered">
              Mandatory
            </th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {sortedProductNaicsCodes.map((productNaicsCode) => (
            <AllowableProductsTableRow
              naicsCodeId={props.naicsCode.id}
              key={productNaicsCode.id}
              productNaicsCode={productNaicsCode}
            />
          ))}
        </tbody>
      </Table>
      <style jsx>{`
        th {
          color: white;
          background: #003366;
        }
        th.centered {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default createFragmentContainer(AllowableProductsTableComponent, {
  naicsCode: graphql`
    fragment AllowableProductsTable_naicsCode on NaicsCode {
      id
      productNaicsCodesByNaicsCodeId(
        first: 2147483647
        filter: { deletedAt: { isNull: true } }
      )
        @connection(
          key: "AllowableProducts_productNaicsCodesByNaicsCodeId"
          filters: []
        ) {
        edges {
          node {
            id
            productByProductId {
              productName
            }
            ...AllowableProductsTableRow_productNaicsCode
          }
        }
      }
    }
  `,
});
