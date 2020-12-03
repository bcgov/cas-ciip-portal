import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {Button, Col} from 'react-bootstrap';
import createApplicationRevisionMutation from 'mutations/application/createApplicationRevisionMutation';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ReviseApplicationButtonContainer_application} from 'ReviseApplicationButtonContainer_application.graphql';

interface Props {
  application: ReviseApplicationButtonContainer_application;
  relay: RelayProp;
}

export const ReviseApplicationButton: React.FunctionComponent<Props> = ({
  application,
  relay
}) => {
  const router = useRouter();
  const thisVersion = Number(router.query.version);
  const newerSubmissionExists =
    application.latestSubmittedRevision.versionNumber > thisVersion;
  const latestSubmissionURL = `/reporter/view-application?applicationId=${
    encodeURIComponent(application.id)
  }&version=${application.latestSubmittedRevision.versionNumber}`;
  const viewLatestSubmissionButton = (
    <>
      <p style={{margin: '1rem 0'}}>
        <strong>Note:</strong> There is a more recently submitted version of
        this application.
      </p>
      <Link href={latestSubmissionURL}>
        <a>
          <Button>View most recent submission</Button>
        </a>
      </Link>
    </>
  );

  const newerDraftExists =
    application.latestDraftRevision.versionNumber > application.latestSubmittedRevision.versionNumber;
  const newerDraftURL = `/reporter/application?applicationId=${
    encodeURIComponent(application.id)
  }&version=${
    application.latestDraftRevision.versionNumber
  }`;
  const resumeLatestDraftButton = (
    <>
      <p style={{margin: '1rem 0'}}>
        <strong>Note:</strong> This application has been revised in a more
        recent draft.
      </p>
      <Link href={newerDraftURL}>
        <a>
          <Button>Resume latest draft</Button>
        </a>
      </Link>
    </>
  );

  const handleClick = async () => {
    const variables = {
      input: {
        applicationIdInput: application.rowId,
        lastRevisionIdInput: application.latestSubmittedRevision.versionNumber
      }
    };

    const response = await createApplicationRevisionMutation(
      relay.environment,
      variables
    );
    console.log(response);

    const newVersion =
      response.createApplicationRevisionMutationChain.applicationRevision
        .versionNumber;
    const lastSubmittedVersion =
      response.createApplicationRevisionMutationChain.applicationRevision
        .applicationByApplicationId.latestSubmittedRevision.versionNumber;

    router.push({
      pathname: '/reporter/application',
      query: {
        applicationId: application.id,
        version: newVersion,
        previousVersion: lastSubmittedVersion
      }
    });
  };

  return (
    <Col>
      {newerSubmissionExists ? viewLatestSubmissionButton :
      newerDraftExists ? (
        resumeLatestDraftButton
      ) : (
        <Button variant="success" onClick={handleClick}>
          Revise Application
        </Button>
      )}
    </Col>
  );
};

export default createFragmentContainer(ReviseApplicationButton, {
  application: graphql`
    fragment ReviseApplicationButtonContainer_application on Application {
      id
      rowId
      latestDraftRevision {
        versionNumber
      }
      latestSubmittedRevision {
        versionNumber
      }
    }
  `
});
