/**
 * @flow
 * @relayHash 963d3c6266f1264f20c1981cdd403e83
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpdateBenchmarkByRowIdInput = {|
  clientMutationId?: ?string,
  benchmarkPatch: BenchmarkPatch,
  rowId: number,
|};
export type BenchmarkPatch = {|
  rowId?: ?number,
  productId?: ?number,
  benchmark?: ?number,
  eligibilityThreshold?: ?number,
  startDate?: ?any,
  endDate?: ?any,
  createdAt?: ?any,
  createdBy?: ?string,
  updatedAt?: ?any,
  updatedBy?: ?string,
  deletedAt?: ?any,
  deletedBy?: ?string,
|};
export type ProductRowItemUpdateBenchmarkMutationVariables = {|
  input: UpdateBenchmarkByRowIdInput
|};
export type ProductRowItemUpdateBenchmarkMutationResponse = {|
  +updateBenchmarkByRowId: ?{|
    +benchmark: ?{|
      +rowId: number
    |}
  |}
|};
export type ProductRowItemUpdateBenchmarkMutation = {|
  variables: ProductRowItemUpdateBenchmarkMutationVariables,
  response: ProductRowItemUpdateBenchmarkMutationResponse,
|};
*/


/*
mutation ProductRowItemUpdateBenchmarkMutation(
  $input: UpdateBenchmarkByRowIdInput!
) {
  updateBenchmarkByRowId(input: $input) {
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
    "type": "UpdateBenchmarkByRowIdInput!",
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
    "name": "ProductRowItemUpdateBenchmarkMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateBenchmarkByRowId",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateBenchmarkPayload",
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
    "name": "ProductRowItemUpdateBenchmarkMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateBenchmarkByRowId",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateBenchmarkPayload",
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
    "name": "ProductRowItemUpdateBenchmarkMutation",
    "id": null,
    "text": "mutation ProductRowItemUpdateBenchmarkMutation(\n  $input: UpdateBenchmarkByRowIdInput!\n) {\n  updateBenchmarkByRowId(input: $input) {\n    benchmark {\n      rowId\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6f86f744ab2614c6ccdb7881bfe64448';
module.exports = node;
