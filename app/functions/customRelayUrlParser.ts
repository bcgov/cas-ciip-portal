import {CiipProductState} from 'createProductMutation.graphql';

const typeMappers = {
  product_state: (x) => x as CiipProductState
};

const mapTypes = (key, value) => {
  if (typeMappers[key]) return typeMappers[key](value);
  return value;
};

const parseRelayVars = (relayVarsString) => {
  return JSON.parse(relayVarsString, mapTypes);
};

export {parseRelayVars};
