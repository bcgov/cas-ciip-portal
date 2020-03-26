import {JSONSchema6} from 'json-schema';

const addFacilitySchema: JSONSchema6 = {
  type: 'object',
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
    }
  },
  required: ['facilityName', 'facilityType', 'bcghgid']
};

export default addFacilitySchema;
