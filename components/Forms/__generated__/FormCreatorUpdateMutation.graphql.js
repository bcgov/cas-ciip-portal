/**
 * @flow
 * @relayHash 420a081d76cb612f318c2f5fbb5fcf3b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpdateFormJsonByRowIdInput = {|
  clientMutationId?: ?string,
  formJsonPatch: FormJsonPatch,
  rowId: number,
|};
export type FormJsonPatch = {|
  rowId?: ?number,
  name?: ?string,
  formJson?: ?any,
|};
export type FormCreatorUpdateMutationVariables = {|
  input: UpdateFormJsonByRowIdInput
|};
export type FormCreatorUpdateMutationResponse = {|
  +updateFormJsonByRowId: ?{|
    +formJson: ?{|
      +rowId: number
    |}
  |}
|};
export type FormCreatorUpdateMutation = {|
  variables: FormCreatorUpdateMutationVariables,
  response: FormCreatorUpdateMutationResponse,
|};
*/


/*
mutation FormCreatorUpdateMutation(
  $input: UpdateFormJsonByRowIdInput!
) {
  updateFormJsonByRowId(input: $input) {
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
    "type": "UpdateFormJsonByRowIdInput!",
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
    "name": "FormCreatorUpdateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateFormJsonByRowId",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateFormJsonPayload",
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
    "name": "FormCreatorUpdateMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateFormJsonByRowId",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateFormJsonPayload",
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
    "name": "FormCreatorUpdateMutation",
    "id": null,
    "text": "mutation FormCreatorUpdateMutation(\n  $input: UpdateFormJsonByRowIdInput!\n) {\n  updateFormJsonByRowId(input: $input) {\n    formJson {\n      rowId\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e74800588ebda8c48144757deafc27ce';
module.exports = node;
