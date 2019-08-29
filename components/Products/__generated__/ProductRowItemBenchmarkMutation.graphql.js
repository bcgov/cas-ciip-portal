/**
 * @flow
 * @relayHash 6821d6a66835c09cca9738180b1267bf
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
  startDate?: ?any,
  endDate?: ?any,
  createdAt?: ?any,
  createdBy?: ?string,
  updatedAt?: ?any,
  updatedBy?: ?string,
  deletedAt?: ?any,
  deletedBy?: ?string,
|};
export type ProductRowItemBenchmarkMutationVariables = {|
  input: CreateBenchmarkInput
|};
export type ProductRowItemBenchmarkMutationResponse = {|
  +createBenchmark: ?{|
    +benchmark: ?{|
      +rowId: number
    |}
  |}
|};
export type ProductRowItemBenchmarkMutation = {|
  variables: ProductRowItemBenchmarkMutationVariables,
  response: ProductRowItemBenchmarkMutationResponse,
|};
*/


/*
mutation ProductRowItemBenchmarkMutation(
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
    "name": "ProductRowItemBenchmarkMutation",
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
    "name": "ProductRowItemBenchmarkMutation",
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
    "name": "ProductRowItemBenchmarkMutation",
    "id": null,
    "text": "mutation ProductRowItemBenchmarkMutation(\n  $input: CreateBenchmarkInput!\n) {\n  createBenchmark(input: $input) {\n    benchmark {\n      rowId\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f5f464c1528575b76b94f55603c4ffe4';
module.exports = node;
