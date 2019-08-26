/**
 * @flow
 * @relayHash fb996f65b1b0c43f6e532598e026f052
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateBenchmarkInput = {|
  clientMutationId?: ?string,
  benchmark: BenchmarkInput,
|};
export type BenchmarkInput = {|
  rowId?: ?number,
  productId: number,
  benchmark: number,
  eligibilityThreshold: number,
  createdAt?: ?any,
|};
export type ProductRowItemMutationVariables = {|
  input: CreateBenchmarkInput
|};
export type ProductRowItemMutationResponse = {|
  +createBenchmark: ?{|
    +benchmark: ?{|
      +rowId: number
    |}
  |}
|};
export type ProductRowItemMutation = {|
  variables: ProductRowItemMutationVariables,
  response: ProductRowItemMutationResponse,
|};
*/


/*
mutation ProductRowItemMutation(
  $input: CreateBenchmarkInput!
) {
  createBenchmark(input: $input) {
    benchmark {
      rowId
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateBenchmarkInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "rowId",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ProductRowItemMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createBenchmark",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBenchmarkPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "benchmark",
            "storageKey": null,
            "args": null,
            "concreteType": "Benchmark",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductRowItemMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createBenchmark",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBenchmarkPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "benchmark",
            "storageKey": null,
            "args": null,
            "concreteType": "Benchmark",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "ProductRowItemMutation",
    "id": null,
    "text": "mutation ProductRowItemMutation(\n  $input: CreateBenchmarkInput!\n) {\n  createBenchmark(input: $input) {\n    benchmark {\n      rowId\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '06b977323553a1267a76b81461c0bdf4';
module.exports = node;
