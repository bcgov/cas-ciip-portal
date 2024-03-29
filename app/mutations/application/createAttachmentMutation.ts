import { graphql } from "react-relay";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import {
  createAttachmentMutationVariables,
  createAttachmentMutation as createAttachmentMutationType,
} from "createAttachmentMutation.graphql";
import BaseMutation from "mutations/BaseMutation";

const mutation = graphql`
  mutation createAttachmentMutation(
    $connections: [ID!]!
    $input: CreateAttachmentInput!
  ) {
    createAttachment(input: $input) {
      attachmentEdge @appendEdge(connections: $connections) {
        cursor
        node {
          id
          file
          fileName
          fileSize
          fileType
          createdAt
          applicationId
          versionNumber
        }
      }
    }
  }
`;

const createAttachmentMutation = async (
  environment: RelayModernEnvironment,
  variables: createAttachmentMutationVariables
) => {
  const m = new BaseMutation<createAttachmentMutationType>(
    "create-attachment-mutation"
  );
  return m.performMutation(environment, mutation, variables);
};

export default createAttachmentMutation;
export { mutation };
