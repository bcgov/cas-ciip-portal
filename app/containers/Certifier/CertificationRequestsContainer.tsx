import React, {useEffect, useState, useRef} from 'react';
import {Button} from 'react-bootstrap';
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

function getCertifiableRequestIds(query) {
  return query.searchCertificationRequests.edges
    .filter(({node}) => !node.certifiedAt)
    .map(({node}) => node.certificationUrlByCertificationUrlId.id);
}

function isAllSelected(ids, selections) {
  return ids.length > 0 && ids.every((id) => selections.includes(id));
}

interface Props {
  direction: string;
  orderByField: string;
  searchField: string[];
  searchValue: string[];
  offsetValue: number;
  forceRefetch?: number;
  selections: string[];
  handleEvent: (...args: any[]) => void;
  notifySelections: (selectedIds: string[]) => void;
  relay: RelayRefetchProp;
  query: CertificationRequestsContainer_query;
}

export const CertificationRequestsComponent: React.FunctionComponent<Props> = ({
  direction,
  orderByField,
  searchField,
  searchValue,
  selections,
  forceRefetch = 0,
  handleEvent,
  notifySelections,
  relay,
  query
}) => {
  const certifiableRequestIds = useRef(getCertifiableRequestIds(query));
  const refetchQueryInitialized = useRef(false);

  const [offsetValue, setOffset] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const maxResultsPerPage = 20;

  useEffect(() => {
    const refetchVariables = {
      searchField,
      searchValue,
      orderByField,
      direction,
      offsetValue,
      maxResultsPerPage,
      forceRefetch
    };
    relay.refetch(refetchVariables, undefined, (error) => {
      if (error) return;
      certifiableRequestIds.current = getCertifiableRequestIds(query);

      if (refetchQueryInitialized.current) {
        const resolvedSelections = selections.filter((id) =>
          certifiableRequestIds.current.includes(id)
        );
        notifySelections(resolvedSelections);
      }

      refetchQueryInitialized.current = true;
    });
  }, [
    searchField,
    searchValue,
    orderByField,
    direction,
    offsetValue,
    maxResultsPerPage,
    forceRefetch,
    query
  ]);

  const displayNameToColumnNameMap = {
    Facility: 'facility_name',
    Organisation: 'operator_name',
    Status: 'application_revision_status',
    'Certified By': 'certified_by_last_name',
    'Date Certified': 'certified_at',
    '': null
  };

  const onCheck = (checked, id) => {
    if (checked && !selections.includes(id)) {
      notifySelections([...selections.slice(), id]);
    } else if (!checked && selections.includes(id)) {
      const i = selections.indexOf(id);
      notifySelections([...selections.slice(0, i), ...selections.slice(i + 1)]);
    }
  };

  const onSelectAll = (selectAll) => {
    notifySelections(selectAll ? certifiableRequestIds.current.slice() : []);
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
                {!node.certifiedAt && (
                  <input
                    type="checkbox"
                    checked={selections.includes(
                      node.certificationUrlByCertificationUrlId.id
                    )}
                    onChange={(e) =>
                      onCheck(
                        e.target.checked,
                        node.certificationUrlByCertificationUrlId.id
                      )
                    }
                  />
                )}
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

  const totalRequestCount =
    query?.searchCertificationRequests?.edges[0]?.node?.totalRequestCount || 0;

  return (
    <>
      <SearchTableLayout
        allSelected={isAllSelected(certifiableRequestIds.current, selections)}
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
          forceRefetch: {type: "Int"}
          maxResultsPerPage: {type: "Int"}
        ) {
        searchCertificationRequests(
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          direction: $direction
          offsetValue: $offsetValue
          maxResultsPerPage: $maxResultsPerPage
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
        allCertificationUrls(first: $forceRefetch) {
          totalCount
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
      $forceRefetch: Int
      $maxResultsPerPage: Int
    ) {
      query {
        ...CertificationRequestsContainer_query
          @arguments(
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
            offsetValue: $offsetValue
            forceRefetch: $forceRefetch
            maxResultsPerPage: $maxResultsPerPage
          )
      }
    }
  `
);
