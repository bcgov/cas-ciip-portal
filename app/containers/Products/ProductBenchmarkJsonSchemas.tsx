import {JSONSchema6} from 'json-schema';

// Schema for ProductCreatorContainer component
export const createProductSchema: JSONSchema6 = {
  type: 'object',
  properties: {
    product: {
      type: 'string',
      title: 'Product'
    },
    description: {
      type: 'string',
      title: 'Description'
    }
  },
  required: ['product']
};

// Schema for ProductRowItemContainer
export const productSchema: JSONSchema6 = {
  type: 'object',
  properties: {
    product: {
      type: 'string',
      title: 'Product'
    },
    description: {
      type: 'string',
      title: 'Description'
    }
  },
  required: ['product']
};

// Schema for ProductRowItemContainer
export const productUISchema = {
  product: {
    'ui:col-md': 6
  },
  description: {
    'ui:col-md': 6
  }
};
