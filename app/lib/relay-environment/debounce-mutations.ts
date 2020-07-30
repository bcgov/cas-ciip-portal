import {
  Middleware,
  RelayNetworkLayerRequest,
  RelayNetworkLayerResponse
} from 'react-relay-network-modern/node8';
import {CacheConfigWithDebounce} from 'next-env';

const debouncedMutationsTimeoutIds = new Map<string, number>();

const debounceMutationMiddleware = (timeout = 1000): Middleware => {
  return (next) => async (req) => {
    if (!(req instanceof RelayNetworkLayerRequest) || !req.isMutation()) {
      return next(req);
    }

    const {debounceKey} = (req.cacheConfig as CacheConfigWithDebounce) || {};
    if (!debounceKey) {
      return next(req);
    }

    const debounced = async () => {
      return new Promise<RelayNetworkLayerResponse>((resolve) => {
        const timerId = debouncedMutationsTimeoutIds.get(debounceKey);
        if (timerId) {
          window.clearTimeout(timerId);
        }

        debouncedMutationsTimeoutIds.set(
          debounceKey,
          window.setTimeout(() => {
            debouncedMutationsTimeoutIds.delete(debounceKey);
            resolve(next(req));
          }, timeout)
        );
      });
    };

    return debounced();
  };
};

export default debounceMutationMiddleware;
