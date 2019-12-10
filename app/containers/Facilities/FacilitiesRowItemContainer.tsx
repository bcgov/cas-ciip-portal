import React from 'react';
import {Badge, Button} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import {CiipApplicationStatus} from 'FacilitiesRowItemContainer_facility.graphql';
import {useRouter} from 'next/router';
import Link from 'next/link';
import createApplicationMutation from 'mutations/application/createApplicationMutation';

const statusBadgeColor: Record<
  CiipApplicationStatus,
  'info' | 'danger' | 'success' | 'warning' | 'primary' | 'secondary'
> = {
  DRAFT: 'warning',
  PENDING: 'info',
  REJECTED: 'danger',
  APPROVED: 'success',
  CHANGES_SUBMITTED: 'primary',
  REQUESTED_CHANGES: 'secondary'
};
export const FacilitiesRowItem = props => {
  const {facility = {}} = props;
  const {edges} = facility?.applicationsByFacilityId || {};
  const {id: applicationId, applicationStatus} = edges?.[0]?.node || {};
  console.log(props);
  const {environment} = props.relay;
  const router = useRouter();
  const startApplication = async () => {
    const variables = {
      input: {
        facilityIdInput: facility.rowId
      }
    };
    const response = await createApplicationMutation(environment, variables);
    console.log(response);
    router.push({
      pathname: facility.hasSwrsReport
        ? '/ciip-application-swrs-import'
        : '/ciip-application',
      query: {
        applicationId: response.createApplicationMutationChain.application.id
      }
    });
  };

  const applyButton = () => {
    if (!applicationId) {
      return (
        <Button variant="primary" onClick={startApplication}>
          Apply for CIIP for this facility
        </Button>
      );
    }

    if (applicationId && applicationStatus.applicationStatus === 'DRAFT') {
      return (
        <Link
          href={{
            pathname: '/ciip-application',
            query: {
              applicationId
            }
          }}
        >
          <Button variant="primary">Resume CIIP application</Button>
        </Link>
      );
    }

    if (applicationId && applicationStatus.applicationStatus === 'PENDING') {
      return (
        <Link
          href={{
            pathname: '/view-application',
            query: {
              applicationId
            }
          }}
        >
          <Button variant="primary">View Submitted Application</Button>
        </Link>
      );
    }

    return null;
  };

  return (
    <tr>
      <td>{facility.facilityName}</td>
      <td>{facility.facilityMailingAddress}</td>
      <td>{facility.facilityPostalCode}</td>
      <td>{facility.facilityCity}</td>
      <td>{facility.facilityProvince}</td>
      <td>
        {' '}
        {applicationStatus ? (
          <>
            <Badge
              pill
              style={{width: '100%'}}
              variant={statusBadgeColor[applicationStatus?.applicationStatus]}
            >
              {applicationStatus?.applicationStatus}
            </Badge>
          </>
        ) : (
          <>Application not started</>
        )}
      </td>
      <td>{applyButton()}</td>
    </tr>
  );
};

export default createFragmentContainer(FacilitiesRowItem, {
  facility: graphql`
    fragment FacilitiesRowItemContainer_facility on Facility {
      facilityName
      facilityMailingAddress
      facilityCity
      facilityProvince
      facilityPostalCode
      rowId
      hasSwrsReport(reportingYear: "2018")
      applicationsByFacilityId(condition: {reportingYear: 2018}) {
        edges {
          node {
            id
            applicationStatus {
              id
              applicationStatus
            }
          }
        }
      }
    }
  `
});
