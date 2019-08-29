/**
 * @flow
 * @relayHash 8524a59437d96420f5f01a874eecf44b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductListQueryVariables = {||};
export type ProductListQueryResponse = {|
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
export type ProductListQuery = {|
  variables: ProductListQueryVariables,
  response: ProductListQueryResponse,
|};
*/


/*
query ProductListQuery {
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
    "name": "ProductListQuery",
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
    "name": "ProductListQuery",
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
    "name": "ProductListQuery",
    "id": null,
    "text": "query ProductListQuery {\n  allProducts {\n    nodes {\n      rowId\n      name\n      description\n      benchmarksByProductId {\n        nodes {\n          benchmark\n          eligibilityThreshold\n          id\n        }\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4bcfbad35b57617165620fa1e524bd12';
module.exports = node;
