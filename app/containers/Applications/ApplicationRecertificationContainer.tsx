import React from 'react';
import {Card} from 'react-bootstrap';
import updateCertificationUrlMutation from 'mutations/form/updateCertificationUrlMutation';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ApplicationRecertificationContainer_certificationUrl} from 'ApplicationRecertificationContainer_certificationUrl.graphql';

interface Props {
  certificationUrl: ApplicationRecertificationContainer_certificationUrl;
  relay: RelayProp;
}

export const ApplicationRecertification: React.FunctionComponent<Props> = ({
  certificationUrl,
  relay
}) => {
  const sendRecertificationRequest = async () => {
    const {environment} = relay;
    const variables = {
      input: {
        id: certificationUrl.id,
        certificationUrlPatch: {
          recertificationRequestSent: true
        }
      }
    };
    const response = await updateCertificationUrlMutation(
      environment,
      variables
    );
    console.log(response);
  };

  if (
    !certificationUrl.hashMatches &&
    !certificationUrl.recertificationRequestSent
  )
    sendRecertificationRequest();

  return (
    <Card className="text-center">
      <Card.Header>Error</Card.Header>
      <Card.Body>
        <Card.Title>The data has changed</Card.Title>
        <Card.Text>
          The application data associated with this certification URL has been
          modified after the URL was generated.
        </Card.Text>
        <Card.Text>
          A notification has been automatically sent to the reporter requesting
          the submission of a new URL with the updated application data.
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        No action is required on your part
      </Card.Footer>
    </Card>
  );
};

export default createFragmentContainer(ApplicationRecertification, {
  certificationUrl: graphql`
    fragment ApplicationRecertificationContainer_certificationUrl on CertificationUrl {
      id
      hashMatches
      recertificationRequestSent
    }
  `
});
