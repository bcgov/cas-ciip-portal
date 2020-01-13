import React, {useState} from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {useRouter} from 'next/router';
import {Button} from 'react-bootstrap';
import LegalDisclaimerChecklist from 'components/LegalDisclaimerChecklist';
import updateApplicationRevisionMutation from 'mutations/application/updateApplicationRevisionMutation';
import {LegalDisclaimerChecklistContainer_application} from 'LegalDisclaimerChecklistContainer_application.graphql';

interface Props {
  application: LegalDisclaimerChecklistContainer_application;
  relay: RelayProp;
}

export const LegalDisclaimerChecklistContainer: React.FunctionComponent<Props> = props => {
  const [allChecked, setAllChecked] = useState([]);
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
      pathname: '/reporter/ciip-application',
      query: {
        applicationId: props.application.id,
        version: props.application.latestDraftRevision.versionNumber
      }
    });
  };

  return (
    <>
      <LegalDisclaimerChecklist
        onChange={allChecked => setAllChecked(allChecked)}
      />
      <Button
        variant="primary"
        disabled={!allChecked}
        onClick={handleContinueClick}
      >
        Continue
      </Button>
    </>
  );
};

export default createFragmentContainer(LegalDisclaimerChecklistContainer, {
  application: graphql`
    fragment LegalDisclaimerChecklistContainer_application on Application {
      id
      latestDraftRevision {
        id
        versionNumber
      }
    }
  `
});
