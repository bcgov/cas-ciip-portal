import React from 'react';
import {graphql, commitMutation, createFragmentContainer} from 'react-relay';
import {Button} from 'react-bootstrap';
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
    <div style={{fontWeight: 'bold'}}>
      {facility.facilityName}

      {applicationId ? (
        <Link
          href={{
            pathname: '/ciip-application',
            query: {
              applicationId
            }
          }}
        >
          <Button variant="primary" style={{marginLeft: '30px'}}>
            Resume CIIP application
          </Button>
        </Link>
      ) : (
        <Button
          variant="primary"
          style={{marginLeft: '30px'}}
          onClick={startApplication}
        >
          Apply for CIIP
        </Button>
      )}
    </div>
  );
};

export default createFragmentContainer(FacilityComponent, {
  facility: graphql`
    fragment Facility_facility on Facility {
      facilityName
      rowId
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
