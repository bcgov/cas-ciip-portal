import {
  Middleware,
  RelayNetworkLayerRequest,
  RelayNetworkLayerResponse,
} from "react-relay-network-modern/node8";
import type { CacheConfigWithDebounce } from "types";

let debouncedMutation: {
  debounceKey: string;
  debouncedFn: () => void;
  timeoutId: number;
} = null;

const debounceMutationMiddleware = (timeout = 250): Middleware => {
  return (next) => async (req) => {
    if (!(req instanceof RelayNetworkLayerRequest) || !req.isMutation()) {
      if (debouncedMutation) {
        debouncedMutation.debouncedFn();
      }

      return next(req);
    }

    const { debounceKey } = (req.cacheConfig as CacheConfigWithDebounce) || {};
    if (!debounceKey) {
      if (debouncedMutation) {
        debouncedMutation.debouncedFn();
      }

      return next(req);
    }

    if (debouncedMutation && debouncedMutation.debounceKey !== debounceKey) {
      window.clearTimeout(debouncedMutation.timeoutId);
      debouncedMutation.debouncedFn();
    }

    const debounced = async () => {
      return new Promise<RelayNetworkLayerResponse>((resolve) => {
        if (
          debouncedMutation &&
          debouncedMutation.debounceKey === debounceKey
        ) {
          window.clearTimeout(debouncedMutation.timeoutId);
        }

        const debouncedFn = () => {
          window.clearTimeout(debouncedMutation.timeoutId);
          // Unset debouncedMutation to ensure it does not get called again with the next network request
          debouncedMutation = null;
          resolve(next(req));
        };

        debouncedMutation = {
          debounceKey,
          debouncedFn,
          timeoutId: window.setTimeout(debouncedFn, timeout),
        };
      });
    };

    return debounced();
  };
};

export default debounceMutationMiddleware;
