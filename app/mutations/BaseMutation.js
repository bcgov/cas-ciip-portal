import {commitMutation as commitMutationDefault} from 'react-relay';

export default class BaseMutation {
  constructor(mutationName, configs) {
    this.mutationName = mutationName;
    this.counter = 0;
    this.configs = configs;
  }

  async performMutation(environment, mutation, variables) {
    variables.input.clientMutationId = `${this.mutationName}-${this.counter}`;
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

    return commitMutation(environment, {mutation, variables});
  }
}
