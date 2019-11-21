import {
  Middleware,
  RelayNetworkLayerRequestBatch
} from 'react-relay-network-modern/node8';

const clientMutationIdsToDedupe = new Map<string, string[]>();

export const dedupeMutation = (
  mutationName: string,
  clientMutationId: string
) => {
  if (!clientMutationIdsToDedupe.has(mutationName))
    clientMutationIdsToDedupe.set(mutationName, []);
  clientMutationIdsToDedupe.get(mutationName).push(clientMutationId);
};

const dedupeMutationMiddleware = (): Middleware => {
  return next => async req => {
    if (!(req instanceof RelayNetworkLayerRequestBatch)) {
      return next(req);
    }

    let body = JSON.parse(req.fetchOpts.body as string);

    req.requests = req.requests.filter(request => {
      if (!request.isMutation()) {
        return true;
      }

      const clientMutationIds = clientMutationIdsToDedupe.get(
        request.operation.name
      );
      if (!clientMutationIds) {
        console.log(
          'no clientMutationIds',
          clientMutationIdsToDedupe,
          request.operation.name
        );
        return true;
      }

      const index = clientMutationIds.indexOf(
        request.variables.input.clientMutationId
      );
      if (index === -1 || index === clientMutationIds.length - 1) {
        console.log('index', index);
        return true;
      }

      body = body.filter(
        r =>
          r.variables.input.clientMutationId !==
          request.variables.input.clientMutationId
      );
      return false;
    });

    req.fetchOpts.body = JSON.stringify(body);
    console.log(req);
    return next(req);
  };
};

export default dedupeMutationMiddleware;
