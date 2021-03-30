import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import DeleteConfirmationModal from 'components/Admin/DeleteConfirmationModal';
import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import {AllowableProductsTableRow_productNaicsCode} from '__generated__/AllowableProductsTableRow_productNaicsCode.graphql';

interface Props {
  productNaicsCode: AllowableProductsTableRow_productNaicsCode;
}

export const AllowableProductsTableRowComponent: React.FunctionComponent<Props> = ({
  productNaicsCode
}) => {
  // const deleteProductNaicsCode = async (productNaicsCodeId: string) => {
  //   const {environment} = props.relay;
  //   const variables = {
  //     input: {
  //       id: productNaicsCodeId,
  //       productNaicsCodePatch: {
  //         deletedAt: nowMoment().format('YYYY-MM-DDTHH:mm:ss')
  //       }
  //     }
  //   };

  //   await updateProductNaicsCodeMutation(
  //     environment,
  //     variables,
  //     'AllowableProductsTable_productNaicsCodesByNaicsCodeId'
  //   );
  // };

  // const onDeleteClick = (productNaicsCodeId: string, productName: string) => {
  //   setDeleteContent({
  //     deleteName: 'Allowable Product',
  //     deleteItem: productName,
  //     deleteItemDescription: ''
  //   });
  //   setDeleteCallback(async () => deleteProductNaicsCode(productNaicsCodeId));
  //   setShowDeleteModal(true);
  // };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteObject = {
    deleteName: 'allowed Product',
    deleteItem: productNaicsCode.productByProductId.productName,
    deleteItemDescription: ''
  };

  return (
    <>
      <DeleteConfirmationModal
        deleteObject={deleteObject}
        handleDelete={async () => {}}
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
            'No'
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
    }
  `
});
