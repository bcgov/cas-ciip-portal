import React, {useEffect} from 'react';
import {Table, Col, Container, Row} from 'react-bootstrap';
import {graphql, createRefetchContainer} from 'react-relay';
import {ProductListContainer_query} from 'ProductListContainer_query.graphql';
// Import {RelayNetworkLayer} from 'react-relay-network-modern/node8';
import LoadingSpinner from '../../components/LoadingSpinner';
import SortableTableHeader from '../../components/SortableTableHeader';
import SearchBox from '../../components/SearchBox';
import ProductRowItemContainer from './ProductRowItemContainer';

interface Props {
  query: ProductListContainer_query;
  orderByField?: string;
  orderByDisplay?: string;
  searchField?: string;
  searchValue?: string;
  direction?: string;
  searchDisplay?: string;
  handleEvent: (...args: any[]) => void;
  relay: any;
}

export const ProductList: React.FunctionComponent<Props> = ({
  query,
  relay,
  orderByField,
  searchField,
  searchValue,
  searchDisplay,
  direction,
  handleEvent
}) => {
  useEffect(() => {
    const refetchVariables = {
      searchField,
      searchValue,
      orderByField,
      direction
    };
    relay.refetch(refetchVariables);
  });

  if (query && query.searchProducts && query.searchProducts.edges) {
    const allProducts = query.searchProducts.edges;
    const tableHeaders = [
      {columnName: 'name', displayName: 'Product'},
      {columnName: 'units', displayName: 'Units'},
      {columnName: 'benchmark', displayName: 'Benchmark'},
      {columnName: 'eligibility_threshold', displayName: 'Elig. Threshold'},
      {columnName: 'state', displayName: 'Status'}
    ];
    const dropdownSortItems = [
      'Product',
      'Units',
      'Benchmark',
      'Elig. Threshold',
      'Status'
    ];

    const displayNameToColumnNameMap = {
      Product: 'name',
      Units: 'units',
      Benchmark: 'benchmark',
      'Elig. Threshold': 'eligibility_threshold',
      Status: 'state'
    };

    return (
      <>
        <Container>
          <Row>
            <Col md={{span: 12, offset: 6}}>
              <SearchBox
                dropdownSortItems={dropdownSortItems}
                handleEvent={handleEvent}
                displayNameToColumnNameMap={displayNameToColumnNameMap}
                searchDisplay={searchDisplay}
              />
            </Col>
          </Row>
        </Container>
        <Table striped hover>
          <thead style={{color: 'white', background: '#003366'}}>
            <tr>
              {tableHeaders.map(header => (
                <SortableTableHeader
                  key={header.columnName}
                  sort={handleEvent}
                  headerVariables={header}
                />
              ))}
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map(({node}) => (
              <ProductRowItemContainer key={node.id} product={node} />
            ))}
          </tbody>
        </Table>
        {/* <Button onClick={loadMore}>Next</Button> */}
      </>
    );
  }

  return <LoadingSpinner />;
};

// @connection on the two edge-returning queries supports downstream mutations
// we need the first two billion edges to force graphql to return the right type
// @see https://relay.dev/docs/en/pagination-container#connection
// https://www.prisma.io/blog/relay-moderns-connection-directive-1ecd8322f5c8
export default createRefetchContainer(
  ProductList,
  {
    query: graphql`
      fragment ProductListContainer_query on Query
        @argumentDefinitions(
          searchField: {type: "String"}
          searchValue: {type: "String"}
          orderByField: {type: "String"}
          direction: {type: "String"}
        ) {
        searchProducts(
          first: 20
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          direction: $direction
        ) @connection(key: "ProductListContainer_searchProducts") {
          edges {
            cursor
            node {
              id
              ...ProductRowItemContainer_product
            }
          }
        }
      }
    `
  },
  graphql`
    query ProductListContainerRefetchQuery(
      $searchField: String
      $searchValue: String
      $orderByField: String
      $direction: String
    ) {
      query {
        ...ProductListContainer_query
          @arguments(
            searchField: $searchField
            searchValue: $searchValue
            orderByField: $orderByField
            direction: $direction
          )
      }
    }
  `
);
