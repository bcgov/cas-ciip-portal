import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {Button} from 'react-bootstrap';
import {CiipApplicationRevisionStatus} from 'createApplicationRevisionStatusMutation.graphql';
import createApplicationRevisionStatusMutation from 'mutations/application/createApplicationRevisionStatusMutation';
import {SubmitApplication_application} from 'SubmitApplication_application.graphql';

interface Props {
  application: SubmitApplication_application;
  relay: RelayProp;
}

export const SubmitApplicationComponent: React.FunctionComponent<Props> = (
  props
) => {
  const router = useRouter();
  // Change application status to 'submitted' on application submit
  const submitApplication = async () => {
    const {environment} = props.relay;
    const variables = {
      input: {
        applicationRevisionStatus: {
          applicationId: props.application.rowId,
          versionNumber: props.application.latestDraftRevision.versionNumber,
          applicationRevisionStatus: 'SUBMITTED' as CiipApplicationRevisionStatus
        }
      }
    };
    const response = await createApplicationRevisionStatusMutation(
      environment,
      variables
    );
    console.log(response);
    // TODO: check response
    router.push('/reporter/complete-submit');
  };

  return (
    <Link
      passHref
      href={{
        pathname: '/reporter/complete-submit'
      }}
    >
      <Button
        className="float-right"
        style={{marginTop: '10px'}}
        onClick={submitApplication}
      >
        Submit Application
      </Button>
    </Link>
  );
};

export default createFragmentContainer(SubmitApplicationComponent, {
  application: graphql`
    fragment SubmitApplication_application on Application {
      rowId
      latestDraftRevision {
        versionNumber
      }
    }
  `
});
