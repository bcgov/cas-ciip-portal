import { DeclarativeMutationConfig, graphql } from "react-relay";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";

import BaseMutation from "mutations/BaseMutation";
import {
  createProductNaicsCodeMutation as createProductNaicsCodeMutationType,
  createProductNaicsCodeMutationVariables,
} from "__generated__/createProductNaicsCodeMutation.graphql";

// The default createNaicsCode mutation has been overridden by a custom function in our database in order to upsert on conflict
const mutation = graphql`
  mutation createProductNaicsCodeMutation(
    $input: CreateProductNaicsCodeInput!
  ) {
    createProductNaicsCode(input: $input) {
      productNaicsCodeEdge {
        node {
          id
          productId
          ...AllowableProductsTableRow_productNaicsCode
        }
      }
    }
  }
`;

const createProductNaicsCodeMutation = async (
  environment: RelayModernEnvironment,
  variables: createProductNaicsCodeMutationVariables,
  naicsCodeId: string,
  connectionKey: string
) => {
  const configs: DeclarativeMutationConfig[] = [
    {
      type: "RANGE_ADD",
      parentID: naicsCodeId,
      connectionInfo: [
        {
          key: connectionKey,
          rangeBehavior: "append",
        },
      ],
      edgeName: "productNaicsCodeEdge",
    },
  ];

  const m = new BaseMutation<createProductNaicsCodeMutationType>(
    "create-product_naics_code-mutation",
    configs
  );
  return m.performMutation(environment, mutation, variables);
};

export default createProductNaicsCodeMutation;
