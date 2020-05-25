import React, {useEffect, useState} from 'react';
import {Button, Alert, Pagination} from 'react-bootstrap';
import moment from 'moment-timezone';
import Link from 'next/link';
import {graphql, createRefetchContainer, RelayRefetchProp} from 'react-relay';
import SearchTableLayout from 'components/SearchTableLayout';
import {CertificationRequestsContainer_query} from '__generated__/CertificationRequestsContainer_query.graphql';

const TIME_ZONE = 'America/Vancouver';

function formatListViewDate(date) {
  return date ? moment.tz(date, TIME_ZONE).format('MMM D, YYYY') : '';
}

interface Props {
  direction: string;
  orderByField: string;
  searchField: string[];
  searchValue: string[];
  offsetValue: number;
  handleEvent: (...args: any[]) => void;
  relay: RelayRefetchProp;
  query: CertificationRequestsContainer_query;
}

export const CertificationRequestsComponent: React.FunctionComponent<Props> = ({
  direction,
  orderByField,
  searchField,
  searchValue,
  handleEvent,
  relay,
  query
}) => {
  const [offsetValue, setOffset] = useState(0);
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    const refetchVariables = {
      searchField,
      searchValue,
      orderByField,
      direction,
      offsetValue
    };
    relay.refetch(refetchVariables);
  });

  const displayNameToColumnNameMap = {
    Facility: 'facility_name',
    Organisation: 'operator_name',
    Status: 'application_revision_status',
    'Certified By': 'certified_by',
    'Date Certified': 'certified_at',
    '': null
  };

  const body = (
    <tbody>
      {query.searchCertificationRequests.edges.map(({node}) => {
        const status = node.applicationRevisionStatus;

        const facility = node.facilityName;

        const organisation = node.operatorName;

        const certifierName =
          node.certifiedByFirstName || node.certifiedByLastName
            ? `${node.certifiedByFirstName} ${node.certifiedByLastName}`
            : '';

        const {applicationId} = node;
        const {versionNumber} = node;

        return (
          <tr key={node.rowId}>
            <td>{facility}</td>
            <td>{organisation}</td>
            <td>{status}</td>
            <td>{certifierName}</td>
            <td>{formatListViewDate(node.certifiedAt)}</td>
            <td>
              <Link
                href={`/certifier/certify?applicationId=${applicationId}&version=${versionNumber}`}
              >
                <Button className="w-100">View</Button>
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  );

  const previousTenPagination = () => {
    if (offsetValue > 0) {
      setOffset(offsetValue - 20);
      setActivePage(activePage - 1);
    }
  };

  const nextTenPagination = () => {
    if (activePage !== maxPages) {
      setOffset(offsetValue + 20);
      setActivePage(activePage + 1);
    }
  };

  // Pagination
  const items = [];
  const maxPages = Math.ceil(
    query?.searchCertificationRequests?.edges[0]?.node?.totalRequestCount / 20
  );
  const handlePaginationByPageNumber = (pageNumber: number) => {
    setOffset((pageNumber - 1) * 20);
    setActivePage(pageNumber);
  };

  let startPage;
  let endPage;
  if (maxPages <= 9) {
    startPage = 1;
    endPage = maxPages;
  } else if (maxPages - activePage <= 4) {
    startPage = maxPages - 8;
    endPage = maxPages;
  } else if (activePage <= 5) {
    startPage = 1;
    endPage = 9;
  } else {
    startPage = activePage - 4;
    endPage = activePage + 4;
  }

  for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
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

  return query.searchCertificationRequests.edges.length === 0 ? (
    <Alert variant="info">You have no current certification requests.</Alert>
  ) : (
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
          {startPage !== 1 && <Pagination.Ellipsis />}
          <Pagination>{items}</Pagination>
          {endPage !== maxPages && <Pagination.Ellipsis />}
          <Pagination.Next onClick={nextTenPagination} />
          <Pagination.Last
            onClick={() => handlePaginationByPageNumber(maxPages)}
          />
        </Pagination>
      )}
    </>
  );
};

export default createRefetchContainer(
  CertificationRequestsComponent,
  {
    query: graphql`
      fragment CertificationRequestsContainer_query on Query
        @argumentDefinitions(
          searchField: {type: "[String]"}
          searchValue: {type: "[String]"}
          orderByField: {type: "String"}
          direction: {type: "String"}
          offsetValue: {type: "Int"}
        ) {
        searchCertificationRequests(
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          direction: $direction
          offsetValue: $offsetValue
        ) {
          edges {
            node {
              rowId
              applicationId
              versionNumber
              certifiedAt
              certifierEmail
              facilityName
              operatorName
              applicationRevisionStatus
              certifiedByFirstName
              certifiedByLastName
              totalRequestCount
            }
          }
        }
      }
    `
  },
  graphql`
    query CertificationRequestsContainerRefetchQuery(
      $searchField: [String]
      $searchValue: [String]
      $orderByField: String
      $direction: String
      $offsetValue: Int
    ) {
      query {
        ...CertificationRequestsContainer_query
          @arguments(
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
            offsetValue: $offsetValue
          )
      }
    }
  `
);
