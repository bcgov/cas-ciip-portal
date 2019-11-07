import {
  RelayNetworkLayer,
  urlMiddleware
} from 'react-relay-network-modern/node8';
import {Environment, RecordSource, Store} from 'relay-runtime';

export default {
  // TODO: Not currently used, as SSR is broken. Leaving it in for now.
  initEnvironment: () => {
    const source = new RecordSource();
    const store = new Store(source);

    return {
      environment: new Environment({
        store,
        // @ts-ignore
        network: new RelayNetworkLayer([
          urlMiddleware({
            // TODO: set $RELAY_ENDPOINT
            // url: req => process.env.RELAY_ENDPOINT
            url: () => 'http://localhost:3004/grapqhl'
          })
        ])
      })
    };
  },
  createEnvironment: () => {
    const source = new RecordSource();
    const store = new Store(source);
    return new Environment({
      store,
      // @ts-ignore
      network: new RelayNetworkLayer([
        urlMiddleware({
          // TODO: set $RELAY_ENDPOINT
          // url: req => process.env.RELAY_ENDPOINT
          url: () => 'http://localhost:3004/grapqhl'
        })
      ])
    });
  }
};
