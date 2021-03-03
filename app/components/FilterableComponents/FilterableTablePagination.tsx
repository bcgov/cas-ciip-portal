import React from 'react';
import {Button} from 'react-bootstrap';
import {useRouter} from 'next/router';

interface Props {
  pageInfo: {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
export const FilterableTablePaginationComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {startCursor, endCursor, hasNextPage, hasPreviousPage} = props.pageInfo;
  const router = useRouter();

  const paginate = (forward: boolean, cursor: string) => {
    const paginationObject = forward
      ? {
          after_cursor: cursor,
          before_cursor: null,
          num_forward: 10,
          num_back: null
        }
      : {
          after_cursor: null,
          before_cursor: cursor,
          num_forward: null,
          num_back: 10
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

  return (
    <>
      {hasPreviousPage && (
        <Button
          variant="outline-primary"
          style={{marginRight: '5px'}}
          onClick={() => paginate(false, startCursor)}
        >
          &lt; Back
        </Button>
      )}
      {hasNextPage && (
        <Button
          variant="outline-primary"
          onClick={() => paginate(true, endCursor)}
        >
          Forward &gt;
        </Button>
      )}
    </>
  );
};

export default FilterableTablePaginationComponent;
