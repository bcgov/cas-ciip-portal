import {JSONSchema6} from 'json-schema';

const addOperatorSchema: JSONSchema6 = {
  type: 'object',
  title: 'Operator Details',
  properties: {
    operatorName: {
      type: 'string',
      title: 'Legal name'
    },
    craBusinessNumber: {
      type: 'string',
      title: 'CRA Business Number'
    }
  },
  required: ['operatorName', 'craBusinessNumber']
};

export default addOperatorSchema;
