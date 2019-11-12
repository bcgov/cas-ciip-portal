import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Button, Badge, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import {useRouter} from 'next/router';
import Link from 'next/link';
import createApplicationMutation from '../../mutations/application/createApplicationMutation';

export const FacilityComponent = ({relay, facility}) => {
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

  const {applicationsByFacilityId = {}} = facility;
  const {edges = []} = applicationsByFacilityId;
  const {node = {}} = edges[0] || {};
  const {id: applicationId, applicationStatus} = node;

  // Conditionall render apply / resume button depending on existence and status of Facility's application
  const applyButton = () => {
    if (!applicationId) {
      return (
        <Button variant="primary" onClick={startApplication}>
          Apply for CIIP for this facility
        </Button>
      );
    }

    if (applicationId && applicationStatus.applicationStatus === 'draft') {
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

    return null;
  };

  const statusBadgeColor = {
    attention: 'warning',
    pending: 'info',
    declined: 'danger',
    approved: 'success',
    draft: 'dark'
  };

  return (
    <>
      <Card style={{maxWidth: '400px'}}>
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
            {edges.length > 0 ? (
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
      </Card>
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
