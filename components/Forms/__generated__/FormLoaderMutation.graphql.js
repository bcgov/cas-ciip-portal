/**
 * @flow
 * @relayHash 35cb6e718eb8ab7036d038cd2ec9d2a2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateFormResultInput = {|
  clientMutationId?: ?string,
  formResult: FormResultInput,
|};
export type FormResultInput = {|
  rowId?: ?number,
  formId: number,
  userId: number,
  formResult: any,
|};
export type FormLoaderMutationVariables = {|
  input: CreateFormResultInput
|};
export type FormLoaderMutationResponse = {|
  +createFormResult: ?{|
    +formResult: ?{|
      +rowId: number
    |}
  |}
|};
export type FormLoaderMutation = {|
  variables: FormLoaderMutationVariables,
  response: FormLoaderMutationResponse,
|};
*/


/*
mutation FormLoaderMutation(
  $input: CreateFormResultInput!
) {
  createFormResult(input: $input) {
    formResult {
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
    "type": "CreateFormResultInput!",
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
    "name": "FormLoaderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createFormResult",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateFormResultPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "formResult",
            "storageKey": null,
            "args": null,
            "concreteType": "FormResult",
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
    "name": "FormLoaderMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createFormResult",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateFormResultPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "formResult",
            "storageKey": null,
            "args": null,
            "concreteType": "FormResult",
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
    "name": "FormLoaderMutation",
    "id": null,
    "text": "mutation FormLoaderMutation(\n  $input: CreateFormResultInput!\n) {\n  createFormResult(input: $input) {\n    formResult {\n      rowId\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '909ed08d03c7ff1e9ecbc489fa43f412';
module.exports = node;
