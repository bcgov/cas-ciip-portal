import {graphql} from 'react-relay';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  deleteLinkedProductMutation as deleteLinkedProductMutationType,
  deleteLinkedProductMutationVariables
} from 'deleteLinkedProductMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

import {RecordSourceSelectorProxy, ConnectionHandler} from 'relay-runtime';

const mutation = graphql`
  mutation deleteLinkedProductMutation($input: UpdateLinkedProductInput!) {
    updateLinkedProduct(input: $input) {
      linkedProduct {
        id
      }
    }
  }
`;

const deleteLinkedProductMutation = async (
  environment: RelayModernEnvironment,
  variables: deleteLinkedProductMutationVariables,
  connectionId: string
) => {
  const optimisticResponse = {
    updateLinkedProduct: {
      linkedProduct: {
        id: variables.input.id,
        ...variables.input.linkedProductPatch
      }
    }
  };
  const updater = (store: RecordSourceSelectorProxy) => {
    // connectionID is passed as input to the mutation/subscription
    const connection = store.get(connectionId);
    ConnectionHandler.deleteNode(connection, variables.input.id);
  };
  const m = new BaseMutation<deleteLinkedProductMutationType>(
    'delete-linked-product-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    optimisticResponse,
    updater
  );
};

export default deleteLinkedProductMutation;
