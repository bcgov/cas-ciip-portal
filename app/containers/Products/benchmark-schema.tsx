export function benchmarkSchema(reportingYears) {
  const schema = {
    type: 'object',
    required: [
      'benchmark',
      'eligibilityThreshold',
      'minimumIncentiveRatio',
      'maximumIncentiveRatio',
      'incentiveMultiplier',
      'startReportingYear',
      'endReportingYear'
    ],
    properties: {
      current: {
        type: 'string'
      },
      benchmark: {
        type: 'string',
        title: 'Benchmark'
      },
      startReportingYear: {
        type: 'number',
        title: 'Start Reporting Period',
        enum: reportingYears
      },
      endReportingYear: {
        type: 'number',
        title: 'End Reporting Period',
        enum: reportingYears
      },
      eligibilityThreshold: {
        type: 'string',
        title: 'Eligibility Threshold'
      },
      incentiveMultiplier: {
        type: 'string',
        title: 'Incentive Multiplier',
        defaultValue: '1'
      },
      minimumIncentiveRatio: {
        type: 'string',
        title: 'Minimum incentive ratio',
        defaultValue: '0'
      },
      maximumIncentiveRatio: {
        type: 'string',
        title: 'Maximum incentive ratio',
        defaultValue: '1'
      }
    }
  };

  const uiSchema = {
    current: {
      'ui:col-md': 12,
      classNames: 'hidden-title',
      'ui:widget': 'header',
      'ui:options': {
        text: 'Current Benchmark Information'
      }
    },
    benchmark: {
      'ui:col-md': 3
    },
    eligibilityThreshold: {
      'ui:col-md': 3
    },
    startReportingYear: {
      'ui:col-md': 3,
      'ui:help': 'The first reporting year where this benchmark is used'
    },
    endReportingYear: {
      'ui:col-md': 3,
      'ui:help': 'The last reporting year where this benchmark is used'
    },
    incentiveMultiplier: {
      'ui:col-md': 3
    },
    minimumIncentiveRatio: {
      'ui:col-md': 3
    },
    maximumIncentiveRatio: {
      'ui:col-md': 3
    }
  };
  return {
    schema,
    uiSchema
  };
}

export default benchmarkSchema;
