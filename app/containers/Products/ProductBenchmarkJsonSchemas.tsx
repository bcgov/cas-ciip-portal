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

// Schema for ProductRowItemContainer
export const benchmarkSchema: JSONSchema6 = {
  type: 'object',
  properties: {
    benchmark: {
      type: 'number',
      title: 'Benchmark'
    },
    eligibilityThreshold: {
      type: 'number',
      title: 'ET'
    },
    startDate: {
      type: 'string',
      title: 'Start Date (DD-MM-YYYY)'
    },
    endDate: {
      type: 'string',
      title: 'End Date (DD-MM-YYYY)'
    }
  }
};

// Schema for ProductRowItemContainer
export const benchmarkUISchema = {
  benchmark: {
    'ui:col-md': 6
  },
  description: {
    'ui:col-md': 6
  },
  startDate: {
    'ui:col-md': 6
  },
  endDate: {
    'ui:col-md': 6
  }
};
