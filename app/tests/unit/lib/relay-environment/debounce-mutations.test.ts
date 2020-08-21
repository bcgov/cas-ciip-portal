import debounceMutationMiddleware from 'lib/relay-environment/debounce-mutations';
import {RelayNetworkLayerRequest} from 'react-relay-network-modern/node8';
jest.mock('react-relay-network-modern/node8');

describe('The debounceMutation middleware', () => {
  it('should debounce mutations with the same debounceKey', async () => {
    const middleware = debounceMutationMiddleware(100);

    const nextMiddleware = jest.fn((mutation) => mutation.process());
    const middlewareNextFn = middleware(nextMiddleware);

    const mutationA: any = new RelayNetworkLayerRequest();
    mutationA.isMutation = () => true;
    mutationA.cacheConfig = {
      debounceKey: '42'
    };
    mutationA.process = jest.fn(); // A mock function to allow us to test which mutation is processed

    const mutationB: any = new RelayNetworkLayerRequest();
    mutationB.isMutation = () => true;
    mutationB.cacheConfig = {
      debounceKey: '42'
    };
    mutationB.process = jest.fn();

    middlewareNextFn(mutationA);
    await middlewareNextFn(mutationB);

    expect(nextMiddleware).toBeCalledTimes(1);
    expect(mutationA.process).toBeCalledTimes(0);
    expect(mutationB.process).toBeCalledTimes(1);
  });

  it('should short-circuit debounced mutations when a non-debounced mutation is sent', async () => {
    const middleware = debounceMutationMiddleware(100);

    const nextMiddleware = jest.fn((mutation) => mutation.process());
    const middlewareNextFn = middleware(nextMiddleware);

    const mutationA: any = new RelayNetworkLayerRequest();
    mutationA.isMutation = () => true;
    mutationA.cacheConfig = {
      debounceKey: '42'
    };
    mutationA.process = jest.fn(); // A mock function to allow us to test which mutation is processed

    const mutationB: any = new RelayNetworkLayerRequest();
    mutationB.isMutation = () => true;
    // No debounceKey here
    mutationB.process = jest.fn();

    middlewareNextFn(mutationA);
    await middlewareNextFn(mutationB);

    expect(nextMiddleware).toBeCalledTimes(2);
    expect(mutationA.process).toBeCalledTimes(1);
    expect(mutationB.process).toBeCalledTimes(1);
    expect(mutationA.process).toHaveBeenCalledBefore(mutationB.process);
  });

  it('should short-circuit debounced mutations when a mutation with a different debounceKey is sent', async () => {
    const middleware = debounceMutationMiddleware(100);

    const nextMiddleware = jest.fn((mutation) => mutation.process());
    const middlewareNextFn = middleware(nextMiddleware);

    const mutationA: any = new RelayNetworkLayerRequest();
    mutationA.isMutation = () => true;
    mutationA.cacheConfig = {
      debounceKey: '42'
    };
    mutationA.process = jest.fn(); // A mock function to allow us to test which mutation is processed

    const mutationB: any = new RelayNetworkLayerRequest();
    mutationB.isMutation = () => true;
    mutationB.cacheConfig = {
      debounceKey: 'Not42'
    };
    mutationB.process = jest.fn();

    middlewareNextFn(mutationA);
    await middlewareNextFn(mutationB);

    expect(nextMiddleware).toBeCalledTimes(2);
    expect(mutationA.process).toBeCalledTimes(1);
    expect(mutationB.process).toBeCalledTimes(1);
    expect(mutationA.process).toHaveBeenCalledBefore(mutationB.process);
  });

  it('should short-circuit the debounced mutation when a query is sent', async () => {
    const middleware = debounceMutationMiddleware(100);

    const nextMiddleware = jest.fn((mutation) => mutation.process());
    const middlewareNextFn = middleware(nextMiddleware);

    const mutationA: any = new RelayNetworkLayerRequest();
    mutationA.isMutation = () => true;
    mutationA.cacheConfig = {
      debounceKey: '42'
    };
    mutationA.process = jest.fn(); // A mock function to allow us to test which mutation is processed

    const query: any = new RelayNetworkLayerRequest();
    query.isMutation = () => false; // This is not a mutation
    query.process = jest.fn();

    middlewareNextFn(mutationA);
    await middlewareNextFn(query);

    expect(nextMiddleware).toBeCalledTimes(2);
    expect(mutationA.process).toBeCalledTimes(1);
    expect(query.process).toBeCalledTimes(1);
    expect(mutationA.process).toHaveBeenCalledBefore(query.process);
  });
});
