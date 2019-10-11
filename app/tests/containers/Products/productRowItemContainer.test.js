import fs from 'fs';
import path from 'path';
import React from 'react';
import {wait, render, fireEvent} from '@testing-library/react';
import EasyGraphQLTester from 'easygraphql-tester';
import ProductRowItemContainer from '../../../containers/Products/ProductRowItemContainer';

const product = {
  rowId: 9,
  name: 'Milk',
  description: 'Sustenance for baby cows',
  state: 'active',
  benchmarksByProductId: {
    nodes: [
      {
        benchmark: 10,
        eligibilityThreshold: 20
      }
    ]
  }
};

const archivedProduct = {
  rowId: 9,
  name: 'Eggs',
  description: 'Large',
  state: 'archived',
  benchmarksByProductId: {
    nodes: [
      {
        benchmark: 1,
        eligibilityThreshold: 1
      }
    ]
  }
};

describe('Product Row Item', () => {
  it('should render the product', async () => {
    // This will replace the query in ProductList with the one above and wait till Milk is rendered
    const r = render(<ProductRowItemContainer product={product} />);
    await wait(() => r.getAllByText('Milk'));
    expect(r).toMatchSnapshot();
  });

  it('should toggle to product edit when I click edit product button', () => {
    const {getByTestId} = render(<ProductRowItemContainer product={product} />);
    fireEvent.click(getByTestId('edit-product'));
    expect(getByTestId('save-product')).toBeDefined();
  });

  it('should make the product name editable when I click edit', () => {
    const {getByLabelText, getByTestId} = render(
      <ProductRowItemContainer product={product} />
    );
    fireEvent.click(getByTestId('edit-product'));
    fireEvent.change(getByLabelText('Name'), {target: {value: 'Eggs'}});
    expect(getByLabelText('Name').value).toEqual('Eggs');
    expect(getByTestId('save-product').type).toEqual('submit');
  });

  it('should make the product description editable when I click edit', () => {
    const {getByLabelText, getByTestId} = render(
      <ProductRowItemContainer product={product} />
    );
    fireEvent.click(getByTestId('edit-product'));
    fireEvent.change(getByLabelText('Description'), {
      target: {value: 'Large'}
    });
    expect(getByLabelText('Description').value).toEqual('Large');
    expect(getByTestId('save-product').type).toEqual('submit');
  });

  it('should be allow products to be archived when active', () => {
    const {getByText, getByTestId} = render(
      <ProductRowItemContainer product={product} />
    );
    fireEvent.click(getByTestId('edit-product'));
    expect(getByText('Archive')).toBeDefined();
  });

  it('should allow products to be restorable when archived', () => {
    const {getByText, getByTestId} = render(
      <ProductRowItemContainer product={archivedProduct} />
    );
    fireEvent.click(getByTestId('edit-product'));
    expect(getByText('Restore')).toBeDefined();
  });

  it('should toggle to benchmark edit when I click edit benchmark button', () => {
    const {getByTestId} = render(<ProductRowItemContainer product={product} />);
    fireEvent.click(getByTestId('edit-benchmark'));
    expect(getByTestId('save-benchmark')).toBeDefined();
  });

  it('should make the benchmark editable when I click edit benchmark button', () => {
    const {getByLabelText, getByTestId} = render(
      <ProductRowItemContainer product={product} />
    );
    fireEvent.click(getByTestId('edit-benchmark'));
    fireEvent.change(getByLabelText('Benchmark'), {target: {value: 1}});
    expect(getByLabelText('Benchmark').value).toEqual('1');
    expect(getByTestId('save-benchmark').type).toEqual('submit');
  });

  it('should make the benchmark eligibility threshold editable when I click edit benchmark button', () => {
    const {getByLabelText, getByTestId} = render(
      <ProductRowItemContainer product={product} />
    );
    fireEvent.click(getByTestId('edit-benchmark'));
    fireEvent.change(getByLabelText('Eligibility Threshold'), {
      target: {value: 1}
    });
    expect(getByLabelText('Eligibility Threshold').value).toEqual('1');
    expect(getByTestId('save-benchmark').type).toEqual('submit');
  });

  it('should make the benchmark start date editable when I click edit benchmark button', () => {
    const {getByLabelText, getByTestId} = render(
      <ProductRowItemContainer product={product} />
    );
    fireEvent.click(getByTestId('edit-benchmark'));
    fireEvent.change(getByLabelText('Start Date'), {
      target: {value: '1999'}
    });
    expect(getByLabelText('Start Date').value).toEqual('1999');
    expect(getByTestId('save-benchmark').type).toEqual('submit');
  });

  it('should make the benchmark archivable / deletable when I click edit benchmark button', () => {
    const {getByText, getByTestId} = render(
      <ProductRowItemContainer product={product} />
    );
    fireEvent.click(getByTestId('edit-benchmark'));
    expect(getByText('Delete')).toBeDefined();
  });
});

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../server', 'schema.graphql'),
  'utf8'
);

