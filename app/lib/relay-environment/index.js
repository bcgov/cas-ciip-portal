// The relay SSR uses `fetch` under the hood to request data.
import 'isomorphic-fetch';

export const {initEnvironment, createEnvironment} = (typeof window ===
'undefined'
  ? require('./server')
  : require('./client')
).default;
