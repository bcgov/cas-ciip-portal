/**
 * @flow
 * @relayHash 891b1ac6c6111b6bfa367c0d8b64e720
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateFormJsonInput = {|
  clientMutationId?: ?string,
  formJson: FormJsonInput,
|};
export type FormJsonInput = {|
  rowId?: ?number,
  name: string,
  formJson: any,
|};
export type FormCreatorMutationVariables = {|
  input: CreateFormJsonInput
|};
export type FormCreatorMutationResponse = {|
  +createFormJson: ?{|
    +formJson: ?{|
      +rowId: number
    |}
  |}
|};
export type FormCreatorMutation = {|
  variables: FormCreatorMutationVariables,
  response: FormCreatorMutationResponse,
|};
*/


/*
mutation FormCreatorMutation(
  $input: CreateFormJsonInput!
) {
  createFormJson(input: $input) {
    formJson {
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
    "type": "CreateFormJsonInput!",
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
    "name": "FormCreatorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createFormJson",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateFormJsonPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "formJson",
            "storageKey": null,
            "args": null,
            "concreteType": "FormJson",
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
    "name": "FormCreatorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createFormJson",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateFormJsonPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "formJson",
            "storageKey": null,
            "args": null,
            "concreteType": "FormJson",
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
    "name": "FormCreatorMutation",
    "id": null,
    "text": "mutation FormCreatorMutation(\n  $input: CreateFormJsonInput!\n) {\n  createFormJson(input: $input) {\n    formJson {\n      rowId\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c6ce75b08ccdb2704c979c0ae1b4ac9b';
module.exports = node;
