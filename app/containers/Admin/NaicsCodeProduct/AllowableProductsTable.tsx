import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import {AllowableProductsTable_query} from '__generated__/AllowableProductsTable_query.graphql';

interface Props {
  query: AllowableProductsTable_query;
}

export const AllowableProductsTableComponent: React.FunctionComponent<Props> = (
  props
) => {
  return (
    <>
      {props.query.productNaicsCodesByNaicsCodeId.edges.map((e) => (
        <p>{e.node.productByProductId.productName}</p>
      ))}
    </>
  );
};

export default createFragmentContainer(AllowableProductsTableComponent, {
  query: graphql`
    fragment AllowableProductsTable_query on NaicsCode {
      rowId
      naicsCode
      productNaicsCodesByNaicsCodeId {
        edges {
          node {
            productByProductId {
              productName
            }
            isMandatory
          }
        }
      }
    }
  `
});
