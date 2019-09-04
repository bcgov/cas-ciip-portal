/**
 * @flow
 * @relayHash 24b1d70f647ff26a93be9fe310bffb5d
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
      +processingUnit: ?string,
      +applicationId: ?number,
      +units: ?string,
      +associatedEmissions: ?string,
      +attributableFuelPercentage: ?string,
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
      processingUnit
      applicationId
      units
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
            "name": "processingUnit",
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
            "name": "units",
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
    "text": "query IncentiveCalculatorProductsByBcghgidQuery(\n  $bcghgidInput: String\n) {\n  getProductsByBcghgid(bcghgidInput: $bcghgidInput) {\n    nodes {\n      rowId\n      quantity\n      processingUnit\n      applicationId\n      units\n      associatedEmissions\n      attributableFuelPercentage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '72015716b77e5bb4555e596cfe6b836c';
module.exports = node;
