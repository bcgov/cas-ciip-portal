import {
  Environment,
  RecordSource,
  Store,
  QueryResponseCache,
  Network
} from 'relay-runtime';

const source = new RecordSource();
const store = new Store(source);

const oneMinute = 60 * 1000;
const cache = new QueryResponseCache({size: 250, ttl: oneMinute});

async function fetchQuery(operation, variables, cacheConfig) {
  const queryID = operation.text;
  const isMutation = operation.operationKind === 'mutation';
  const isQuery = operation.operationKind === 'query';
  const forceFetch = cacheConfig && cacheConfig.force;

  // Try to get data from cache on queries
  const fromCache = cache.get(queryID, variables);
  if (isQuery && fromCache !== null && !forceFetch) {
    return fromCache;
  }

  // Otherwise, fetch data from server
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  });
  const json = await response.json();

  if (isQuery && json) {
    cache.set(queryID, variables, json);
  }

  // Clear cache on mutations
  if (isMutation) {
    cache.clear();
  }

  return json;
}

let storeEnvironment = null;

export default {
  createEnvironment: _ => {
    storeEnvironment = new Environment({
      network: Network.create(fetchQuery),
      store
    });

    return storeEnvironment;
  }
};
