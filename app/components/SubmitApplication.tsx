import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {useRouter} from 'next/router';
import {Button} from 'react-bootstrap';
import {CiipApplicationRevisionStatus} from 'createApplicationRevisionStatusMutation.graphql';
import createApplicationRevisionStatusMutation from 'mutations/application/createApplicationRevisionStatusMutation';
import {SubmitApplication_applicationRevision} from 'SubmitApplication_applicationRevision.graphql';
import {getCompleteApplicationPageRoute} from 'routes';

interface Props {
  applicationRevision: SubmitApplication_applicationRevision;
  relay: RelayProp;
}

export const SubmitApplicationComponent: React.FunctionComponent<Props> = ({
  applicationRevision,
  relay
}) => {
  const router = useRouter();
  // Change application status to 'submitted' on application submit
  const submitApplication = async () => {
    const {environment} = relay;
    const variables = {
      input: {
        applicationRevisionStatus: {
          applicationId: applicationRevision.applicationId,
          versionNumber: applicationRevision.versionNumber,
          applicationRevisionStatus: 'SUBMITTED' as CiipApplicationRevisionStatus
        }
      }
    };

    // TODO: check response
    await createApplicationRevisionStatusMutation(environment, variables);

    router.push(
      getCompleteApplicationPageRoute(
        applicationRevision.applicationByApplicationId.id
      )
    );
  };

  return (
    <Button
      className="float-right"
      style={{marginTop: '10px'}}
      onClick={submitApplication}
    >
      Submit Application
    </Button>
  );
};

export default createFragmentContainer(SubmitApplicationComponent, {
  applicationRevision: graphql`
    fragment SubmitApplication_applicationRevision on ApplicationRevision {
      applicationId
      versionNumber
      applicationByApplicationId {
        id
      }
    }
  `
});
