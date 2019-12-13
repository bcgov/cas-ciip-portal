import React from 'react';
// Import {useRouter} from 'next/router';
import {Button, Col} from 'react-bootstrap';
// Import updateApplicationMutation from 'mutations/application/updateApplicationMutation';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ReviseApplicationButtonContainer_application} from 'ReviseApplicationButtonContainer_application.graphql';

interface Props {
  application: ReviseApplicationButtonContainer_application;
  relay: RelayProp;
}

export const ReviseApplicationButton: React.FunctionComponent<Props> = props => {
  console.log(props);
  // Const {application, relay} = props;
  // const router = useRouter();
  // Const reviseApplication = async () => {
  //   const previousVersionIndex = application.version;
  //   const variables = {
  //     input: {
  //       id: application.id,
  //       applicationPatch: {
  //         version: Number(previousVersionIndex) + 1
  //       }
  //     }
  //   };

  //   const response = await updateApplicationMutation(
  //     relay.environment,
  //     variables
  //   );
  //   console.log(response);
  //   router.push({
  //     pathname: '/ciip-application',
  //     query: {
  //       applicationId: application.id
  //     }
  //   });
  // };

  return (
    <Col>
      <Button variant="success" onClick={() => console.log('clicked')}>
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
