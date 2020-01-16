import React from 'react';
import {useRouter} from 'next/router';
import {Button, Col} from 'react-bootstrap';
import createApplicationRevisionMutation from 'mutations/application/createApplicationRevisionMutation';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ReviseApplicationButtonContainer_application} from 'ReviseApplicationButtonContainer_application.graphql';
import {ReviseApplicationButtonContainer_query} from 'ReviseApplicationButtonContainer_query.graphql';

interface Props {
  application: ReviseApplicationButtonContainer_application;
  relay: RelayProp;
  query: ReviseApplicationButtonContainer_query;
}

export const ReviseApplicationButton: React.FunctionComponent<Props> = ({
  application,
  relay,
  query
}) => {
  const router = useRouter();
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
      pathname: '/reporter/ciip-application',
      query: {
        applicationId: application.id,
        version: newVersion,
        previousVersion: lastSubmittedVersion
      }
    });
  };

  if (!query.openedReportingYear.reportingYear) {
    return (
      <Col>
        <Button disabled variant="info">
          Application window closed
        </Button>
      </Col>
    );
  }

  return (
    <Col>
      <Button variant="success" onClick={handleClick}>
        Revise Application
      </Button>
    </Col>
  );
};

export default createFragmentContainer(ReviseApplicationButton, {
  application: graphql`
    fragment ReviseApplicationButtonContainer_application on Application {
      id
      rowId
      latestSubmittedRevision {
        versionNumber
      }
    }
  `,
  query: graphql`
    fragment ReviseApplicationButtonContainer_query on Query {
      openedReportingYear {
        reportingYear
      }
    }
  `
});
