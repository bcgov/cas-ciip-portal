import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {useRouter} from 'next/router';
import {Button} from 'react-bootstrap';
import updateApplicationRevisionMutation from 'mutations/application/updateApplicationRevisionMutation';
import {ApplicationConsent_application} from 'ApplicationConsent_application.graphql';

interface Props {
  application: ApplicationConsent_application;
  relay: RelayProp;
}

export const ApplicationConsent: React.FunctionComponent<Props> = (props) => {
  const router = useRouter();

  const handleContinueClick = async () => {
    const {environment} = props.relay;

    const variables = {
      input: {
        id: props.application.latestDraftRevision.id,
        applicationRevisionPatch: {
          legalDisclaimerAccepted: true,
          versionNumber: props.application.latestDraftRevision.versionNumber
        }
      }
    };

    await updateApplicationRevisionMutation(environment, variables);

    router.push({
      pathname: '/reporter/application',
      query: {
        applicationId: props.application.id,
        version: props.application.latestDraftRevision.versionNumber
      }
    });
  };

  return (
    <Button variant="primary" size="lg" onClick={handleContinueClick}>
      Consent and continue
    </Button>
  );
};

export default createFragmentContainer(ApplicationConsent, {
  application: graphql`
    fragment ApplicationConsent_application on Application {
      id
      latestDraftRevision {
        id
        versionNumber
      }
    }
  `
});
