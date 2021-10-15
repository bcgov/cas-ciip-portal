import React from "react";
import { Alert } from "react-bootstrap";

const getMissingProducts = (formResult, query) => {
  if (formResult[0]?.productRowId) {
    const reportedProducts = formResult.map((r) => r.productRowId);
    const missingProducts = [];

    reportedProducts.forEach((productId) => {
      const product = query.products.edges.find(
        ({ node }) => node.rowId === productId
      )?.node;
      if (product?.linkedProduct?.edges?.length > 0) {
        product.linkedProduct.edges.forEach((edge) => {
          if (!reportedProducts.includes(edge.node.linkedProductId)) {
            missingProducts.push({
              linkId: edge.node.rowId,
              product: product.productName,
              missingLink: edge.node.productName,
            });
          }
        });
      }
    });
    return missingProducts;
  }
};

const showMissingProducts = (formResult, query) => {
  const missingProducts = getMissingProducts(formResult, query);
  if (!missingProducts) return null;
  const renderMissingProducts = missingProducts.map((missingObj) => (
    <Alert key={missingObj.linkId} variant="warning">
      {missingObj.product} requires reporting of: {missingObj.missingLink}
    </Alert>
  ));
  if (missingProducts.length === 0) return null;
  return (
    <>
      <Alert variant="warning">
        <h5>Some required products are missing from your application:</h5>
      </Alert>
      {renderMissingProducts}
    </>
  );
};

interface Props {
  formResult: any;
  query: any;
}

const MissingProductsComponent: React.FunctionComponent<Props> = ({
  formResult,
  query,
}) => {
  return showMissingProducts(formResult, query);
};

export default MissingProductsComponent;
