import {JSONSchema6} from 'json-schema';

const addOperatorSchema: JSONSchema6 = {
  type: 'object',
  title: 'Operator Details',
  properties: {
    name: {
      type: 'string',
      title: 'Legal name'
    },
    tradeName: {
      type: 'string',
      title: 'Trade name'
    },
    duns: {
      type: 'string',
      title: 'DUNS number',
      format: 'duns'
    },
    bcCorporateRegistryNumber: {
      type: 'string',
      title: 'BC Corporate Registry number'
    },
    naics: {
      type: 'string',
      title: 'NAICS code'
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
