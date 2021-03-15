import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {ProductListContainer_query} from 'ProductListContainer_query.graphql';
import FilterableTableLayout from 'components/FilterableTable/FilterableTable';
import LoadingSpinner from 'components/LoadingSpinner';
import ProductRowItemContainer from './ProductRowItemContainer';
import {
  TableFilter,
  TextFilter,
  DisplayOnlyFilter,
  SortOnlyFilter,
  NumberFilter,
  YesNoFilter,
  EnumFilter,
  NoHeaderFilter
} from 'components/FilterableTable/Filters';
import {CiipProductState} from 'createProductMutation.graphql';

interface Props {
  query: ProductListContainer_query;
}

const filters: TableFilter[] = [
  new TextFilter('Product', 'product_name'),
  new DisplayOnlyFilter('Settings'),
  new SortOnlyFilter('Modified (D/M/Y)', 'date_modified'),
  new NumberFilter('Benchmark', 'current_benchmark'),
  new NumberFilter('Eligibility Threshold', 'current_eligibility_threshold'),
  new YesNoFilter('Allocation of Emissions', 'requires_emission_allocation'),
  new YesNoFilter('CIIP Benchmarked', 'is_ciip_product'),
  new EnumFilter<CiipProductState>('Status', 'product_state', [
    'ARCHIVED',
    'DRAFT',
    'PUBLISHED'
  ]),
  NoHeaderFilter
];

export const ProductList: React.FunctionComponent<Props> = ({query}) => {
  if (!query?.allProducts?.edges) return <LoadingSpinner />;
  const allProducts = query.allProducts.edges;
  const {totalCount} = query.allProducts;

  const body = (
    <tbody>
      {allProducts.map(({node}) => (
        <ProductRowItemContainer key={node.id} product={node} query={query} />
      ))}
    </tbody>
  );
  return (
    <FilterableTableLayout
      body={body}
      filters={filters}
      paginated
      totalCount={totalCount}
    />
  );
};

export default createFragmentContainer(ProductList, {
  query: graphql`
    fragment ProductListContainer_query on Query
    @argumentDefinitions(
      product_name: {type: "String"}
      current_benchmark: {type: "BigFloat"}
      current_eligibility_threshold: {type: "BigFloat"}
      requires_emission_allocation: {type: "Boolean"}
      is_ciip_product: {type: "Boolean"}
      product_state: {type: "CiipProductState"}
      order_by: {type: "[ProductsOrderBy!]"}
      pageSize: {type: "Int"}
      offset: {type: "Int"}
    ) {
      ...ProductRowItemContainer_query
      allProducts(
        first: $pageSize
        offset: $offset
        filter: {
          productName: {includesInsensitive: $product_name}
          currentBenchmark: {equalTo: $current_benchmark}
          currentEligibilityThreshold: {equalTo: $current_eligibility_threshold}
          requiresEmissionAllocation: {equalTo: $requires_emission_allocation}
          isCiipProduct: {equalTo: $is_ciip_product}
          productState: {equalTo: $product_state}
        }
        orderBy: $order_by
      ) @connection(key: "ProductListContainer_allProducts", filters: []) {
        edges {
          node {
            id
            ...ProductRowItemContainer_product
          }
        }
        totalCount
      }
    }
  `
});
