import React, {Component} from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import initEnvironment from '../../lib/createRelayEnvironment';
import ProductRowItem from './ProductRowItem';

const environment = initEnvironment();

class ProductList extends Component {
  listProducts = ({error, props}) => {
    console.log('ProductList.js > listProducts()', props, error);
    const productList = [];
    const archivedList = [];
    if (props) {
      const allProducts = props.allProducts.nodes;
      allProducts.forEach(product => {
        if (product.state === 'archived') {
          archivedList.push(<ProductRowItem product={product} />);
        } else if (product.state !== 'deprecated') {
          productList.push(<ProductRowItem product={product} />);
        }
      });
    }

    return productList.concat(archivedList);
  };

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ProductListQuery {
            allProducts {
              nodes {
                rowId
                name
                description
                state
                parent
                benchmarksByProductId {
                  nodes {
                    rowId
                    benchmark
                    eligibilityThreshold
                    startDate
                    endDate
                    deletedAt
                    deletedBy
                  }
                }
              }
            }
          }
        `}
        render={this.listProducts}
      />
    );
  }
}

export default ProductList;
