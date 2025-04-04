import { graphql } from "react-relay";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import {
  updateApplicationRevisionMutationVariables,
  updateApplicationRevisionMutation as updateApplicationRevisionMutationType,
} from "updateApplicationRevisionMutation.graphql";
import BaseMutation from "mutations/BaseMutation";

const mutation = graphql`
  mutation updateApplicationRevisionMutation(
    $input: UpdateApplicationRevisionInput!
  ) {
    updateApplicationRevision(input: $input) {
      applicationRevision {
        id
        applicationId
        versionNumber
        legalDisclaimerAccepted
        overrideJustification
      }
    }
  }
`;

const updateApplicationRevisionMutation = async (
  environment: RelayModernEnvironment,
  variables: updateApplicationRevisionMutationVariables
) => {
  const optimisticResponse = {
    updateApplicationRevision: {
      applicationRevision: {
        id: variables.input.id,
        ...variables.input.applicationRevisionPatch,
      },
    },
  };
  const m = new BaseMutation<updateApplicationRevisionMutationType>(
    "update-application-revision-mutation"
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    optimisticResponse
  );
};

export default updateApplicationRevisionMutation;
