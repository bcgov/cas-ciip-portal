import React from "react";
import { QueryRenderer } from "react-relay";
import { storiesOf } from "@storybook/react";
import {createMockEnvironment} from 'relay-test-utils';
import ProductListContainer from "../../containers/Products/ProductListContainer";

const environment=createMockEnvironment();

const query = graphql`
query ProductListMockedQuery {
  query {
    ...ProductListContainer_query
  }
}
`;

const renderStory = (query, environment, variables = {}) => (
  <QueryRenderer
    environment={environment}
    query={query}
    variables={variables}
    render={({ props, error }) => {
      if (error) {
        console.error(error);
      } else if (props) {
        return <ProductListContainer {...props} />;
      }
      return null;
    }}
  />
);
 
storiesOf("containers/Products/ProductList", module)
  .add("Render Product List", () => {
    return renderStory(query, environment);
  });