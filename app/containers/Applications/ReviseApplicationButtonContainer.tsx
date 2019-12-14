import React from 'react';
import {useRouter} from 'next/router';
import {Button, Col} from 'react-bootstrap';
import createApplicationRevisionMutation from 'mutations/application/createApplicationRevisionMutation';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ReviseApplicationButtonContainer_application} from 'ReviseApplicationButtonContainer_application.graphql';

interface Props {
  application: ReviseApplicationButtonContainer_application;
  relay: RelayProp;
}

export const ReviseApplicationButton: React.FunctionComponent<Props> = props => {
  const {application, relay} = props;
  const router = useRouter();
  const reviseApplication = async () => {
    const variables = {
      input: {
        applicationIdInput: application.id,
        last_revision_id_input: application.latestSubmittedVersionNumber
      }
    };

    const response = await createApplicationRevisionMutation(
      relay.environment,
      variables
    );
    console.log(response);

    const newVersion =
      response.applicationRevision.applicationByApplicationId
        .latestDraftVersionNumber;
    const lastSubmittedVersion =
      response.applicationRevision.applicationByApplicationId
        .latestSubmittedVersionNumber;

    router.push({
      pathname: '/ciip-application',
      query: {
        applicationId: application.id,
        version: newVersion,
        previousVersion: lastSubmittedVersion
      }
    });
  };

  return (
    <Col>
      <Button variant="success" onClick={reviseApplication}>
        Revise Application
      </Button>
    </Col>
  );
};

export default createFragmentContainer(ReviseApplicationButton, {
  application: graphql`
    fragment ReviseApplicationButtonContainer_application on Application {
      id
      latestSubmittedVersionNumber
    }
  `
});
