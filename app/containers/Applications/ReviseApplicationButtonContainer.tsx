import React from 'react';
import {useRouter} from 'next/router';
import {Button, Col} from 'react-bootstrap';
import updateApplicationMutation from 'mutations/application/updateApplicationMutation';
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
    const previousVersionIndex = application.version;
    const variables = {
      input: {
        id: application.id,
        applicationPatch: {
          version: Number(previousVersionIndex) + 1
        }
      }
    };

    const response = await updateApplicationMutation(
      relay.environment,
      variables
    );
    console.log(response);
    router.push({
      pathname: '/ciip-application',
      query: {
        applicationId: application.id
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
      version
    }
  `
});
