import React, { useState } from "react";
import { useRouter } from "next/router";
import createApplicationRevisionMutation from "mutations/application/createApplicationRevisionMutation";
import { createFragmentContainer, graphql, RelayProp } from "react-relay";
import { ReviseApplicationButtonContainer_application } from "ReviseApplicationButtonContainer_application.graphql";
import { getApplicationPageRoute } from "routes";
import LoadingOnClickButton from "components/helpers/LoadingOnClickButton";

interface Props {
  application: ReviseApplicationButtonContainer_application;
  relay: RelayProp;
}

export const ReviseApplicationButton: React.FunctionComponent<Props> = ({
  application,
  relay,
}) => {
  const router = useRouter();

  const [latestSubmittedRevision] = useState(
    application.latestSubmittedRevision.versionNumber
  );

  const handleClick = async () => {
    const variables = {
      input: {
        applicationIdInput: application.rowId,
        lastRevisionIdInput: latestSubmittedRevision,
      },
    };

    await createApplicationRevisionMutation(relay.environment, variables);

    await router.push(getApplicationPageRoute(application.id));
  };

  return (
    <LoadingOnClickButton
      variant="primary"
      onClick={handleClick}
      loadingText="Starting revision..."
    >
      Revise Application
    </LoadingOnClickButton>
  );
};

export default createFragmentContainer(ReviseApplicationButton, {
  application: graphql`
    fragment ReviseApplicationButtonContainer_application on Application {
      id
      rowId
      latestSubmittedRevision {
        versionNumber
      }
    }
  `,
});
