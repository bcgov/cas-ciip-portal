import React from 'react';
import {render} from '@testing-library/react';
import ProductCreatorContainer from '../../../containers/Products/ProductCreatorContainer';

describe('Product Creator', () => {
  it.skip('should render the product name field', async () => {
    // This will replace the query in ProductList with the one above and wait till Milk is rendered
    const {getByLabelText} = render(<ProductCreatorContainer />);
    expect(getByLabelText(/Product Name/i)).toBeDefined();
  });

  it.skip('should render the product desc field', async () => {
    // This will replace the query in ProductList with the one above and wait till Milk is rendered
    const {getByLabelText} = render(<ProductCreatorContainer />);
    expect(getByLabelText(/Product Description/i)).toBeDefined();
  });

  it.skip('should render the Create Product button', async () => {
    // This will replace the query in ProductList with the one above and wait till Milk is rendered
    const {getByText} = render(<ProductCreatorContainer />);
    expect(getByText(/Create Product/i)).toBeDefined();
  });

  it.skip('should match the last usable snapshot', async () => {
    // This will replace the query in ProductList with the one above and wait till Milk is rendered
    const container = render(<ProductCreatorContainer />);
    expect(container).toMatchSnapshot();
  });
});

// Test the ProductCreatorContainer Mutation
