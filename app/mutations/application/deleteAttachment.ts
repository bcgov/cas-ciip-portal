import { graphql } from "react-relay";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import {
  deleteAttachmentMutationVariables,
  deleteAttachmentMutation as deleteAttachmentMutationType,
} from "deleteAttachmentMutation.graphql";
import BaseMutation from "mutations/BaseMutation";

const mutation = graphql`
  mutation deleteAttachmentMutation($input: DeleteAttachmentInput!) {
    deleteAttachment(input: $input) {
      attachment {
        id
      }
    }
  }
`;

const deleteAttachmentMutation = async (
  environment: RelayModernEnvironment,
  variables: deleteAttachmentMutationVariables
) => {
  const m = new BaseMutation<deleteAttachmentMutationType>(
    "delete-attachment-mutation"
  );
  return m.performMutation(environment, mutation, variables);
};

export default deleteAttachmentMutation;
