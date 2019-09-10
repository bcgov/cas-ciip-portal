import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import fetch from 'isomorphic-unfetch';

let relayEnvironment = null;

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(operation, variables, cacheConfig, uploadables) {
  // Point client to same host as the graphql server
  const relayServer =
    typeof window !== 'undefined' ? '' : process.env.RELAY_SERVER;
  // Return fetch(`${relayServer}/graphql`, {
  return fetch('http://localhost:3004/graphql', {
    // Todo: import from constants
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, // Todo: Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables
    })
  }).then(response => {
    // Console.log('CreateRelayEnvironment.js > fetchQuery() x', response.json());
    return response.json();
  });
}

export default function initEnvironment({records = {}} = {}) {
  // Create a network layer from the fetch function
  const network = Network.create(fetchQuery);
  const store = new Store(new RecordSource(records));

  // Make sure to create a new Relay environment for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return new Environment({
      network,
      store
    });
  }

  // Reuse Relay environment on client-side
  if (!relayEnvironment) {
    relayEnvironment = new Environment({
      network,
      store
    });
  }

  return relayEnvironment;
}
