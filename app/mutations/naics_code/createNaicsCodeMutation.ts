import { graphql, DeclarativeMutationConfig } from "react-relay";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import {
  createNaicsCodeMutationVariables,
  createNaicsCodeMutation as createNaicsCodeMutationType,
} from "createNaicsCodeMutation.graphql";
import BaseMutation from "mutations/BaseMutation";

// The default createNaicsCode mutation has been overridden by a custom function in our database in order to upsert on conflict
const mutation = graphql`
  mutation createNaicsCodeMutation($input: CreateNaicsCodeInput!) {
    createNaicsCode(input: $input) {
      naicsCodeEdge {
        node {
          id
          naicsCode
          ciipSector
          naicsDescription
          createdAt
          createdBy
          updatedAt
          updatedBy
          deletedAt
          deletedBy
        }
      }
    }
  }
`;

const createNaicsCodeMutation = async (
  environment: RelayModernEnvironment,
  variables: createNaicsCodeMutationVariables
) => {
  const connectionKey = "NaicsCodeTableContainer_allNaicsCodes";
  const configs: DeclarativeMutationConfig[] = [
    {
      type: "RANGE_ADD",
      parentID: "query",
      connectionInfo: [
        {
          key: connectionKey,
          rangeBehavior: "prepend",
        },
      ],
      edgeName: "naicsCodeEdge",
    },
  ];

  const m = new BaseMutation<createNaicsCodeMutationType>(
    "create-naics_code-mutation",
    configs
  );
  return m.performMutation(environment, mutation, variables);
};

export default createNaicsCodeMutation;
