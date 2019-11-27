import {
  Middleware,
  RelayNetworkLayerRequest,
  RelayNetworkLayerResponse
} from 'react-relay-network-modern/node8';

const debouncedMutationNameTimeoutIds = new Map<string, number>();
const clientMutationIdMutationNameMap = new Map<string, string>();

export const debounceMutation = (
  mutationName: string,
  clientMutationId: string
) => {
  clientMutationIdMutationNameMap.set(clientMutationId, mutationName);
};

const debounceMutationMiddleware = (): Middleware => {
  return next => async req => {
    if (!(req instanceof RelayNetworkLayerRequest) || !req.isMutation()) {
      return next(req);
    }

    const {clientMutationId} = req.variables.input;
    const mutationName = clientMutationIdMutationNameMap.get(clientMutationId);
    console.log(mutationName);
    if (!mutationName) {
      return next(req);
    }

    const debounced = async () => {
      return new Promise<RelayNetworkLayerResponse>(resolve => {
        const timerId = debouncedMutationNameTimeoutIds.get(mutationName);
        if (timerId) {
          window.clearTimeout(timerId);
        }

        debouncedMutationNameTimeoutIds.set(
          mutationName,
          window.setTimeout(() => {
            debouncedMutationNameTimeoutIds.delete(mutationName);
            clientMutationIdMutationNameMap.delete(clientMutationId);
            console.log('resolve!!!');
            resolve(next(req));
          }, 1000)
        );
      });
    };

    return debounced();
  };
};

export default debounceMutationMiddleware;
