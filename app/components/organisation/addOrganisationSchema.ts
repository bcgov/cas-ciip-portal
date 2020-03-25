import {JSONSchema6} from 'json-schema';

const addOperatorSchema: JSONSchema6 = {
  type: 'object',
  properties: {
    operatorName: {
      type: 'string',
      title: 'Operator Legal name'
    },
    craBusinessNumber: {
      type: 'string',
      title: 'CRA Business Number'
    }
  },
  required: ['operatorName', 'craBusinessNumber']
};

export default addOperatorSchema;
