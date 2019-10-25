import React from 'react';
import {graphql, commitMutation, createFragmentContainer} from 'react-relay';
import {Button, Table, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import {useRouter} from 'next/router';
import Link from 'next/link';

export const FacilityComponent = ({relay, facility}) => {
  const {environment} = relay;
  const createApplication = graphql`
    mutation FacilityApplicationMutation($input: CreateApplicationInput!) {
      createApplication(input: $input) {
        application {
          id
        }
      }
    }
  `;
  const router = useRouter();
  const startApplication = () => {
    const variables = {
      input: {
        application: {
          facilityId: facility.rowId
        }
      }
    };
    const mutation = createApplication;
    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: response => {
        router.push({
          pathname: '/ciip-application',
          query: {
            applicationId: response.createApplication.application.id
          }
        });
      }
    });
  };

  const {applicationsByFacilityId = {}} = facility;
  const {edges = []} = applicationsByFacilityId;
  const {node = {}} = edges[0] || {};
  const {id: applicationId} = node;

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
          }
        }
      }
    }
  `
});
