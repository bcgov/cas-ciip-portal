import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import DeleteConfirmationModal from 'components/Admin/DeleteConfirmationModal';
import {nowMoment} from 'functions/formatDates';
import updateProductNaicsCodeMutation from 'mutations/product_naics_code/updateProductNaicsCodeMutation';
import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {AllowableProductsTableRow_productNaicsCode} from '__generated__/AllowableProductsTableRow_productNaicsCode.graphql';

interface Props {
  relay: RelayProp;
  productNaicsCode: AllowableProductsTableRow_productNaicsCode;
}

export const AllowableProductsTableRowComponent: React.FunctionComponent<Props> = ({
  relay,
  productNaicsCode
}) => {
  const deleteProductNaicsCode = async () => {
    const {environment} = relay;
    const variables = {
      input: {
        id: productNaicsCode.id,
        productNaicsCodePatch: {
          deletedAt: nowMoment().format('YYYY-MM-DDTHH:mm:ss')
        }
      }
    };

    await updateProductNaicsCodeMutation(
      environment,
      variables,
      'AllowableProductsTable_productNaicsCodesByNaicsCodeId'
    );
  };

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
      id
    }
  `
});
