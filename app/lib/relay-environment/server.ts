import {
  RelayNetworkLayer,
  urlMiddleware
} from 'react-relay-network-modern/node8';
import {Network, Environment, RecordSource, Store} from 'relay-runtime';

async function fetchQuery(operation, variables) {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables
    })
  });

  return response.json();
}

export default {
  initEnvironment: () => {
    const source = new RecordSource();
    const store = new Store(source);

    return {
      environment: new Environment({
        store,
        // @ts-ignore
        network: new RelayNetworkLayer([
          urlMiddleware({
            // TODOx: set $RELAY_ENDPOINT
            // url: req => process.env.RELAY_ENDPOINT
            url: _ => 'http://localhost:3004/graphql'
          })
        ])
      })
    };
  },
  createEnvironment: _ => {
    const source = new RecordSource();
    const store = new Store(source);
    return new Environment({
      store,
      network: Network.create(fetchQuery)
    });
  }
};
