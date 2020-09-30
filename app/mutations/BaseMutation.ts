import {
  commitMutation as commitMutationDefault,
  GraphQLTaggedNode
} from 'react-relay';
import {
  DeclarativeMutationConfig,
  Disposable,
  MutationParameters
} from 'relay-runtime';
import {toast} from 'react-toastify';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import {MutationConfigWithDebounce} from 'next-env';

interface BaseMutationType extends MutationParameters {
  variables: {input: any; messages?: {success: string; failure: string}};
}

const debouncedMutationMap = new Map<string, Disposable>();

export default class BaseMutation<T extends BaseMutationType = never> {
  counter: number;
  mutationName: string;
  configs?: DeclarativeMutationConfig[];
  constructor(mutationName: string, configs?: DeclarativeMutationConfig[]) {
    this.mutationName = mutationName;
    this.counter = 0;
    this.configs = configs;
  }

  async performMutation(
    environment: RelayModernEnvironment,
    mutation: GraphQLTaggedNode,
    variables: T['variables'],
    optimisticResponse?: any,
    updater?: (...args: any[]) => any,
    debounceKey?: string
  ) {
    const successMessage = variables.messages?.success
      ? variables.messages.success
      : '';
    const failureMessage = variables.messages?.failure
      ? variables.messages.failure
      : 'Oops! Seems like something went wrong';

    const {configs, mutationName} = this;
    async function commitMutation(
      commitEnvironment,
      options: {
        mutation: GraphQLTaggedNode;
        variables: T['variables'];
        optimisticResponse: any;
        updater: any;
      }
    ) {
      return new Promise<T['response']>((resolve, reject) => {
        // Debounced mutations should be commited immediately to perform the optimisticUpdate
        // The actual request will be cancelled in the network layer
        // Here we either dispose of a debounced mutation, or remove it from the map when it errors/completes
        if (debounceKey) {
          const previousMutation = debouncedMutationMap.get(debounceKey);
          if (previousMutation) {
            previousMutation.dispose();
          }
        }

        const disposable = commitMutationDefault<T>(commitEnvironment, {
          ...options,
          configs,
          cacheConfig: {debounceKey},
          onError: (error) => {
            if (debounceKey) {
              debouncedMutationMap.delete(debounceKey);
            }

            reject(error);
            if (failureMessage) {
              toast(failureMessage, {
                className: 'mutation-toast Toastify__toast--error',
                autoClose: false,
                position: 'bottom-right',
                // Don't show duplicate errors if the same mutation fails several times in a row
                toastId: mutationName
              });
            }
          },
          onCompleted: (response, errors) => {
            if (debounceKey) {
              debouncedMutationMap.delete(debounceKey);
            }

            errors ? reject(errors) : resolve(response);
            if (successMessage) {
              toast(successMessage, {
                className: 'mutation-toast Toastify__toast--success',
                autoClose: 5000,
                position: 'bottom-right'
              });
            }
          }
        } as MutationConfigWithDebounce<T>);
        if (debounceKey) {
          debouncedMutationMap.set(debounceKey, disposable);
        }
      });
    }

    return commitMutation(environment, {
      mutation,
      variables,
      optimisticResponse,
      updater
    });
  }
}
