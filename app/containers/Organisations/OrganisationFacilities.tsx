import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {CardDeck} from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';
import Facility from './Facility';

export const OrganisationFacilitiesComponent = props => {
  const {organisation} = props.query;
  if (!organisation) return <LoadingSpinner />;

  return (
    <>
      <CardDeck>
        {organisation.facilitiesByOrganisationId.edges.map(({node}) => {
          return <Facility key={node.id} facility={node} />;
        })}
      </CardDeck>
    </>
  );
};

export default createFragmentContainer(OrganisationFacilitiesComponent, {
  query: graphql`
    fragment OrganisationFacilities_query on Query
      @argumentDefinitions(id: {type: "ID!"}) {
      organisation(id: $organisationId) {
        id
        facilitiesByOrganisationId(first: 2147483647)
          @connection(key: "organisation_facilitiesByOrganisationId") {
          edges {
            node {
              id
              ...Facility_facility
            }
          }
        }
      }
    }
  `
});
