import {JSONSchema6} from 'json-schema';

const addOperatorSchema: JSONSchema6 = {
  type: 'object',
  title: 'Operator Details',
  properties: {
    operatorName: {
      type: 'string',
      title: 'Legal name'
    },
    operatorTradeName: {
      type: 'string',
      title: 'Trade name'
    },
    duns: {
      // TODO: shouldn't the duns be a number type? This is copied from the administration form_json.
      type: 'string',
      title: 'DUNS number',
      format: 'duns'
    },
    mailingAddress: {
      title: 'Operator Mailing Address',
      $ref: '#/definitions/address'
    }
  },
  definitions: {
    address: {
      type: 'object',
      properties: {
        operatorMailingAddress: {
          title: 'Street address',
          type: 'string'
        },
        operatorCity: {
          title: 'City',
          type: 'string'
        },
        operatorProvince: {
          title: 'Province or Territory',
          type: 'string',
          enum: [
            'Alberta',
            'British Columbia',
            'Manitoba',
            'New Brunswick',
            'Newfoundland and Labrador',
            'Northwest Territories',
            'Nova Scotia',
            'Nunavut',
            'Ontario',
            'Prince Edward Island',
            'Quebec',
            'Saskatchewan',
            'Yukon'
          ]
        },
        operatorPostalCode: {
          title: 'Postal Code',
          type: 'string',
          format: 'postal-code'
        }
      }
    }
  }
};

export default addOperatorSchema;
