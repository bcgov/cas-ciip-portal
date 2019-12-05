import React from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {Button, Badge} from 'react-bootstrap';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {
  Facility_facility,
  CiipApplicationStatus
} from 'Facility_facility.graphql';
import createApplicationMutation from 'mutations/application/createApplicationMutation';

interface Props {
  relay: RelayProp;
  facility: Facility_facility;
}

export const FacilityComponent: React.FunctionComponent<Props> = ({
  relay,
  facility
}) => {
  const {edges} = facility?.applicationsByFacilityId || {};
  const {id: applicationId, applicationStatus} = edges?.[0]?.node || {};

  const {environment} = relay;
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

  // Conditionall render apply / resume button depending on existence and status of Facility's application
  const applyButton = () => {
    // TODO: use switch with no default here. Take care of all possible values for the status enum
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

  const statusBadgeColor: Record<
    CiipApplicationStatus,
    'info' | 'danger' | 'success' | 'dark' | 'primary' | 'secondary'
  > = {
    // Attention: 'warning',
    PENDING: 'info',
    REJECTED: 'danger',
    APPROVED: 'success',
    DRAFT: 'dark',
    CHANGES_SUBMITTED: 'primary',
    REQUESTED_CHANGES: 'secondary'
  };

  return (
    <>
      {/* <Card style={{maxWidth: '400px'}}>
        <Card.Header>
          <strong>Facility Name: </strong>
          {facility.facilityName}
        </Card.Header>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <strong>Address: </strong> <br />
            {facility.facilityMailingAddress} {facility.facilityPostalCode}
            <br />
            {facility.facilityCity}, {facility.facilityProvince}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Application Status:</strong> &nbsp;{' '}
            {applicationStatus ? (
              <>
                <Badge
                  pill
                  variant={
                    statusBadgeColor[applicationStatus.applicationStatus]
                  }
                >
                  {applicationStatus.applicationStatus}
                </Badge>
              </>
            ) : (
              <>Application not started</>
            )}
          </ListGroupItem>
        </ListGroup>
        <Card.Body>{applyButton()}</Card.Body>
      </Card> */}
      <tr>
        <td>{facility.facilityName}</td>
        <td>
          {facility.facilityMailingAddress} {facility.facilityPostalCode}
          <br />
          {facility.facilityCity}, {facility.facilityProvince}
        </td>
        <td>
          {' '}
          {applicationStatus ? (
            <>
              <Badge
                pill
                variant={statusBadgeColor[applicationStatus.applicationStatus]}
              >
                {applicationStatus.applicationStatus}
              </Badge>
            </>
          ) : (
            <>Application not started</>
          )}
        </td>
        <td>{applyButton()}</td>
      </tr>
    </>
  );
};

export default createFragmentContainer(FacilityComponent, {
  facility: graphql`
    fragment Facility_facility on Facility {
      facilityName
      facilityMailingAddress
      facilityCity
      facilityProvince
      facilityPostalCode
      rowId
      hasSwrsReport(reportingYear: "2018")
      applicationsByFacilityId {
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
