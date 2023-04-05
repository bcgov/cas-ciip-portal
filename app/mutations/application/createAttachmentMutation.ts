import { graphql } from "react-relay";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import {
  createAttachmentMutationVariables,
  createAttachmentMutation as createAttachmentMutationType,
} from "createAttachmentMutation.graphql";
import BaseMutation from "mutations/BaseMutation";

const mutation = graphql`
  mutation createAttachmentMutation(
    # $connections: [ID!]!
    $input: CreateAttachmentInput!
  ) {
    createAttachment(input: $input) {
      # attachmentEdge @appendEdge(connections: $connections) {
      # attachmentEdge {
      attachment {
        # cursor
        # node {
        file
        fileName
        fileSize
        fileType
        # createdBy
        applicationId
      }
      # }
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
