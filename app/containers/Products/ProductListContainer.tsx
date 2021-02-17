import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {ProductListContainer_query} from 'ProductListContainer_query.graphql';
import SearchTableLayout from 'components/SearchTableLayout';
import LoadingSpinner from 'components/LoadingSpinner';
import ProductRowItemContainer from './ProductRowItemContainer';
import {ISearchOption} from 'components/Search/ISearchOption';
import {TextSearchOption} from 'components/Search/TextSearchOption';
import {SortOnlyOption} from 'components/Search/SortOnlyOption';
import {NoHeaderSearchOption} from 'components/Search/NoHeaderSearchOption';
import {DisplayOnlyOption} from 'components/Search/DisplayOnlyOption';
import {NumberSearchOption} from 'components/Search/NumberSearchOption';
import {YesNoSearchOption} from 'components/Search/YesNoSearchOption';
import {EnumSearchOption} from 'components/Search/EnumSearchOption';
import {CiipProductState} from 'createProductMutation.graphql';

interface Props {
  query: ProductListContainer_query;
  orderByField?: string;
  orderByDisplay?: string;
  searchField?: string;
  searchValue?: string;
  direction?: string;
  productCount: number;
  updateProductCount: (...args: any[]) => void;
  handleEvent: (...args: any[]) => void;
}

export const ProductList: React.FunctionComponent<Props> = ({
  query,
  handleEvent,
  productCount,
  updateProductCount
}) => {
  if (query?.searchProducts?.edges) {
    const allProducts = query.searchProducts.edges;

    const searchOptions: ISearchOption[] = [
      new TextSearchOption('Product', 'product_name'),
      new DisplayOnlyOption('Settings'),
      new SortOnlyOption('Modified (D/M/Y)', 'date_modified'),
      new NumberSearchOption('Benchmark', 'benchmark'),
      new NumberSearchOption('Eligibility Threshold', 'eligibility_threshold'),
      new YesNoSearchOption(
        'Allocation of Emissions',
        'requires_emission_allocation'
      ),
      new TextSearchOption('CIIP Benchmarked', 'is_ciip_product'),
      new EnumSearchOption<CiipProductState>('Status', 'product_state', [
        'ARCHIVED',
        'DRAFT',
        'PUBLISHED'
      ]),
      NoHeaderSearchOption
    ];
    const body = (
      <tbody>
        {allProducts.map(({node}) => (
          <ProductRowItemContainer
            key={node.id}
            product={node}
            query={query}
            updateProductCount={updateProductCount}
            productCount={productCount}
          />
        ))}
      </tbody>
    );
    return (
      <SearchTableLayout
        body={body}
        searchOptions={searchOptions}
        handleEvent={handleEvent}
      />
    );
  }

  return <LoadingSpinner />;
};

// @connection on the two edge-returning queries supports downstream mutations
// we need the first two billion edges to force graphql to return the right type
// @see https://relay.dev/docs/en/pagination-container#connection
// https://www.prisma.io/blog/relay-moderns-connection-directive-1ecd8322f5c8
export default createFragmentContainer(ProductList, {
  query: graphql`
    fragment ProductListContainer_query on Query
    @argumentDefinitions(
      searchField: {type: "String"}
      searchValue: {type: "String"}
      orderByField: {type: "String"}
      direction: {type: "String"}
      productCount: {type: "Int"}
    ) {
      ...ProductRowItemContainer_query
      searchProducts(
        first: 2147483647
        searchField: $searchField
        searchValue: $searchValue
        orderByField: $orderByField
        direction: $direction
      ) @connection(key: "ProductListContainer_searchProducts") {
        edges {
          node {
            id
            ...ProductRowItemContainer_product
          }
        }
      }
      # TODO: This is here to trigger a refactor as updating the edge / running the query in the mutation is not triggering a refresh
      # Find a way to not pull the totalcount?
      allProducts(first: $productCount) {
        totalCount
      }
    }
  `
});
