import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {useRouter} from 'next/router';
import updateApplicationRevisionMutation from 'mutations/application/updateApplicationRevisionMutation';
import {ApplicationConsent_applicationRevision} from 'ApplicationConsent_applicationRevision.graphql';
import {getApplicationPageRoute} from 'routes';
import LoadingOnClickButton from 'components/helpers/LoadingOnClickButton';

interface Props {
  applicationRevision: ApplicationConsent_applicationRevision;
  relay: RelayProp;
}

export const ApplicationConsent: React.FunctionComponent<Props> = ({
  applicationRevision,
  relay
}) => {
  const router = useRouter();

  const handleContinueClick = async () => {
    const {environment} = relay;

    const variables = {
      input: {
        id: applicationRevision.id,
        applicationRevisionPatch: {
          legalDisclaimerAccepted: true
        }
      }
    };

    await updateApplicationRevisionMutation(environment, variables);

    await router.push(
      getApplicationPageRoute(applicationRevision.applicationByApplicationId.id)
    );
  };

  return (
    <LoadingOnClickButton
      variant="primary"
      size="lg"
      onClick={handleContinueClick}
    >
      Consent and continue
    </LoadingOnClickButton>
  );
};

export default createFragmentContainer(ApplicationConsent, {
  applicationRevision: graphql`
    fragment ApplicationConsent_applicationRevision on ApplicationRevision {
      id
      applicationByApplicationId {
        id
      }
    }
  `
});
