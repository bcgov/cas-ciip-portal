import 'isomorphic-fetch';

import {
  RelayNetworkLayer,
  urlMiddleware
} from 'react-relay-network-modern/node8';
import {Environment, RecordSource, Store} from 'relay-runtime';
import type RelayServerSSR from 'react-relay-network-modern-ssr/node8/server';

export default (relayServerSSR: RelayServerSSR) => {
  const source = new RecordSource();
  const store = new Store(source);

  return new Environment({
    store,
    network: new RelayNetworkLayer([
      relayServerSSR.getMiddleware(),
      urlMiddleware({
        // TODO: set $RELAY_ENDPOINT
        // url: req => process.env.RELAY_ENDPOINT
        url: () => 'http://localhost:3004/grapqhl'
      })
    ])
  });
};
