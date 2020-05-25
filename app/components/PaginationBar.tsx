import React from 'react';
import {Pagination} from 'react-bootstrap';

interface Props {
  setOffset: (...args: any[]) => void;
  setActivePage: (...args: any[]) => void;
  offsetValue: number;
  maxPages: number;
  activePage: number;
  maxResultsPerPage: number;
}
export const PaginationBarComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {
    setOffset,
    setActivePage,
    offsetValue,
    maxPages,
    activePage,
    maxResultsPerPage
  } = props;

  const previousTenPagination = () => {
    if (offsetValue > 0) {
      setOffset(offsetValue - maxResultsPerPage);
      setActivePage(activePage - 1);
    }
  };

  const nextTenPagination = () => {
    if (activePage !== maxPages) {
      setOffset(offsetValue + maxResultsPerPage);
      setActivePage(activePage + 1);
    }
  };

  const items = [];
  const handlePaginationByPageNumber = (pageNumber: number) => {
    setOffset((pageNumber - 1) * maxResultsPerPage);
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

  return (
    <Pagination>
      <Pagination.First onClick={() => handlePaginationByPageNumber(1)} />
      <Pagination.Prev onClick={previousTenPagination} />
      {startPage !== 1 && <Pagination.Ellipsis />}
      <Pagination>{items}</Pagination>
      {endPage !== maxPages && <Pagination.Ellipsis />}
      <Pagination.Next onClick={nextTenPagination} />
      <Pagination.Last onClick={() => handlePaginationByPageNumber(maxPages)} />
    </Pagination>
  );
};

export default PaginationBarComponent;
