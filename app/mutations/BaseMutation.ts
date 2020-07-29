import {
  commitMutation as commitMutationDefault,
  GraphQLTaggedNode
} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {DeclarativeMutationConfig} from 'relay-runtime';
import {toast} from 'react-toastify';

interface BaseMutationType {
  response: any;
  variables: {input: any; messages?: {success: string; failure: string}};
}

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
    shouldDebounceMutation = false
  ) {
    const success_message = variables.messages?.success
      ? variables.messages.success
      : '';
    const failure_message = variables.messages?.failure
      ? variables.messages.failure
      : 'Oops! Seems like something went wrong';

    const {configs, mutationName} = this;
    async function commitMutation(
      environment,
      options: {
        mutation: GraphQLTaggedNode;
        variables: T['variables'];
        optimisticResponse: any;
        updater: any;
      }
    ) {
      return new Promise<T['response']>((resolve, reject) => {
        commitMutationDefault<T>(environment, {
          ...options,
          configs,
          cacheConfig: {debounce: shouldDebounceMutation},
          onError: (error) => {
            reject(error);
            if (failure_message) {
              toast(failure_message, {
                className: 'mutation-toast Toastify__toast--error',
                autoClose: false,
                position: 'bottom-right',
                // Don't show duplicate errors if the same mutation fails several times in a row
                toastId: mutationName
              });
            }
          },
          onCompleted: (response, errors) => {
            errors ? reject(errors) : resolve(response);
            if (success_message) {
              toast(success_message, {
                className: 'mutation-toast Toastify__toast--success',
                autoClose: 5000,
                position: 'bottom-right'
              });
            }
          }
        });
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
