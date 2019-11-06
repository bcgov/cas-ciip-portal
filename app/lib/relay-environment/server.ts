import {
  RelayNetworkLayer,
  urlMiddleware
} from 'react-relay-network-modern/node8';
import {Environment, RecordSource, Store} from 'relay-runtime';

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
            url: _ =>
              'http://localhost:3004/graphql' ||
              'http://localhost:3004/graphql/batch'
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
      // @ts-ignore
      network: new RelayNetworkLayer([
        urlMiddleware({
          // TODOx: set $RELAY_ENDPOINT
          // url: req => process.env.RELAY_ENDPOINT
          url: _ =>
            'http://localhost:3004/graphql' ||
            'http://localhost:3004/graphql/batch'
        })
      ])
    });
  }
};
