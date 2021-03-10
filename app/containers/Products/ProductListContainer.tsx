import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {ProductListContainer_query} from 'ProductListContainer_query.graphql';
import FilterableTableLayout from 'components/FilterableComponents/FilterableTableLayout';
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
import FilterableTablePagination from 'components/FilterableComponents/FilterableTablePagination';

interface Props {
  query: ProductListContainer_query;
}

export const ProductList: React.FunctionComponent<Props> = ({query}) => {
  if (!query?.allProducts?.edges) return <LoadingSpinner />;
  const allProducts = query.allProducts.edges;
  const {totalCount} = query.allProducts;

  const searchOptions: ISearchOption[] = [
    new TextSearchOption('Product', 'product_name'),
    new DisplayOnlyOption('Settings'),
    new SortOnlyOption('Modified (D/M/Y)', 'date_modified'),
    new NumberSearchOption('Benchmark', 'current_benchmark'),
    new NumberSearchOption(
      'Eligibility Threshold',
      'current_eligibility_threshold'
    ),
    new YesNoSearchOption(
      'Allocation of Emissions',
      'requires_emission_allocation'
    ),
    new YesNoSearchOption('CIIP Benchmarked', 'is_ciip_product'),
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
        <ProductRowItemContainer key={node.id} product={node} query={query} />
      ))}
    </tbody>
  );
  return (
    <>
      <FilterableTableLayout body={body} searchOptions={searchOptions} />
      <FilterableTablePagination totalCount={totalCount} />
    </>
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
      max_results: {type: "Int"}
      offset: {type: "Int"}
    ) {
      ...ProductRowItemContainer_query
      allProducts(
        first: $max_results
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
