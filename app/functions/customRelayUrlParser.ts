import {CiipProductState} from 'createProductMutation.graphql';

class RelayVarsParser {
  typeMappers: object = {
    product_state: (x) => x as CiipProductState
  };

  parse = (relayVarsString) => {
    if (!relayVarsString) return null;
    return JSON.parse(relayVarsString, this.mapTypes);
  };

  private mapTypes = (key, value) => {
    if (this.typeMappers[key]) return this.typeMappers[key](value);
    return value;
  };
}

export {RelayVarsParser};
