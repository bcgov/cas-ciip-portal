import fs from 'fs';
import path from 'path';
import EasyGraphQLTester from 'easygraphql-tester';

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../server', 'schema.graphql'),
  'utf8'
);

const mutation = `
  mutation createApplicationMutation(
    $input: CreateApplicationMutationChainInput!
  ) {
    createApplicationMutationChain(input: $input) {
      clientMutationId
      application {
        id
      }
    }
  }
`;

/** *  MUTATIONS * **/
describe('createApplicationMutation', () => {
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
      'Variable "$input" of required type "CreateApplicationMutationChainInput!" was not provided.'
    );
  });
  it('Should throw an error if a variable is missing', () => {
    let error;
    try {
      tester.mock(mutation, {
        input: {
          id: 1
        }
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" got invalid value { id: 1 }; Field facilityIdInput of required type Int! was not provided.'
    );
  });
  it('Should return id(string) if valid', () => {
    const test = tester.mock(mutation, {
      input: {
        facilityIdInput: 1
      }
    });

    expect(test).toBeDefined();
    expect(typeof test.data.createApplicationMutationChain.application.id).toBe(
      'string'
    );
  });
});
