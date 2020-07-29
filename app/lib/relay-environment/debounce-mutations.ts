import {
  Middleware,
  RelayNetworkLayerRequest,
  RelayNetworkLayerResponse
} from 'react-relay-network-modern/node8';

const debouncedMutationNameTimeoutIds = new Map<string, number>();

const debounceMutationMiddleware = (timeout = 1000): Middleware => {
  return (next) => async (req) => {
    if (!(req instanceof RelayNetworkLayerRequest) || !req.isMutation()) {
      return next(req);
    }

    if (!req.cacheConfig?.debounce) {
      return next(req);
    }

    const debounced = async () => {
      return new Promise<RelayNetworkLayerResponse>((resolve) => {
        const {name} = req.operation;
        const timerId = debouncedMutationNameTimeoutIds.get(name);
        if (timerId) {
          window.clearTimeout(timerId);
        }

        debouncedMutationNameTimeoutIds.set(
          name,
          window.setTimeout(() => {
            debouncedMutationNameTimeoutIds.delete(name);
            resolve(next(req));
          }, timeout)
        );
      });
    };

    return debounced();
  };
};

export default debounceMutationMiddleware;
