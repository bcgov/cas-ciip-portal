import React from 'react';
import {useRouter} from 'next/router';
import {Pagination} from 'react-bootstrap';

interface Props {
  totalCount: number;
  maxResultsPerPage: number;
}

export const FilterableTablePaginationComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {totalCount, maxResultsPerPage} = props;
  const router = useRouter();
  const maxPages = Math.ceil(totalCount / maxResultsPerPage);

  // Set the activePage by query string value. If no value exists, the activePage is the first page
  let activePage = 1;
  if (router?.query?.pageVars)
    activePage =
      JSON.parse(router?.query?.pageVars?.toString())?.activePage || 1;

  const items = [];

  const paginate = (pageNumber: number) => {
    const paginationObject = {
      offset: (pageNumber - 1) * maxResultsPerPage,
      activePage: pageNumber
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
        onClick={() => paginate(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>
    );
  }
  if (maxPages > 1)
    return (
      <Pagination>
        <Pagination.First onClick={() => paginate(1)} />
        <Pagination.Prev
          onClick={() => (activePage > 1 ? paginate(activePage - 1) : null)}
        />
        {startPage !== 1 && <Pagination.Ellipsis />}
        {items}
        {endPage !== maxPages && <Pagination.Ellipsis />}
        <Pagination.Next
          onClick={() =>
            activePage !== maxPages ? paginate(activePage + 1) : null
          }
        />
        <Pagination.Last onClick={() => paginate(maxPages)} />
      </Pagination>
    );
  return null;
};

export default FilterableTablePaginationComponent;
