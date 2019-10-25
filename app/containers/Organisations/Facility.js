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
      pathname: '/ciip-application',
      query: {
        applicationId: response.createApplicationMutationChain.application.id
      }
    });
  };

  const {applicationsByFacilityId = {}} = facility;
  const {edges = []} = applicationsByFacilityId;
  const {node = {}} = edges[0] || {};
  const {id: applicationId} = node;

  const statusBadgeColor = {
    attention: 'warning',
    pending: 'info',
    declined: 'danger',
    approved: 'success',
    draft: 'secondary'
  };

  return (
    <>
      <Card style={{width: '33rem'}}>
        <Card.Header>
          {facility.organisationByOrganisationId.operatorName}
        </Card.Header>
        <Card.Body border="dark">
          <Card.Title>{facility.facilityName}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            {facility.facilityMailingAddress} {facility.facilityPostalCode}
          </ListGroupItem>
          <ListGroupItem>
            {facility.facilityCity}, {facility.facilityProvince}
          </ListGroupItem>
          <ListGroupItem>
            Application Status: &nbsp;{' '}
            {facility.applicationsByFacilityId.edges.length > 0 &&
            facility.applicationsByFacilityId.edges[0].node
              .applicationStatusesByApplicationId.edges.length > 0 ? (
              <>
                <Badge
                  pill
                  variant={
                    statusBadgeColor[
                      facility.applicationsByFacilityId.edges[0].node
                        .applicationStatusesByApplicationId.edges[0].node
                        .applicationStatus
                    ]
                  }
                >
                  {
                    facility.applicationsByFacilityId.edges[0].node
                      .applicationStatusesByApplicationId.edges[0].node
                      .applicationStatus
                  }
                </Badge>
              </>
            ) : (
              <>Not Started</>
            )}
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          {applicationId ? (
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
          ) : (
            <Button variant="primary" onClick={startApplication}>
              Apply for CIIP
            </Button>
          )}
        </Card.Body>
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

      organisationByOrganisationId {
        operatorName
      }

      applicationsByFacilityId {
        edges {
          node {
            id
            applicationStatusesByApplicationId {
              edges {
                node {
                  applicationStatus
                }
              }
            }
          }
        }
      }
    }
  `
});
