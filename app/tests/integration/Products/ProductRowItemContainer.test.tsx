import React from 'react';
import {QueryRenderer, graphql} from 'react-relay';
import {createMockEnvironment, MockPayloadGenerator} from 'relay-test-utils';
import {ProductRowItemContainerTestQuery} from 'ProductRowItemContainerTestQuery.graphql';
import {create} from 'react-test-renderer';
import {mockRandom} from 'jest-mock-random';
import ProductRowItemContainer from 'containers/Products/ProductRowItemContainer';

describe('ProductListContainer', () => {
  beforeEach(() => {
    // Mock Math.random() to be deterministic.
    // This is needed by react-jsonschema-form's RadioWidget and by json-schema-faker
    mockRandom([0.1, 0.2, 0.3, 0.4, 0.5]);
  });

  const environment = createMockEnvironment();
  const TestRenderer = () => (
    <QueryRenderer<ProductRowItemContainerTestQuery>
      environment={environment}
      query={graphql`
        query ProductRowItemContainerTestQuery @relay_test_operation {
          product: node(id: "abc") {
            ...ProductRowItemContainer_product
          }
        }
      `}
      variables={{}}
      render={({error, props}) => {
        if (props) {
          return <ProductRowItemContainer product={props.product} />;
        }

        if (error) {
          return error.message;
        }

        return 'Loading...';
      }}
    />
  );

  it('should match the snapshot with the Product List Container', async () => {
    const renderer = create(<TestRenderer />);
    environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        Query() {
          return {
            product: {
              id: 'abc',
              rowId: 1,
              name: 'boop',
              description: 'boopy',
              state: 'active',
              parent: [null],
              units: 'm3',
              benchmarksByProductId: {
                edges: [
                  {
                    node: {
                      id: 'abc',
                      rowId: 1,
                      benchmark: 50,
                      eligibilityThreshold: 500,
                      startDate: '2019-01-01T00:00:00',
                      endDate: '2020-02-02T00:00:00',
                      deletedAt: null
                    }
                  }
                ]
              }
            }
          };
        }
      })
    );
    expect(renderer).toMatchSnapshot();
  });
});
