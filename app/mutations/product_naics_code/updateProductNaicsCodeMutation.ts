import {graphql} from 'react-relay';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateProductNaicsCodeMutation as updateProductNaicsCodeMutationType,
  updateProductNaicsCodeMutationVariables
} from 'updateProductNaicsCodeMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';
import {ConnectionHandler, RecordSourceSelectorProxy} from 'relay-runtime';
import {AllowableProductsTableRow_productNaicsCode} from '__generated__/AllowableProductsTableRow_productNaicsCode.graphql';

const mutation = graphql`
  mutation updateProductNaicsCodeMutation(
    $input: UpdateProductNaicsCodeInput!
  ) {
    updateProductNaicsCode(input: $input) {
      productNaicsCode {
        id
        ...AllowableProductsTableRow_productNaicsCode
      }
    }
  }
`;

// TODO: May want to surface the onCompleted errors to the user (ie not reject, resolve & report)
const updateProductNaicsCodeMutation = async (
  environment: RelayModernEnvironment,
  variables: updateProductNaicsCodeMutationVariables,
  naicsCodeId: string,
  optimisticProductNaicsCode: AllowableProductsTableRow_productNaicsCode,
  connectionKey: string
) => {
  const optimisticResponse = {
    updateProductNaicsCode: {
      productNaicsCode: {
        id: variables.input.id,
        ...variables.input.productNaicsCodePatch,
        ...optimisticProductNaicsCode
      }
    }
  };

  const updater = (store: RecordSourceSelectorProxy) => {
    const record = store.get(naicsCodeId);
    const connection = ConnectionHandler.getConnection(record, connectionKey);
    ConnectionHandler.deleteNode(connection, variables.input.id);
  };

  const m = new BaseMutation<updateProductNaicsCodeMutationType>(
    'update-product_naics_code-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    optimisticResponse,
    updater
  );
};

export default updateProductNaicsCodeMutation;
