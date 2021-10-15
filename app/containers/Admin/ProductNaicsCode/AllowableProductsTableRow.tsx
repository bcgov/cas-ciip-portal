import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteConfirmationModal from "components/Admin/DeleteConfirmationModal";
import deleteProductNaicsCodeMutation from "mutations/product_naics_code/deleteProductNaicsCodeMutation";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { createFragmentContainer, graphql, RelayProp } from "react-relay";
import { AllowableProductsTableRow_productNaicsCode } from "__generated__/AllowableProductsTableRow_productNaicsCode.graphql";

interface Props {
  relay: RelayProp;
  productNaicsCode: AllowableProductsTableRow_productNaicsCode;
  naicsCodeId: string;
}

export const AllowableProductsTableRowComponent: React.FunctionComponent<Props> = ({
  relay,
  productNaicsCode,
  naicsCodeId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteProductNaicsCode = async () => {
    const { environment } = relay;

    await deleteProductNaicsCodeMutation(
      environment,
      naicsCodeId,
      productNaicsCode,
      "AllowableProducts_productNaicsCodesByNaicsCodeId"
    );
  };

  const deleteModalContent = {
    deleteName: "allowed product",
    deleteItem: productNaicsCode.productByProductId.productName,
    deleteItemDescription: "",
  };

  return (
    <>
      <DeleteConfirmationModal
        deleteObject={deleteModalContent}
        handleDelete={deleteProductNaicsCode}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
      <tr>
        <td>{productNaicsCode.productByProductId.productName}</td>
        <td className="centered">
          {productNaicsCode.isMandatory ? (
            <>
              <FontAwesomeIcon icon={faCheck} />
              <b> Yes</b>
            </>
          ) : (
            "No"
          )}
        </td>
        <td className="centered">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              setShowDeleteModal(true);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
      <style jsx>{`
        td.centered {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default createFragmentContainer(AllowableProductsTableRowComponent, {
  productNaicsCode: graphql`
    fragment AllowableProductsTableRow_productNaicsCode on ProductNaicsCode {
      productByProductId {
        id
        productName
      }
      isMandatory
      deletedAt
      id
    }
  `,
});
