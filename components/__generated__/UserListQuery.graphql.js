/**
 * @flow
 * @relayHash 2ca7ac6262e11697bf2dfd7396b5e363
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UserListQueryVariables = {||};
export type UserListQueryResponse = {|
  +allUsers: ?{|
    +pageInfo: {|
      +hasNextPage: boolean,
      +hasPreviousPage: boolean,
      +startCursor: ?any,
      +endCursor: ?any,
    |},
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +firstName: ?string,
        +lastName: ?string,
      |}
    |}>,
  |}
|};
export type UserListQuery = {|
  variables: UserListQueryVariables,
  response: UserListQueryResponse,
|};
*/


/*
query UserListQuery {
  allUsers {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        firstName
        lastName
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "allUsers",
    "storageKey": null,
    "args": null,
    "concreteType": "UsersConnection",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "pageInfo",
        "storageKey": null,
        "args": null,
        "concreteType": "PageInfo",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasNextPage",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasPreviousPage",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "startCursor",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "endCursor",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "edges",
        "storageKey": null,
        "args": null,
        "concreteType": "UsersEdge",
        "plural": true,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "node",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "firstName",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "lastName",
                "args": null,
                "storageKey": null
              }
            ]
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
    "name": "UserListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UserListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "UserListQuery",
    "id": null,
    "text": "query UserListQuery {\n  allUsers {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    edges {\n      node {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'be67b483523b8251953f35bbd227d6c2';
module.exports = node;
