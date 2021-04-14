import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Button} from 'react-bootstrap';
import createApplicationRevisionMutation from 'mutations/application/createApplicationRevisionMutation';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ReviseApplicationButtonContainer_application} from 'ReviseApplicationButtonContainer_application.graphql';
import ApplicationPage from 'pages/reporter/application/[applicationId]';

interface Props {
  application: ReviseApplicationButtonContainer_application;
  relay: RelayProp;
}

export const ReviseApplicationButton: React.FunctionComponent<Props> = ({
  application,
  relay
}) => {
  const router = useRouter();

  const [latestSubmittedRevision] = useState(
    application.latestSubmittedRevision.versionNumber
  );

  const handleClick = async () => {
    const variables = {
      input: {
        applicationIdInput: application.rowId,
        lastRevisionIdInput: latestSubmittedRevision
      }
    };

    await createApplicationRevisionMutation(relay.environment, variables);

    router.push(ApplicationPage.getRoute(application.id));
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Revise Application
    </Button>
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
  `
});
