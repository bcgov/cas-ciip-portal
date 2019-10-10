// TODO(Dylan): Do we need this import?
import 'isomorphic-fetch';

export const {initEnvironment, createEnvironment} = (typeof window ===
'undefined'
  ? require('./server')
  : require('./client')
).default;
