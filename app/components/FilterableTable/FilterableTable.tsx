import React, {useMemo} from 'react';
import {Col, Table, Alert} from 'react-bootstrap';
import SortableTableHeader from './SortableTableHeader';
import FilterableTableFilterRow from './FilterableTableFilterRow';
import FilterableTablePagination from './FilterableTablePagination';
import {TableFilter, FilterArgs, PageArgs} from './Filters';
import {useRouter} from 'next/router';
import safeJsonParse from 'lib/safeJsonParse';

interface Props {
  filters: TableFilter[];
  body: JSX.Element;
  isLoading?: boolean;
  extraFilters?: TableFilter[];
  paginated?: boolean;
  totalCount?: number;
}

export const FilterableTable: React.FunctionComponent<Props> = ({
  filters,
  body,
  isLoading,
  extraFilters = [],
  paginated,
  totalCount
}) => {
  const router = useRouter();
  const filterArgs = useMemo<FilterArgs>(
    () => safeJsonParse(router.query.filterArgs as string),
    [router]
  );

  const {offset, pageSize} = useMemo<PageArgs>(
    () => safeJsonParse(router.query.pageArgs as string),
    [router]
  );

  const applyFilterArgs = (newFilterArgs: FilterArgs) => {
    const newQuery = {
      // copy the vars from the query string, so that the args coming from extraFilters are not overriden
      ...filterArgs,
      ...newFilterArgs
    };
    filters.forEach((option) => {
      const column = option.argName;

      if (option.isSearchEnabled) {
        newQuery[column] = newFilterArgs[column] ?? undefined;
      }
    });

    const queryString = JSON.stringify(newQuery);

    const url = {
      pathname: router.pathname,
      query: {
        ...router.query,
        filterArgs: queryString,
        pageArgs: JSON.stringify({offset: 0, pageSize})
      }
    };

    router.push(url, url, {shallow: true});
  };

  const applyPageArgs = (newPageArgs: PageArgs) => {
    const url = {
      pathname: router.pathname,
      query: {
        ...router.query,
        pageArgs: JSON.stringify(newPageArgs)
      }
    };
    router.push(url, url, {shallow: true});
  };

  const handleOffsetChange = (value: number) => {
    applyPageArgs({offset: value, pageSize});
  };

  const handleMaxResultsChange = (value: number) => {
    applyPageArgs({offset: 0, pageSize: value});
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
                applyFilterArgs({...filterArgs, [f.argName]: value})
              }
              filterArgs={filterArgs}
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
            {filters.map((option) => (
              <SortableTableHeader
                key={option.title + '-sortHeader'}
                headerVariables={{
                  columnName: option.argName,
                  displayName: option.title,
                  sortable: option.isSortEnabled
                }}
              />
            ))}
          </tr>
          <FilterableTableFilterRow
            filterArgs={filterArgs}
            filters={filters}
            onSubmit={applyFilterArgs}
          />
        </thead>
        {body}
      </Table>
      <Col md={{span: 6, offset: 3}}>{noSearchResults}</Col>
      {paginated && (
        <FilterableTablePagination
          totalCount={totalCount}
          offset={offset}
          pageSize={pageSize}
          onOffsetChange={handleOffsetChange}
          onPageSizeChange={handleMaxResultsChange}
        />
      )}
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

export default FilterableTable;
