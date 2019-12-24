import React, {useEffect, useState} from 'react';
import {graphql, createRefetchContainer, RelayRefetchProp} from 'react-relay';
import SearchTableLayout from 'components/SearchTableLayout';
import createFacilityMutation from 'mutations/facility/createFacilityMutation';
import AddFacility from 'components/facility/AddFacility';
import {FacilitiesListContainer_query} from 'FacilitiesListContainer_query.graphql';
import FacilitiesRowItemContainer from './FacilitiesRowItemContainer';

interface Props {
  direction: string;
  orderByField: string;
  searchField: string;
  searchValue: string;
  handleEvent: (...args: any[]) => void;
  query: FacilitiesListContainer_query;
  relay: RelayRefetchProp;
}

export const FacilitiesList: React.FunctionComponent<Props> = props => {
  const {
    direction,
    orderByField,
    searchField,
    searchValue,
    handleEvent,
    relay
  } = props;
  const {edges} = props.query.searchAllFacilities;
  const {organisation, getReportingYear} = props.query;
  const facilityNumber = props.query.allFacilities.totalCount;
  let [facilityCount, updateFacilityCount] = useState(facilityNumber);
  useEffect(() => {
    const refetchVariables = {
      searchField,
      searchValue,
      orderByField,
      direction,
      facilityCount
    };
    relay.refetch(refetchVariables);
  });

  const displayNameToColumnNameMap = {
    'Organisation Name': 'organisation_name',
    'Facility Name': 'facility_name',
    Address: 'facility_mailing_address',
    'Postal Code': 'facility_postal_code',
    City: 'facility_city',
    Status: 'application_revision_status'
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

  const handleAddFacility = async variables => {
    const {environment} = props.relay;
    const response = await createFacilityMutation(environment, variables);
    console.log(response);
    updateFacilityCount((facilityCount += 1));
  };

  return (
    <>
      <SearchTableLayout
        body={body}
        displayNameToColumnNameMap={displayNameToColumnNameMap}
        handleEvent={handleEvent}
      />
      <AddFacility
        organisationRowId={organisation.rowId}
        reportingYear={getReportingYear.reportingYear}
        onAddFacility={handleAddFacility}
      />
    </>
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
          organisationId: {type: "ID!"}
          facilityCount: {type: "Int"}
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
        allFacilities(first: $facilityCount) {
          totalCount
          edges {
            cursor
          }
        }
        organisation(id: $organisationId) {
          id
          rowId
        }
        getReportingYear {
          reportingYear
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
      $organisationId: ID!
      $facilityCount: Int
    ) {
      query {
        ...FacilitiesListContainer_query
          @arguments(
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
            organisationId: $organisationId
            facilityCount: $facilityCount
          )
      }
    }
  `
);
