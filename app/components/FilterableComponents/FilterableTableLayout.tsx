import React, {useMemo} from 'react';
import {Col, Table, Alert} from 'react-bootstrap';
import SortableTableHeader from './SortableTableHeader';
import FilterableTableHeaders from './FilterableTableHeaders';
import {ISearchProps, ISearchExtraFilter} from 'components/Search/SearchProps';
import {useRouter} from 'next/router';
import safeJsonParse from 'lib/safeJsonParse';
import {FilterArgs} from 'components/Search/ISearchOption';

interface Props extends ISearchProps {
  body: JSX.Element;
  isLoading?: boolean;
  extraFilters?: ISearchExtraFilter[];
}
export const FilterableTableLayoutComponent: React.FunctionComponent<Props> = ({
  searchOptions,
  body,
  isLoading,
  extraFilters = []
}) => {
  const router = useRouter();
  const relayVars = useMemo(
    () => safeJsonParse(router.query.relayVars as string),
    [router]
  );

  const applySearch = (searchData: FilterArgs) => {
    const newQuery = {
      // copy the vars from the query string, so that the args coming from extraFilters are not overriden
      ...relayVars,
      ...searchData
    };
    searchOptions.forEach((option) => {
      const column = option.columnName;

      if (option.isSearchEnabled) {
        newQuery[column] = searchData[column] ?? undefined;
      }
    });

    const queryString = JSON.stringify(newQuery);

    const url = {
      pathname: router.pathname,
      query: {
        ...router.query,
        relayVars: queryString,
        pageVars: JSON.stringify({offset: 0})
      }
    };

    router.push(url, url, {shallow: true});
  };

  const bodyLength =
    body.props.children?.length ?? body.props.children?.[0]?.length ?? 0;
  const noSearchResults =
    bodyLength === 0 ? (
      <Alert variant="secondary" id="no-search-results">
        No matching results to show.
      </Alert>
    ) : null;

  return (
    <>
      <div>
        {extraFilters.map((f) => {
          return (
            <f.Component
              key={f.argName}
              onChange={(value) =>
                applySearch({...relayVars, [f.argName]: value})
              }
              value={relayVars[f.argName]}
            />
          );
        })}
      </div>
      <Table
        striped
        bordered
        hover
        className={isLoading ? 'search-table loading' : 'search-table'}
      >
        <thead>
          <tr>
            {searchOptions.map((option) => (
              <SortableTableHeader
                key={option.title + '-sortHeader'}
                headerVariables={{
                  columnName: option.columnName,
                  displayName: option.title,
                  sortable: option.isSortEnabled
                }}
              />
            ))}
          </tr>
          <FilterableTableHeaders
            filterArgs={relayVars}
            searchOptions={searchOptions}
            onSubmit={applySearch}
          />
        </thead>
        {body}
      </Table>
      <Col md={{span: 6, offset: 3}}>{noSearchResults}</Col>
      <style jsx global>{`
        .search-table {
          text-align: center;
        }
        .master-select {
          background: #003366;
          color: white;
          min-width: 6em;
          position: relative;
        }
        .master-select label {
          margin-bottom: 0;
          padding-right: 24px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        .master-select input[type='checkbox'] {
          position: absolute;
          right: 10px;
          top: calc(50% - 6px);
        }
        .search-table.loading td {
          opacity: 0;
          pointer-events: none;
        }

        .search-table.loading tbody {
          position: relative;
        }
        .search-table.loading tbody::after {
          width: 2rem;
          height: 2rem;
          vertical-align: text-bottom;
          background-color: black;
          border-radius: 50%;
          opacity: 0;
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          animation: spinner-grow 0.75s linear infinite;
        }
        #no-search-results {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default FilterableTableLayoutComponent;
