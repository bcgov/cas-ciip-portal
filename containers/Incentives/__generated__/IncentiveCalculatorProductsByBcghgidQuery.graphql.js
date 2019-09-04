/**
 * @flow
 * @relayHash 6c0257184c769fbc5571c8ed1f2e0a66
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type IncentiveCalculatorProductsByBcghgidQueryVariables = {|
  bcghgidInput?: ?string
|};
export type IncentiveCalculatorProductsByBcghgidQueryResponse = {|
  +getProductsByBcghgid: {|
    +nodes: $ReadOnlyArray<?{|
      +rowId: ?any,
      +quantity: ?string,
      +product: ?string,
      +applicationId: ?string,
      +fuelUnits: ?string,
      +associatedEmissions: ?string,
      +attributableFuelPercentage: ?any,
    |}>
  |}
|};
export type IncentiveCalculatorProductsByBcghgidQuery = {|
  variables: IncentiveCalculatorProductsByBcghgidQueryVariables,
  response: IncentiveCalculatorProductsByBcghgidQueryResponse,
|};
*/


/*
query IncentiveCalculatorProductsByBcghgidQuery(
  $bcghgidInput: String
) {
  getProductsByBcghgid(bcghgidInput: $bcghgidInput) {
    nodes {
      rowId
      quantity
      product
      applicationId
      fuelUnits
      associatedEmissions
      attributableFuelPercentage
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "bcghgidInput",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "getProductsByBcghgid",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "bcghgidInput",
        "variableName": "bcghgidInput"
      }
    ],
    "concreteType": "CiipProductionsConnection",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "nodes",
        "storageKey": null,
        "args": null,
        "concreteType": "CiipProduction",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "rowId",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "quantity",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "product",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "applicationId",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "fuelUnits",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "associatedEmissions",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "attributableFuelPercentage",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "IncentiveCalculatorProductsByBcghgidQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "IncentiveCalculatorProductsByBcghgidQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "IncentiveCalculatorProductsByBcghgidQuery",
    "id": null,
    "text": "query IncentiveCalculatorProductsByBcghgidQuery(\n  $bcghgidInput: String\n) {\n  getProductsByBcghgid(bcghgidInput: $bcghgidInput) {\n    nodes {\n      rowId\n      quantity\n      product\n      applicationId\n      fuelUnits\n      associatedEmissions\n      attributableFuelPercentage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5196ee12f468afabbb5a169aec645df9';
module.exports = node;

