import React, {useEffect} from 'react';
import {graphql, createRefetchContainer} from 'react-relay';
import SearchTableLayout from 'components/SearchTableLayout';
import FacilitiesRowItemContainer from './FacilitiesRowItemContainer';

export const FacilitiesList = props => {
  const {
    direction,
    orderByField,
    searchField,
    searchValue,
    handleEvent
  } = props;
  const {edges} = props.query.searchAllFacilities;
  useEffect(() => {
    const refetchVariables = {
      searchField,
      searchValue,
      orderByField,
      direction
    };
    props.relay.refetch(refetchVariables);
  });

  const displayNameToColumnNameMap = {
    'Organisation Name': 'organisation_name',
    'Facility Name': 'facility_name',
    Address: 'facility_mailing_address',
    'Postal Code': 'facility_postal_code',
    City: 'facility_city',
    Status: 'application_status'
  };

  const body = (
    <tbody>
      {edges.map(edge => (
        <FacilitiesRowItemContainer
          key={edge.node.rowId}
          facilitySearchResult={edge.node}
        />
      ))}
    </tbody>
  );

  return (
    <SearchTableLayout
      body={body}
      displayNameToColumnNameMap={displayNameToColumnNameMap}
      handleEvent={handleEvent}
    />
  );
};

export default createRefetchContainer(
  FacilitiesList,
  {
    query: graphql`
      fragment FacilitiesListContainer_query on Query
        @argumentDefinitions(
          searchField: {type: "String"}
          searchValue: {type: "String"}
          orderByField: {type: "String"}
          direction: {type: "String"}
        ) {
        searchAllFacilities(
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          direction: $direction
        ) {
          edges {
            node {
              rowId
              ...FacilitiesRowItemContainer_facilitySearchResult
            }
          }
        }
      }
    `
  },
  graphql`
    query FacilitiesListContainerRefetchQuery(
      $searchField: String
      $searchValue: String
      $orderByField: String
      $direction: String
    ) {
      query {
        ...FacilitiesListContainer_query
          @arguments(
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
          )
      }
    }
  `
);
