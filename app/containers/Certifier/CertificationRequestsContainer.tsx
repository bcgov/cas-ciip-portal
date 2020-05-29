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
  handleSelect: (...args: any[]) => void;
  handleSelectAll: (...args: any[]) => void;
  relay: RelayRefetchProp;
  query: CertificationRequestsContainer_query;
}

export const CertificationRequestsComponent: React.FunctionComponent<Props> = ({
  direction,
  orderByField,
  searchField,
  searchValue,
  handleEvent,
  handleSelect,
  handleSelectAll,
  relay,
  query
}) => {
  const initialSelections = {};
  const requestIds = query.searchCertificationRequests.edges.map(
    ({node}) => node.certificationUrlByCertificationUrlId.id
  );
  requestIds.forEach((id) => {
    initialSelections[id] = false;
  });

  const [selections, setSelections] = useState(initialSelections);
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
    'Certified By': 'certified_by_last_name',
    'Date Certified': 'certified_at',
    '': null
  };

  const onCheck = (checked, id) => {
    setSelections((prev) => {
      return {
        ...prev,
        [id]: checked
      };
    });
    handleSelect(id, checked);
  };

  const onSelectAll = (selectAll) => {
    setSelections((prev) => {
      const newState = {};
      Object.keys(prev).forEach((id) => {
        newState[id] = selectAll;
      });
      return newState;
    });
    handleSelectAll(selectAll, requestIds);
  };

  const body = (
    <tbody>
      {query.searchCertificationRequests.edges.map(({node}) => {
        const status = node.applicationRevisionStatus;

        const facility = node.facilityName;

        const organisation = node.operatorName;

        const certifierName = `${node.certifiedByFirstName || ''} ${
          node.certifiedByLastName || ''
        }`;

        if (!node?.certificationUrlByCertificationUrlId?.id) return null;

        return (
          <tr key={node.certificationUrlByCertificationUrlId.id}>
            <td className="checkbox-cell">
              <label>
                <input
                  type="checkbox"
                  checked={selections[node.certificationUrlByCertificationUrlId.id]}
                  onChange={(e) => onCheck(e.target.checked, node.certificationUrlByCertificationUrlId.id)}
                />
              </label>
            </td>
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
      <style>{`
        .checkbox-cell {
          position: relative;
        }
        .checkbox-cell label {
          margin-bottom: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
      `}</style>
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
        handleSelectAll={(selectAll) => onSelectAll(selectAll)}
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
              certificationUrlByCertificationUrlId {
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
