import { graphql, DeclarativeMutationConfig } from "react-relay";
import {
  createLinkedProductMutation as createLinkedProductMutationType,
  createLinkedProductMutationVariables,
} from "createLinkedProductMutation.graphql";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import BaseMutation from "mutations/BaseMutation";

const mutation = graphql`
  mutation createLinkedProductMutation($input: CreateLinkedProductInput!) {
    createLinkedProduct(input: $input) {
      linkedProductEdge {
        node {
          id
          rowId
          linkedProductId
          productByLinkedProductId {
            productName
          }
        }
      }
    }
  }
`;

const createLinkedProductMutation = async (
  environment: RelayModernEnvironment,
  variables: createLinkedProductMutationVariables,
  parentProductId: string
) => {
  const connectionKey = "LinkedProducts_linkedProductsByProductId";
  const configs: DeclarativeMutationConfig[] = [
    {
      type: "RANGE_ADD",
      parentID: parentProductId,
      connectionInfo: [
        {
          key: connectionKey,
          rangeBehavior: "append",
        },
      ],
      edgeName: "linkedProductEdge",
    },
  ];

  return new BaseMutation<createLinkedProductMutationType>(
    "create-linked-product-mutation",
    configs
  ).performMutation(environment, mutation, variables);
};

export default createLinkedProductMutation;
