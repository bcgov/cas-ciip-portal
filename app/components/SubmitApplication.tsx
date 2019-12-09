import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {Button} from 'react-bootstrap';
import {CiipApplicationStatus} from 'createApplicationStatusMutation.graphql';
import createApplicationStatusMutation from 'mutations/application/createApplicationStatusMutation';
import {SubmitApplication_application} from 'SubmitApplication_application.graphql';

interface Props {
  application: SubmitApplication_application;
  relay: RelayProp;
}

export const SubmitApplicationComponent: React.FunctionComponent<Props> = props => {
  const router = useRouter();
  // Change application status to 'pending' on application submit
  const submitApplication = async () => {
    const {environment} = props.relay;
    const variables = {
      input: {
        applicationStatus: {
          applicationId: props.application.rowId,
          applicationStatus: 'PENDING' as CiipApplicationStatus
        }
      }
    };
    const response = await createApplicationStatusMutation(
      environment,
      variables
    );
    console.log(response);
    // TODO: check response
    router.push('/complete-submit');
  };

  return (
    <Link
      passHref
      href={{
        pathname: '/complete-submit'
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
    }
  `
});
