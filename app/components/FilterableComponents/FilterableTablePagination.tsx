import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Pagination} from 'react-bootstrap';

interface Props {
  totalCount: number;
  maxResultsPerPage: number;
  firstEdgeCursor: string;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
export const FilterableTablePaginationComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {hasNextPage, hasPreviousPage} = props.pageInfo;
  const {totalCount, firstEdgeCursor, maxResultsPerPage} = props;
  const router = useRouter();
  const [activePage, setActivePage] = useState(1);

  const maxPages = Math.ceil(totalCount / maxResultsPerPage);

  const items = [];

  const paginate = (pageNumber: number) => {
    const paginationObject = {
      after_cursor: pageNumber > 1 ? firstEdgeCursor : null,
      offset: pageNumber > 1 ? (pageNumber - 1) * maxResultsPerPage - 1 : 0
    };
    const url = {
      pathname: router.pathname,
      query: {
        ...router.query,
        pageVars: JSON.stringify(paginationObject)
      }
    };
    router.replace(url, url, {shallow: true});
  };

  const paginateByNumber = (pageNumber) => {
    setActivePage(pageNumber);
    paginate(pageNumber);
  };

  const forwardOnePage = () => {
    setActivePage(activePage + 1);
    paginate(activePage + 1);
  };

  const backOnePage = () => {
    setActivePage(activePage - 1);
    paginate(activePage - 1);
  };

  const firstPage = () => {
    setActivePage(1);
    paginate(1);
  };

  const lastPage = () => {
    setActivePage(maxPages);
    paginate(maxPages);
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
        onClick={() => paginateByNumber(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Pagination>
        <Pagination.First onClick={() => firstPage()} />
        <Pagination.Prev
          onClick={() => (hasPreviousPage ? backOnePage() : null)}
        />
        {startPage !== 1 && <Pagination.Ellipsis />}
        {items}
        {endPage !== maxPages && <Pagination.Ellipsis />}
        <Pagination.Next
          onClick={() => (hasNextPage ? forwardOnePage() : null)}
        />
        <Pagination.Last onClick={() => lastPage()} />
      </Pagination>
    </>
  );
};

export default FilterableTablePaginationComponent;
