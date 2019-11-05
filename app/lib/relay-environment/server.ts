import {
  RelayNetworkLayer,
  urlMiddleware
} from 'react-relay-network-modern/node8';
import {Network, Environment, RecordSource, Store} from 'relay-runtime';

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
  createEnvironment: relayData => {
    const source = new RecordSource();
    const store = new Store(source);
    return new Environment({
      store,
      network: Network.create(() => {
        if (!relayData) return;
        return relayData[0][1];
      })
    });
  }
};
