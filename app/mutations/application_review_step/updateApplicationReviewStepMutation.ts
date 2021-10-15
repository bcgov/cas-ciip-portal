import { graphql } from "react-relay";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import {
  updateApplicationReviewStepMutationVariables,
  updateApplicationReviewStepMutation as updateApplicationReviewStepMutationType,
} from "updateApplicationReviewStepMutation.graphql";
import BaseMutation from "mutations/BaseMutation";

const mutation = graphql`
  mutation updateApplicationReviewStepMutation(
    $input: UpdateApplicationReviewStepInput!
  ) {
    updateApplicationReviewStep(input: $input) {
      applicationReviewStep {
        id
        isComplete
      }
    }
  }
`;

const updateApplicationReviewStepMutation = async (
  environment: RelayModernEnvironment,
  variables: updateApplicationReviewStepMutationVariables
) => {
  const optimisticResponse = {
    updateApplicationReviewStep: {
      applicationReviewStep: {
        id: variables.input.id,
        ...variables.input.applicationReviewStepPatch,
      },
    },
  };
  const m = new BaseMutation<updateApplicationReviewStepMutationType>(
    "update-application-review-step-mutation"
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    optimisticResponse
  );
};

export default updateApplicationReviewStepMutation;
export { mutation };
