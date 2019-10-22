import {commitMutation as commitMutationDefault} from 'react-relay';

export default class BaseMutation {
  constructor(environment, mutation, variables, mutationName) {
    this.environment = environment;
    this.mutation = mutation;
    this.variables = variables;
    this.mutationName = mutationName;
    this.counter = 0;
  }

  async performMutation() {
    this.variables.input.clientMutationId = `${this.mutationName}-${this.counter}`;
    this.counter++;

    function commitMutation(environment, options) {
      return new Promise((resolve, reject) => {
        commitMutationDefault(environment, {
          ...options,
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

    const {mutation} = this;
    const {variables} = this;
    // TODO: abstract onError into a base class
    return commitMutation(this.environment, {mutation, variables});
  }
}
