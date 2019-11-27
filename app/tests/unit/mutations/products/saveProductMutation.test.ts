import fs from 'fs';
import path from 'path';
import EasyGraphQLTester from 'easygraphql-tester';

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../../server', 'schema.graphql'),
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
  it('Should throw an error if passed incorrect variables', () => {
    let error;
    try {
      tester.mock(mutation, {
        input: {
          newName: 'Morty',
          newDescription: 'Sidekick',
          newState: 'active',
          newParent: [1],
          newUnits: 'm3',
          boop: 123
        }
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" got invalid value { newName: "Morty", newDescription: "Sidekick", newState: "active", newParent: [1], newUnits: "m3", boop: 123 }; Field "boop" is not defined by type SaveProductMutationChainInput.'
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
        newUnits: 'm3'
      }
    });

    expect(test).toBeDefined();
    expect(typeof test.data.saveProductMutationChain.product.id).toBe('string');
  });
});
