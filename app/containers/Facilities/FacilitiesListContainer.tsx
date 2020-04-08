import React, {useEffect, useState, SyntheticEvent} from 'react';
import {Pagination} from 'react-bootstrap';
import {graphql, createRefetchContainer, RelayRefetchProp} from 'react-relay';
import SearchTableLayout from 'components/SearchTableLayout';
import createFacilityMutation from 'mutations/facility/createFacilityMutation';
import AddOrganisationFacility from 'components/AddOrganisationFacility';
import {FacilitiesListContainer_query} from 'FacilitiesListContainer_query.graphql';
import FacilitiesRowItemContainer from './FacilitiesRowItemContainer';
import {useRouter} from 'next/router';

interface Props {
  direction: string;
  orderByField: string;
  searchField: string;
  searchValue: string;
  offsetValue: number;
  handleEvent: (...args: any[]) => void;
  query: FacilitiesListContainer_query;
  relay: RelayRefetchProp;
}

export const FacilitiesList: React.FunctionComponent<Props> = ({
  direction,
  orderByField,
  searchField,
  searchValue,
  handleEvent,
  relay,
  query
}) => {
  const {edges} = query.searchAllFacilities;
  const router = useRouter();
  // Allows for undefined organisation (coming from subheader My Applications)
  // TODO: Refactor facilities-list / organisations pages
  let organisation;
  if (router.query.organisationId) organisation = query.organisation;
  const facilityNumber = query.allFacilities.totalCount;
  let [facilityCount, updateFacilityCount] = useState(facilityNumber);
  const [offsetValue, setOffset] = useState(0);
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    const refetchVariables = {
      searchField,
      searchValue,
      orderByField,
      direction,
      facilityCount,
      offsetValue
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
          query={query}
        />
      ))}
    </tbody>
  );

  const handleAddFacility = async variables => {
    const {environment} = relay;
    const response = await createFacilityMutation(environment, variables);
    console.log(response);
    updateFacilityCount((facilityCount += 1));
  };

  const previousTenPagination = () => {
    if (offsetValue > 0) {
      setOffset(offsetValue - 10);
      setActivePage(activePage - 1);
    }
  };

  const nextTenPagination = () => {
    setOffset(offsetValue + 10);
    setActivePage(activePage + 1);
  };

  // Pagination
  const items = [];
  const maxPages = Math.ceil(
    query?.searchAllFacilities?.edges[0]?.node?.totalFacilityCount / 10
  );
  const handlePaginationByPageNumber = (pageNumber: number) => {
    setOffset((pageNumber - 1) * 10);
    setActivePage(pageNumber);
  };

  for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
    items.push(
      <Pagination.Item
        key={pageNumber}
        active={pageNumber === activePage}
        onClick={() => handlePaginationByPageNumber(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>
    );
  }

  return (
    <>
      <SearchTableLayout
        body={body}
        displayNameToColumnNameMap={displayNameToColumnNameMap}
        handleEvent={handleEvent}
      />
      {maxPages > 1 && (
        <Pagination>
          <Pagination.First onClick={() => handlePaginationByPageNumber(1)} />
          <Pagination.Prev onClick={previousTenPagination} />
          <Pagination>{items}</Pagination>
          <Pagination.Next onClick={nextTenPagination} />
          <Pagination.Last
            onClick={() => handlePaginationByPageNumber(maxPages)}
          />
        </Pagination>
      )}
      {organisation ? (
        <AddOrganisationFacility
          organisationRowId={organisation.rowId}
          onAddFacility={handleAddFacility}
        />
      ) : null}
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
          offsetValue: {type: "Int"}
        ) {
        ...FacilitiesRowItemContainer_query
        searchAllFacilities(
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          direction: $direction
          offsetValue: $offsetValue
        ) {
          edges {
            node {
              rowId
              totalFacilityCount
              ...FacilitiesRowItemContainer_facilitySearchResult
            }
          }
        }
        # TODO: This is here to trigger a refactor as updating the edge / running the query in the mutation is not triggering a refresh
        # Find a way to not pull the totalcount?
        allFacilities(first: $facilityCount) {
          totalCount
        }
        organisation(id: $organisationId) {
          id
          rowId
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
      $offsetValue: Int
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
            offsetValue: $offsetValue
          )
      }
    }
  `
);
