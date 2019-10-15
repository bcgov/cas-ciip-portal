import React from "react";
import { QueryRenderer } from "react-relay";
import { storiesOf } from "@storybook/react";
import {createMockEnvironment} from 'relay-test-utils';
import Admin from "../../containers/pageContainers/Admin";

const environment=createMockEnvironment();

const query = graphql`
query AdminTestQuery {
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
        console.log(props)
        return <Admin {...props} query={query}/>;
      }
      console.log(props)
      return <Admin {...props} query={{active:{
      edges:
        [{node: {
          id: 1, name:'buddy', state: 'active', benchmarksByProductId: {edges: []}
        }}]}
      , archived: {
        edges:
          [{node: {
            id: 2, name:'holly', state: 'archived', benchmarksByProductId: {edges: []}
          }}]}}}/>;
      return null;
    }}
  />
);
 
storiesOf("containers/pageContainers/Admin", module)
  .add("Render Admin page", () => {
    return renderStory(query, environment);
  });
  