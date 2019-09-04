/**
 * @flow
 * @relayHash c9656eadeed69861a54851e4475676c1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type IncentiveCalculatorQueryVariables = {||};
export type IncentiveCalculatorQueryResponse = {|
  +allProducts: ?{|
    +nodes: $ReadOnlyArray<?{|
      +rowId: number,
      +name: string,
      +description: ?string,
      +benchmarksByProductId: {|
        +nodes: $ReadOnlyArray<?{|
          +benchmark: number,
          +eligibilityThreshold: number,
        |}>
      |},
    |}>
  |}
|};
export type IncentiveCalculatorQuery = {|
  variables: IncentiveCalculatorQueryVariables,
  response: IncentiveCalculatorQueryResponse,
|};
*/


/*
query IncentiveCalculatorQuery {
  allProducts {
    nodes {
      rowId
      name
      description
      benchmarksByProductId {
        nodes {
          benchmark
          eligibilityThreshold
          id
        }
      }
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "rowId",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "benchmark",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "eligibilityThreshold",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "IncentiveCalculatorQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "allProducts",
        "storageKey": null,
        "args": null,
        "concreteType": "ProductsConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "nodes",
            "storageKey": null,
            "args": null,
            "concreteType": "Product",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "benchmarksByProductId",
                "storageKey": null,
                "args": null,
                "concreteType": "BenchmarksConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "nodes",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Benchmark",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "IncentiveCalculatorQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "allProducts",
        "storageKey": null,
        "args": null,
        "concreteType": "ProductsConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "nodes",
            "storageKey": null,
            "args": null,
            "concreteType": "Product",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "benchmarksByProductId",
                "storageKey": null,
                "args": null,
                "concreteType": "BenchmarksConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "nodes",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Benchmark",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ]
                  }
                ]
              },
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "IncentiveCalculatorQuery",
    "id": null,
    "text": "query IncentiveCalculatorQuery {\n  allProducts {\n    nodes {\n      rowId\n      name\n      description\n      benchmarksByProductId {\n        nodes {\n          benchmark\n          eligibilityThreshold\n          id\n        }\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '85e2db8569f0119467fdd6bf7632a83c';
module.exports = node;
