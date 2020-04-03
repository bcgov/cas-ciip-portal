import React, {useState} from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {useRouter} from 'next/router';
import {Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import LegalDisclaimerChecklist from 'components/LegalDisclaimerChecklist';
import updateApplicationRevisionMutation from 'mutations/application/updateApplicationRevisionMutation';
import {LegalDisclaimerChecklistContainer_application} from 'LegalDisclaimerChecklistContainer_application.graphql';

interface Props {
  application: LegalDisclaimerChecklistContainer_application;
  relay: RelayProp;
}

export const LegalDisclaimerChecklistContainer: React.FunctionComponent<Props> = props => {
  const [allChecked, setAllChecked] = useState(false);
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
      <ListGroup className="list-group-flush">
        <LegalDisclaimerChecklist
          onChange={allChecked => setAllChecked(allChecked)}
        />
        <ListGroupItem>
          <Button
            variant="primary"
            size="lg"
            disabled={!allChecked}
            onClick={handleContinueClick}
          >
            {allChecked ? 'Continue' : 'Please check all to continue'}
          </Button>
        </ListGroupItem>
      </ListGroup>
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
