import fs from 'fs';
import path from 'path';
import EasyGraphQLTester from 'easygraphql-tester';

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../server', 'schema.graphql'),
  'utf8'
);

const mutation = `
  mutation UserOrganisationMutation($input: CreateUserOrganisationInput!) {
    createUserOrganisation(input: $input) {
      userOrganisation {
        id
        organisationId
        status
      }
    }
  }
`;

/** *  MUTATIONS * **/
describe('userOrganisationMutation', () => {
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
      'Variable "$input" of required type "CreateUserOrganisationInput!" was not provided.'
    );
  });
  it('Should throw an error if a variable is missing', () => {
    let error;
    try {
      tester.mock(mutation, {
        input: {
          rowId: 1,
          userOrganisationPatch: {
            userId: 1,
            organisationId: 2
          }
        }
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toBeDefined();
  });
  it('Should return id(string) if valid', () => {
    const test = tester.mock(mutation, {
      input: {
        userOrganisation: {
          userId: 1,
          organisationId: 2,
          status: 'APPROVED'
        }
      }
    });

    expect(test).toBeDefined();
    expect(typeof test.data.createUserOrganisation.userOrganisation.id).toBe(
      'string'
    );
  });
});
