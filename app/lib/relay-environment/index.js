/**
 * We need to polyfill `fetch()` for react-relay-network-modern
 * in both the server and client environments.
 * @see https://github.com/relay-tools/react-relay-network-modern
 * @see https://fetch.spec.whatwg.org/
 **/
import 'isomorphic-fetch';
// ^this has side-effects since it's a global polyfill!
// TODO: does this conflict with Next.js use of `unfetch` internally?

export const {initEnvironment, createEnvironment} = (typeof window ===
'undefined'
  ? require('./server')
  : require('./client')
).default;
