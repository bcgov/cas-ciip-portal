import React, {useEffect, useState} from 'react';
import {Button, Alert} from 'react-bootstrap';
import moment from 'moment-timezone';
import Link from 'next/link';
import {graphql, createRefetchContainer, RelayRefetchProp} from 'react-relay';
import SearchTableLayout from 'components/SearchTableLayout';
import PaginationBar from 'components/PaginationBar';
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

        let certifierName = '';
        if (node.certifiedByFirstName && node.certifiedByLastName)
          certifierName = `${node.certifiedByFirstName} ${node.certifiedByLastName}`;
        else if (node.certifiedByFirstName && !node.certifiedByLastName)
          certifierName = node.certifiedByFirstName;
        else if (!node.certifiedByFirstName && node.certifiedByLastName)
          certifierName = node.certifiedByLastName;

        return (
          <tr key={node.rowId}>
            <td>{facility}</td>
            <td>{organisation}</td>
            <td>{status}</td>
            <td>{certifierName}</td>
            <td>{formatListViewDate(node.certifiedAt)}</td>
            <td>
              <Link
                href={`/certifier/certify?applicationId=${node.applicationByApplicationId.id}&version=${node.versionNumber}`}
              >
                <Button className="w-100">View</Button>
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  );

  const maxResultsPerPage = 20;

  const totalRequestCount =
    query?.searchCertificationRequests?.edges[0]?.node?.totalRequestCount || 0;

  return query.searchCertificationRequests.edges.length === 0 ? (
    <Alert variant="info">
      You have no current certification requests matching your search criteria.
    </Alert>
  ) : (
    <>
      <SearchTableLayout
        body={body}
        displayNameToColumnNameMap={displayNameToColumnNameMap}
        handleEvent={handleEvent}
      />
      <PaginationBar
        setOffset={setOffset}
        setActivePage={setActivePage}
        offsetValue={offsetValue}
        activePage={activePage}
        maxResultsPerPage={maxResultsPerPage}
        totalCount={totalRequestCount}
      />
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
              applicationByApplicationId {
                id
              }
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
