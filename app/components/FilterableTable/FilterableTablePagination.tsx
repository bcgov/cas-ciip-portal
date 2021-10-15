import React from "react";
import { Pagination, Dropdown } from "react-bootstrap";

interface Props {
  /**
   * The total number of items in all of the pages
   */
  totalCount: number;
  /**
   * Defaults to DEFAULT_PAGE_SIZE.
   */
  pageSize?: number;
  /**
   * The number of items to skip to get to the current page. Defaults to 0
   */
  offset?: number;
  onOffsetChange: (offset: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export const DEFAULT_PAGE_SIZE = 20;

const PAGE_SIZE_OPTIONS = [20, 50, 100];

const FilterableTablePagination: React.FunctionComponent<Props> = ({
  totalCount,
  pageSize = DEFAULT_PAGE_SIZE,
  offset = 0,
  onOffsetChange,
  onPageSizeChange,
}) => {
  const activePage = Math.floor(offset / pageSize + 1) || 1;
  const maxPages = Math.ceil(totalCount / pageSize);

  const items = [];

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

  const handlePageChange = (pageNumber: number) => {
    onOffsetChange((pageNumber - 1) * pageSize);
  };

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
            Items Per Page: <strong>{pageSize}</strong>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {PAGE_SIZE_OPTIONS.map((option) => (
              <Dropdown.Item
                key={option}
                onClick={() => onPageSizeChange(option)}
              >
                {option}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {maxPages > 1 && (
          <Pagination style={{ marginLeft: "15px" }}>
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
        :global(.pagination a.page-link) {
          color: #036;
        }
        :global(.pagination .page-item.active .page-link) {
          background-color: #036;
          border-color: #036;
        }
      `}</style>
    </>
  );
};

export default FilterableTablePagination;
