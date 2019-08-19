import React from 'react';
import ProductRowItem from '../../../components/Products/ProductRowItem';
import { wait, render, fireEvent, getByText } from '@testing-library/react';
import EasyGraphQLTester from 'easygraphql-tester';
import fs from 'fs';
import path from 'path';
import util from 'util';


const product =   {
    "rowId": 9,
    "name": "Milk",
    "description": "Sustenance for baby cows",
    "archived": false,
    "benchmarksByProductId": {
        "nodes": [
            {
                "benchmark": 10,
                "eligibilityThreshold": 20
            }
        ]
    }
};

const archivedProduct =   {
  "rowId": 9,
  "name": "Eggs",
  "description": "Large",
  "archived": true,
  "benchmarksByProductId": {
      "nodes": [
          {
              "benchmark": 1,
              "eligibilityThreshold": 1
          }
      ]
  }
};

describe('Product Row Item', () => {

    it('should render the product', async () => {
        // This will replace the query in ProductList with the one above and wait till Milk is rendered
        const r = render(<ProductRowItem product={product} />);
        await wait(() => r.getAllByText("Milk"));
        expect(r).toMatchSnapshot();
    });

    it('should toggle to edit when I click edit', () => {
        const {getByLabelText, getByText, findByRole} = render(<ProductRowItem product={product} />);
        fireEvent.click(getByText(/Edit/i));
        expect(getByText('Save')).toBeDefined();
    });

    it('should make the benchmark editable when I click edit', () => {
        const {getByLabelText, getByText, findByRole} = render(<ProductRowItem product={product} />);
        fireEvent.click(getByText(/Edit/i));
        fireEvent.change(getByLabelText('Benchmark'), { target: { value: 1 } });
        expect(getByLabelText('Benchmark').value).toEqual('1');
        expect(getByText('Save').type).toEqual('submit');
    });

    it('should make the product name editable when I click edit', () => {
        const {getByLabelText, getByText, findByRole} = render(<ProductRowItem product={product} />);
        fireEvent.click(getByText(/Edit/i));
        fireEvent.change(getByLabelText('Name'), { target: { value: 'Eggs' } });
        expect(getByLabelText('Name').value).toEqual('Eggs');
        expect(getByText('Save').type).toEqual('submit');
    });

    it('should make the product description editable when I click edit', () => {
        const {getByLabelText, getByText, findByRole} = render(<ProductRowItem product={product} />);
        fireEvent.click(getByText(/Edit/i));
        fireEvent.change(getByLabelText('Description'), { target: { value: 'Large' } });
        expect(getByLabelText('Description').value).toEqual('Large');
        expect(getByText('Save').type).toEqual('submit');
    });

    it('should be archivable when not archived', () => {
        const {getByLabelText, getByText, findByRole} = render(<ProductRowItem product={product} />);
        expect(getByText('Archive')).toBeDefined();
    });

    it('should be restorable when archived', () => {
      const {getByLabelText, getByText, findByRole} = render(<ProductRowItem product={archivedProduct} />);
      expect(getByText('Restore')).toBeDefined();
    });
});

const schemaCode = fs.readFileSync(path.join(__dirname, '../../../server', 'schema.graphql'), 'utf8')

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
                `
                tester.mock(mutation);
            } catch(err) {
                error = err;
            }
            expect(error.message).toEqual('Variable "$input" of required type "CreateBenchmarkInput!" was not provided.');
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
              `
              tester.mock(mutation, {
                "input": {
                  "benchmark": {
                      "productId": 1,
                      "benchmark": 1,
                  }
                }
              });
          } catch(err) {
              error = err;
          }
          expect(error.message)
          .toEqual(`Variable "$input" got invalid value { benchmark: { productId: 1, benchmark: 1 } }; Field value.benchmark.eligibilityThreshold of required type Int! was not provided.`);
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
            `
            const test = tester.mock(mutation, {
                "input": {
                    "benchmark": {
                        "productId": 1,
                        "benchmark": 1,
                        "eligibilityThreshold": 10
                    }
                }
            });

            expect(test).toExist;
            expect(typeof test.data.createBenchmark.benchmark.rowId).toBe('number')
            // console.log(util.inspect(test, false, null, true /* enable colors */))
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
            `

      it('Should throw an error if input is missing', () => {
          let error;
          try {
              tester.mock(mutation);
          } catch(err) {
              error = err;
          }
          expect(error.message).toEqual('Variable "$input" of required type "UpdateProductByRowIdInput!" was not provided.');
      });

      it('Should throw an error if a variable is missing', () => {
        let error;
        try {
            tester.mock(mutation, {
              "input": {
                "productPatch": {
                    "description": 'ABC',
                    "archived": false
                }
              }
            });
        } catch(err) {
            error = err;
        }
        expect(error.message)
        .toEqual(`Variable "$input" got invalid value { productPatch: { description: "ABC", archived: false } }; Field value.rowId of required type Int! was not provided.`);
    });

      it('Should return rowId if valid', () => {
          const test = tester.mock(mutation, {
              "input": {
                  "rowId": 1,
                  "productPatch": {
                    "rowId": 1,
                    "name": 'ABCDE',
                    "description": 'ABC',
                    "archived": false
                  }
              }
          });
          console.log(util.inspect(test, false, null, true /* enable colors */))
          expect(test).toExist;
          expect(typeof test.data.updateProductByRowId.product.rowId).toBe('number')
      });
  });
});
