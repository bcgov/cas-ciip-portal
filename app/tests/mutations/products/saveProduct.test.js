import fs from 'fs';
import path from 'path';
import EasyGraphQLTester from 'easygraphql-tester';

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../server', 'schema.graphql'),
  'utf8'
);

const mutation = `
        mutation saveProductTestMutation(
          $input: SaveProductMutationChainInput!
        ) {
          saveProductMutationChain(input: $input) {
            product {
              id
            }
          }
        }
      `;

/** *  MUTATIONS * **/
describe('saveProductMutation', () => {
  let tester;
  beforeEach(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });
  it('Should throw an error if input is missing', () => {
    let error;
    try {
      tester.mock(mutation);
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" of required type "SaveProductMutationChainInput!" was not provided.'
    );
  });
  it('Should throw an error if a variable is missing', () => {
    let error;
    try {
      tester.mock(mutation, {
        input: {
          newName: 'Morty',
          newDescription: 'Sidekick',
          newState: 'active',
          newParent: [1],
          benchmarkId: 1
        }
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" got invalid value { newName: "Morty", newDescription: "Sidekick", newState: "active", newParent: [1], benchmarkId: 1 }; Field prevId of required type Int! was not provided.'
    );
  });
  it('Should return id(string) if valid', () => {
    const test = tester.mock(mutation, {
      input: {
        prevId: 1,
        newName: 'Morty',
        newDescription: 'Sidekick',
        newState: 'active',
        newParent: [1],
        benchmarkId: 1
      }
    });

    expect(test).toBeDefined();
    console.log(test.data.saveProductMutationChain.product);
    expect(typeof test.data.saveProductMutationChain.product.id).toBe('string');
  });
});
