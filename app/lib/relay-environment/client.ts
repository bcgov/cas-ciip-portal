import {Environment, RecordSource, Store} from 'relay-runtime';
import {
  RelayNetworkLayer,
  urlMiddleware,
  batchMiddleware,
  cacheMiddleware
} from 'react-relay-network-modern/node8';
import debounceMutationMiddleware from './debounce-mutations';

const source = new RecordSource();
const store = new Store(source);

const oneMinute = 60 * 1000;

let storeEnvironment = null;

export default {
  createEnvironment: (_) => {
    storeEnvironment = new Environment({
      // @ts-ignore
      network: new RelayNetworkLayer([
        cacheMiddleware({
          size: 100, // Max 100 requests
          // Number in milliseconds, how long records stay valid in cache (default: 900000, 15 minutes).
          // TODO: is one minute enough? How long should records stay valid?
          ttl: oneMinute
        }),
        urlMiddleware({
          url: async () => Promise.resolve('/graphql')
        }),
        debounceMutationMiddleware(),
        batchMiddleware({
          batchUrl: async () => Promise.resolve('/graphql'),
          batchTimeout: 10,
          allowMutations: true
        })
      ]),
      store
    });

    return storeEnvironment;
  }
};
