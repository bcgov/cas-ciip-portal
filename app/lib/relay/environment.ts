import {Environment, RecordSource, Store} from 'relay-runtime';
import {
  RelayNetworkLayer,
  urlMiddleware,
  batchMiddleware,
  cacheMiddleware
} from 'react-relay-network-modern/node8';
//import RelayClientSSR from 'react-relay-network-modern-ssr/node8/client';
import debounceMutationMiddleware from './debounce-mutations';
import {RecordMap} from 'relay-runtime/lib/store/RelayStoreTypes';

const oneMinute = 60 * 1000;

let storeEnvironment = null;

const createEnvironment = (records?: RecordMap) => {
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
    store: new Store(new RecordSource(records))
  });

  return storeEnvironment;
};

export default createEnvironment;
