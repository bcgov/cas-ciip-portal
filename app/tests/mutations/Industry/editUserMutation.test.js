import fs from 'fs';
import path from 'path';
import EasyGraphQLTester from 'easygraphql-tester';

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../server', 'schema.graphql'),
  'utf8'
);
const mutation = `
  mutation editUserMutation($input: UpdateUserByRowIdInput!) {
    updateUserByRowId(input: $input) {
      user {
        rowId
      }
    }
  }
`;
describe('editUserMutation', () => {
  let tester;
  let error;
  beforeEach(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });
  it('should should throw error if input missing', () => {
    try {
      tester.mock(mutation);
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toBeDefined();
  });
  it('should should throw error if variables missing', () => {
    try {
      tester.mock(mutation, {
        input: {
          rowId: 1,
          UserPatch: {
            firstName: 'Hamza',
            lastName: 'Javed'
          }
        }
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toBeDefined();
  });
  it('should return correct input', () => {
    const test = tester.mock(mutation, {
      input: {
        rowId: 1,
        userPatch: {
          firstName: 'Hamza',
          lastName: 'Javed',
          emailAddress: 'hamza@button.is',
          occupation: 'developer',
          phoneNumber: '12345'
        }
      }
    });
    expect(test).toBeDefined();
    expect(typeof test.data.updateUserByRowId.user.rowId).toBe('number');
  });
});
