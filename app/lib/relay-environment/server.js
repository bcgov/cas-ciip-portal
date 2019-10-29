import {
  RelayNetworkLayer,
  urlMiddleware
} from 'react-relay-network-modern/node8';
import RelaySSR from 'react-relay-network-modern-ssr/node8/server';
import {Network, Environment, RecordSource, Store} from 'relay-runtime';

export default {
  initEnvironment: () => {
    const source = new RecordSource();
    const store = new Store(source);
    const relaySSR = new RelaySSR();

    return {
      relaySSR,
      environment: new Environment({
        store,
        network: new RelayNetworkLayer([
          urlMiddleware({
            // TODO: set $RELAY_ENDPOINT
            // url: req => process.env.RELAY_ENDPOINT
            url: _ => 'http://localhost:3004/graphql'
          }),
          relaySSR.getMiddleware()
        ])
      })
    };
  },
  createEnvironment: (relayData, key) => {
    const source = new RecordSource();
    const store = new Store(source);

    return new Environment({
      store,
      network: Network.create(() => {
        if (!relayData) return;
        const data = relayData.find(([dataKey]) => dataKey === key);
        if (!data) return;
        return data[1];
      })
    });
  }
};
