import React from 'react';
import {Button} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import Link from 'next/link';
import createApplicationMutation from 'mutations/application/createApplicationMutation';
import {useRouter} from 'next/router';
import {ApplyButton_applyButtonDetails} from 'ApplyButton_applyButtonDetails.graphql';
interface Props {
  relay: RelayProp;
  applyButtonDetails: ApplyButton_applyButtonDetails;
}
const ApplyButton: React.FunctionComponent<Props> = props => {
  const {applyButtonDetails} = props;
  const {facilityByFacilityId} = applyButtonDetails;
  const {hasSwrsReport} = facilityByFacilityId;
  const {rowId} = facilityByFacilityId;
  const {environment} = props.relay;
  const applicationId = applyButtonDetails?.applicationByApplicationId?.id;

  const {applicationRevisionStatus} = applyButtonDetails;
  const router = useRouter();

  const startApplication = async () => {
    const variables = {
      input: {
        facilityIdInput: rowId
      }
    };
    const response = await createApplicationMutation(environment, variables);

    router.push({
      pathname: '/ciip-application-legal-disclaimer',
      query: {
        applicationId: response.createApplicationMutationChain.application.id,
        version: 1,
        hasSwrsReport
      }
    });
  };

  if (!applicationId) {
    return (
      <Button variant="primary" onClick={startApplication}>
        Apply for CIIP for this facility
      </Button>
    );
  }

  const latestSubmittedVersionNumber =
    applyButtonDetails.applicationByApplicationId?.latestSubmittedRevision
      ?.versionNumber;
  const latestDraftVersionNumber =
    applyButtonDetails.applicationByApplicationId?.latestDraftRevision
      ?.versionNumber;

  if (applicationId && applicationRevisionStatus === 'DRAFT') {
    return (
      <Link
        href={{
          pathname: '/reporter/ciip-application',
          query: {
            applicationId,
            version: latestDraftVersionNumber
          }
        }}
      >
        <Button variant="primary">Resume CIIP application</Button>
      </Link>
    );
  }

  if (
    applicationId &&
    (applicationRevisionStatus === 'SUBMITTED' ||
      applicationRevisionStatus === 'REQUESTED_CHANGES')
  ) {
    return (
      <Link
        href={{
          pathname: '/reporter/view-application',
          query: {
            applicationId,
            version: latestSubmittedVersionNumber
          }
        }}
      >
        <Button variant="primary">View Submitted Application</Button>
      </Link>
    );
  }

  return null;
};

export default createFragmentContainer(ApplyButton, {
  applyButtonDetails: graphql`
    fragment ApplyButton_applyButtonDetails on FacilitySearchResult {
      applicationByApplicationId {
        id
        latestDraftRevision {
          id
          versionNumber
        }
        latestSubmittedRevision {
          id
          versionNumber
        }
      }
      applicationRevisionStatus
      facilityByFacilityId {
        rowId
        hasSwrsReport(reportingYear: 2018)
      }
    }
  `
});
