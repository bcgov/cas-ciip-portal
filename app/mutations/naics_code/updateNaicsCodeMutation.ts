import { graphql } from "react-relay";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import {
  updateNaicsCodeMutationVariables,
  updateNaicsCodeMutation as updateNaicsCodeMutationType,
} from "updateNaicsCodeMutation.graphql";
import BaseMutation from "mutations/BaseMutation";
import { RecordSourceSelectorProxy, ConnectionHandler } from "relay-runtime";

const mutation = graphql`
  mutation updateNaicsCodeMutation($input: UpdateNaicsCodeInput!) {
    updateNaicsCode(input: $input) {
      naicsCode {
        ...NaicsCodeTableRow_naicsCode
      }
    }
  }
`;

const updateNaicsCodeMutation = async (
  environment: RelayModernEnvironment,
  variables: updateNaicsCodeMutationVariables,
  connectionId: string
) => {
  const optimisticResponse = {
    updateNaicsCode: {
      naicsCode: {
        id: variables.input.id,
        ...variables.input.naicsCodePatch,
      },
    },
  };
  const updater = (store: RecordSourceSelectorProxy) => {
    // connectionID is passed as input to the mutation/subscription
    const connection = store.get(connectionId);
    ConnectionHandler.deleteNode(connection, variables.input.id);
  };
  const m = new BaseMutation<updateNaicsCodeMutationType>(
    "update-naics-code-mutation"
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    optimisticResponse,
    updater
  );
};

export default updateNaicsCodeMutation;
