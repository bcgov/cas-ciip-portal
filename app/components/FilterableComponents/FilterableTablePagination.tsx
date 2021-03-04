import React from 'react';
import {useRouter} from 'next/router';
import {Pagination} from 'react-bootstrap';

interface Props {
  totalCount: number;
}

export const DEFAULT_MAX_RESULTS = 20;

const FilterableTablePaginationComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {totalCount} = props;
  const router = useRouter();

  const getPageData = () => {
    try {
      return JSON.parse(router.query.pageVars?.toString());
    } catch (e) {
      return {};
    }
  };

  const pageData = router.query.pageVars ? getPageData() : {};

  const maxResultsPerPage = pageData?.maxResultsPerPage || DEFAULT_MAX_RESULTS;
  const activePage = pageData?.offset / maxResultsPerPage + 1 || 1;
  const maxPages = Math.ceil(totalCount / maxResultsPerPage);

  const items = [];

  const handlePageChange = (pageNumber: number) => {
    const paginationObject = {
      offset: (pageNumber - 1) * maxResultsPerPage
    };
    const url = {
      pathname: router.pathname,
      query: {
        ...router.query,
        pageVars: JSON.stringify(paginationObject)
      }
    };
    router.push(url, url, {shallow: true});
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
  if (maxPages > 1)
    return (
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
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
            activePage !== maxPages ? handlePageChange(activePage + 1) : null
          }
        />
        <Pagination.Last onClick={() => handlePageChange(maxPages)} />
      </Pagination>
    );
  return null;
};

export default FilterableTablePaginationComponent;
