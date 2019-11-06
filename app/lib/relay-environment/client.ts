import {Environment, RecordSource, Store} from 'relay-runtime';
import {
  RelayNetworkLayer,
  urlMiddleware,
  batchMiddleware,
  // LegacyBatchMiddleware,
  cacheMiddleware
  // LoggerMiddleware
} from 'react-relay-network-modern/node8';

const source = new RecordSource();
const store = new Store(source);

const oneMinute = 60 * 1000;

let storeEnvironment = null;

export default {
  createEnvironment: _ => {
    storeEnvironment = new Environment({
      // @ts-ignore
      network: new RelayNetworkLayer([
        cacheMiddleware({
          size: 100, // Max 100 requests
          ttl: oneMinute
        }),
        urlMiddleware({
          url: async _ => Promise.resolve('/graphql')
        }),
        batchMiddleware({
          batchUrl: async _ => Promise.resolve('/graphql'),
          batchTimeout: 10,
          allowMutations: true
        })
        // LoggerMiddleware(),
      ]),
      store
    });

    return storeEnvironment;
  }
};
