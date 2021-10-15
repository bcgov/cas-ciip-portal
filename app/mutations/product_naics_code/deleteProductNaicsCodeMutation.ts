import { graphql } from "react-relay";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import {
  deleteProductNaicsCodeMutation as deleteProductNaicsCodeMutationType,
  deleteProductNaicsCodeMutationVariables,
} from "deleteProductNaicsCodeMutation.graphql";
import BaseMutation from "mutations/BaseMutation";
import { ConnectionHandler, RecordSourceSelectorProxy } from "relay-runtime";
import { AllowableProductsTableRow_productNaicsCode } from "__generated__/AllowableProductsTableRow_productNaicsCode.graphql";
import { nowMoment } from "functions/formatDates";

const mutation = graphql`
  mutation deleteProductNaicsCodeMutation(
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
const deleteProductNaicsCodeMutation = async (
  environment: RelayModernEnvironment,
  naicsCodeId: string,
  productNaicsCode: AllowableProductsTableRow_productNaicsCode,
  connectionKey: string
) => {
  const variables: deleteProductNaicsCodeMutationVariables = {
    input: {
      id: productNaicsCode.id,
      productNaicsCodePatch: {
        deletedAt: nowMoment().format("YYYY-MM-DDTHH:mm:ss"),
      },
    },
  };

  const optimisticResponse = {
    updateProductNaicsCode: {
      productNaicsCode: {
        id: variables.input.id,
        ...variables.input.productNaicsCodePatch,
        ...productNaicsCode,
      },
    },
  };

  const updater = (store: RecordSourceSelectorProxy) => {
    const record = store.get(naicsCodeId);
    const connection = ConnectionHandler.getConnection(record, connectionKey);
    ConnectionHandler.deleteNode(connection, variables.input.id);
  };

  const m = new BaseMutation<deleteProductNaicsCodeMutationType>(
    "delete-product_naics_code-mutation"
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    optimisticResponse,
    updater
  );
};

export default deleteProductNaicsCodeMutation;
