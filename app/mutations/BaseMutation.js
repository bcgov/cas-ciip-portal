import {commitMutation as commitMutationDefault} from 'react-relay';

export default class BaseMutation {
  constructor(mutationName, configs) {
    this.mutationName = mutationName;
    this.counter = 0;
    this.configs = configs;
  }

  async performMutation(environment, mutation, variables, optimisticResponse) {
    const clientMutationId = `${this.mutationName}-${this.counter}`;
    variables.input.clientMutationId = clientMutationId;
    if (optimisticResponse) {
      const key = Object.keys(optimisticResponse)[0];
      optimisticResponse[key].clientMutationId = clientMutationId;
    }

    this.counter++;
    const {configs} = this;
    function commitMutation(environment, options) {
      return new Promise((resolve, reject) => {
        commitMutationDefault(environment, {
          ...options,
          configs,
          onError: error => {
            reject(error);
            console.log(error);
          },
          onCompleted: (response, errors) => {
            errors ? reject(errors) : resolve(response);
          }
        });
      });
    }

    // Const {mutation} = this;
    // const {variables} = this;
    // TODO: abstract onError into a base class
    return commitMutation(environment, {
      mutation,
      variables,
      optimisticResponse
    });
  }
}