describe('Mutations', () => {
  let tester;
  beforeEach(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });
  describe('create benchmark mutation', () => {
    it('Should throw an error if input is missing', () => {
      let error;
      try {
        const mutation = `
                    mutation ProductRowItemBenchmarkMutation ($input: CreateBenchmarkInput!){
                        createBenchmark(input:$input){
                            benchmark{
                                rowId
                            }
                        }
                    }
                `;
        tester.mock(mutation);
      } catch (error_) {
        error = error_;
      }

      expect(error.message).toEqual(
        'Variable "$input" of required type "CreateBenchmarkInput!" was not provided.'
      );
    });

    it('Should throw an error if a variable is missing', () => {
      let error;
      try {
        const mutation = `
                  mutation ProductRowItemBenchmarkMutation ($input: CreateBenchmarkInput!){
                      createBenchmark(input:$input){
                          benchmark{
                              rowId
                          }
                      }
                  }
              `;
        tester.mock(mutation, {
          input: {
            benchmark: {
              productId: 1,
              benchmark: 1
            }
          }
        });
      } catch (error_) {
        error = error_;
      }

      expect(error.message).toEqual(
        'Variable "$input" got invalid value { productId: 1, benchmark: 1 } at "input.benchmark"; Field eligibilityThreshold of required type Int! was not provided.'
      );
    });

    it('Should return rowId if valid', () => {
      const mutation = `
                mutation ProductRowItemBenchmarkMutation ($input: CreateBenchmarkInput!){
                    createBenchmark(input:$input){
                        benchmark{
                            rowId
                        }
                    }
                }
            `;
      const test = tester.mock(mutation, {
        input: {
          benchmark: {
            productId: 1,
            benchmark: 1,
            eligibilityThreshold: 10
          }
        }
      });

      expect(test).toBeDefined();
      expect(typeof test.data.createBenchmark.benchmark.rowId).toBe('number');
      // Console.log(util.inspect(test, false, null, true /* enable colors */))
    });
  });

  describe('update product mutation', () => {
    const mutation = `
                  mutation ProductRowItemProductMutation ($input: UpdateProductByRowIdInput!){
                      updateProductByRowId(input:$input){
                          product{
                              rowId
                          }
                      }
                  }
            `;

    it('Should throw an error if input is missing', () => {
      let error;
      try {
        tester.mock(mutation);
      } catch (error_) {
        error = error_;
      }

      expect(error.message).toEqual(
        'Variable "$input" of required type "UpdateProductByRowIdInput!" was not provided.'
      );
    });

    it('Should throw an error if a variable is missing', () => {
      let error;
      try {
        tester.mock(mutation, {
          input: {
            productPatch: {
              description: 'ABC',
              state: 'archived'
            }
          }
        });
      } catch (error_) {
        error = error_;
      }

      expect(error.message).toEqual(
        'Variable "$input" got invalid value { productPatch: { description: "ABC", state: "archived" } }; Field rowId of required type Int! was not provided.'
      );
    });

    it('Should return rowId if valid', () => {
      const test = tester.mock(mutation, {
        input: {
          rowId: 1,
          productPatch: {
            rowId: 1,
            name: 'ABCDE',
            description: 'ABC',
            state: 'archived'
          }
        }
      });
      expect(test).toBeDefined();
      expect(typeof test.data.updateProductByRowId.product.rowId).toBe(
        'number'
      );
      // Console.log(util.inspect(test, false, null, true /* enable colors */))
    });
  });
});
