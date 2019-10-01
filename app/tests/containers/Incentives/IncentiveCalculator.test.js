import React from 'react';
import {wait, render} from '@testing-library/react';
import IncentiveCalculator from '../../../containers/Incentives/IncentiveCalculator';
import {queryMock} from '../../../lib/relayQueryMock';

let allProductsMockData;
let reportedProductsMockData;
let carbonTaxMockData;

describe('Incentive Calculator', () => {
  beforeEach(() => {
    // Make sure mock data is always fresh for each test run
    allProductsMockData = {
      allProducts: {
        nodes: [
          {
            id: 'WyJwcm9kdWN0cyIsOV0=',
            rowId: 9,
            name: 'Milk',
            description: 'Sustenance for baby cows',
            state: 'active',
            benchmarksByProductId: {
              nodes: [
                {
                  rowId: 1,
                  id: 'WyJiZW5jaG1hcmtzIiw4XQ==',
                  benchmark: 100,
                  eligibilityThreshold: 100,
                  start_date: '1999',
                  end_date: '1999'
                }
              ]
            }
          },
          {
            id: 'WyJwcm9kdWN0cyIsMTBd',
            rowId: 10,
            name: 'Butter',
            description: 'Sustenance for Keto folk',
            state: 'active',
            parent: [],
            benchmarksByProductId: {
              nodes: [
                {
                  rowId: 1,
                  id: 'WyJiZW5jaG1hcmtzIiw4XQ==',
                  benchmark: 120,
                  eligibilityThreshold: 1400,
                  start_date: '1999',
                  end_date: '1999'
                }
              ]
            }
          }
        ]
      }
    };

    reportedProductsMockData = {
      getProductsByBcghgid: {
        nodes: [
          {
            rowId: '5',
            quantity: '1150',
            product: 'Milk',
            applicationId: '8',
            fuelUnits: 'm3',
            associatedEmissions: 'Doloremque ut cillum',
            attributableFuelPercentage: '20'
          },
          {
            rowId: '6',
            quantity: '1130',
            product: 'Butter',
            applicationId: '8',
            fuelUnits: 'kl',
            associatedEmissions: 'Recusandae In in do',
            attributableFuelPercentage: '10'
          }
        ]
      }
    };

    carbonTaxMockData = {
      getCarbonTaxByBcghgid: {
        nodes: [
          {
            reportId: 692,
            organisationId: 692,
            fuelType: 'Still Gas - Refineries (Sm^3)',
            calculatedCarbonTax: '2000'
          },
          {
            reportId: 692,
            organisationId: 692,
            fuelType: 'Still Gas - Refineries (Sm^3)',
            calculatedCarbonTax: '1000'
          },
          {
            reportId: 692,
            organisationId: 692,
            fuelType: 'Propane (kilolitres)',
            calculatedCarbonTax: '1000'
          },
          {
            reportId: 692,
            organisationId: 692,
            fuelType: 'Natural Gas (Sm^3)',
            calculatedCarbonTax: '1000'
          }
        ]
      }
    };
  });

  const mockQueries = () => {
    queryMock.mockQuery({
      name: 'IncentiveCalculatorQuery',
      data: allProductsMockData
    });

    queryMock.mockQuery({
      name: 'IncentiveCalculatorProductsByBcghgidQuery',
      variables: {bcghgidInput: 1},
      data: reportedProductsMockData
    });

    queryMock.mockQuery({
      name: 'IncentiveCalculatorCarbonTaxByBcghgidQuery',
      data: carbonTaxMockData,
      variables: {bcghgidInput: 1, reportingYear: '2013'}
    });
  };

  // It renders the table with products and calculation

  it('should render reported products', async () => {
    mockQueries();
    // This will replace the query in ProductList with the one above and wait till Milk is rendered
    const r = render(<IncentiveCalculator bcghgid="1" reportingYear="2013" />);
    await wait(() => r.getAllByText('Milk'));
    expect(r).toMatchSnapshot();
  });

  /* It('should calculate the correct incentive', async () => {
        mockQueries();
        // This will replace the query in ProductList with the one above and wait till Milk is rendered
        const r = render(<IncentiveCalculator />);
        await wait(() => r.getAllByText("Milk"));
        expect(r).toMatchSnapshot();
    }); */
});

// It calculates the proper incentive if props exist

// It fails gracefully if benchmark and et don't exist

// It generates the chart if data exists

// It calculates the correct values for BM < Q < ET

// It calculates the correct values for BM > Q (i.e. I = 0)

// It calculates the correct values for Q > ET (i.e. I = 0)

// It calculates the correct total
