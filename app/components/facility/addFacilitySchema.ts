import {JSONSchema6} from 'json-schema';

const addFacilitySchema: JSONSchema6 = {
  type: 'object',
  title: 'Facility Details',
  properties: {
    facilityName: {
      title: 'Facility Name',
      type: 'string'
    },
    facilityType: {
      type: 'string',
      title: 'Facility Type',
      enum: ['IF_a', 'IF_b', 'L_c', 'SFO', 'LFO', 'EIO']
    },
    bcghgid: {
      type: 'string',
      title: 'BCGHG ID Number'
    },
    naicsCode: {
      type: 'number',
      title: 'NAICS Code'
    },
    mailingAddress: {
      title: 'Facility Mailing Address',
      $ref: '#/definitions/address'
    }
  },
  definitions: {
    address: {
      type: 'object',
      properties: {
        facilityMailingAddress: {
          title: 'Street address',
          type: 'string'
        },
        facilityCity: {
          title: 'City',
          type: 'string'
        },
        facilityProvince: {
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
        facilityPostalCode: {
          title: 'Postal Code',
          type: 'string',
          format: 'postal-code'
        }
      }
    }
  }
};

export default addFacilitySchema;
