import React from 'react';
import {useRouter} from 'next/router';
import {Pagination, Dropdown} from 'react-bootstrap';
import safeJsonParse from 'lib/safeJsonParse';

interface Props {
  totalCount: number;
}

export const DEFAULT_MAX_RESULTS = 20;

const FilterableTablePaginationComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {totalCount} = props;
  const router = useRouter();

  const pageData = safeJsonParse(router.query.pageVars as string);

  const maxResultsPerPage = pageData.max_results || DEFAULT_MAX_RESULTS;
  const activePage = pageData.offset / maxResultsPerPage + 1 || 1;
  const maxPages = Math.ceil(totalCount / maxResultsPerPage);

  const items = [];

  const setQueryString = (toUrlObject: {
    offset: number;
    max_results: number;
  }) => {
    const url = {
      pathname: router.pathname,
      query: {
        ...router.query,
        pageVars: JSON.stringify(toUrlObject)
      }
    };
    router.push(url, url, {shallow: true});
  };

  const handlePageChange = (pageNumber: number) => {
    const paginationObject = {
      offset: (pageNumber - 1) * maxResultsPerPage,
      max_results: pageData.max_results || DEFAULT_MAX_RESULTS
    };
    setQueryString(paginationObject);
  };

  const handleMaxResultsChange = (numResults: number) => {
    const resultsObject = {
      offset: 0,
      max_results: numResults
    };
    setQueryString(resultsObject);
  };

  // Determines what page numbers to render based on the location of the activePage
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

  // Populate the Pagination items with page numbers & functionality
  for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
    items.push(
      <Pagination.Item
        key={pageNumber}
        active={pageNumber === activePage}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>
    );
  }
  return (
    <>
      <div className="pagination">
        <Dropdown>
          <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
            Results Per Page: <strong>{maxResultsPerPage}</strong>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleMaxResultsChange(20)}>
              20
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMaxResultsChange(50)}>
              50
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMaxResultsChange(100)}>
              100
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {maxPages > 1 && (
          <Pagination style={{marginLeft: '15px'}}>
            <Pagination.First onClick={() => handlePageChange(1)}>
              &lt;&lt; First Page
            </Pagination.First>
            <Pagination.Prev
              onClick={() =>
                activePage > 1 ? handlePageChange(activePage - 1) : null
              }
            />
            {startPage !== 1 && <Pagination.Ellipsis />}
            {items}
            {endPage !== maxPages && <Pagination.Ellipsis />}
            <Pagination.Next
              onClick={() =>
                activePage !== maxPages
                  ? handlePageChange(activePage + 1)
                  : null
              }
            />
            <Pagination.Last onClick={() => handlePageChange(maxPages)}>
              Last Page &gt;&gt;
            </Pagination.Last>
          </Pagination>
        )}
      </div>
      <style jsx>{`
        .pagination {
          display: flex;
        }
      `}</style>
    </>
  );
};

export default FilterableTablePaginationComponent;
