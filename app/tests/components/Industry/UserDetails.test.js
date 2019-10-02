import fs from 'fs';
import path from 'path';
import React from 'react';
import { wait, render, cleanup, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';
import EasyGraphQLTester from 'easygraphql-tester';
import UserDetails from '../../../components/Industry/UserDetails';

const first = 'Hamza';
const last = 'Javed';
const role = 'frontend developer';
const phone = '6042999395';
const email = 'hamza@button.is';
const rowId = 1;
const rowIdUserDetails = 0;
const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../server', 'schema.graphql'),
  'utf8'
);
const mutation1 = `
mutation UserDetailsMutation($input: UpdateUserByRowIdInput!) {
    updateUserByRowId(input: $input) {
      user {
        rowId
        
      }
    }
  }
`;
const mutation2 = `
mutation UserDetailsUpdateMutation($input: UpdateUserDetailByRowIdInput!) {
    updateUserDetailByRowId(input: $input) {
      userDetail {
        rowId

      }
    }
  }
`;

describe('UserDetails', () => {
  afterEach(cleanup);
  it('rendered correctly', async () => {
    const r = render(
      <UserDetails
        firstName={first}
        lastName={last}
        role={role}
        phone={phone}
        email={email}
        rowId={rowId}
        rowIdUserDetails={rowIdUserDetails}
      />
    );
    await wait(() => r.getAllByText('Hamza'));
    expect(r).toMatchSnapshot();
  });
  it('passes props correctly', () => {
    const wrapper = shallow(
      <UserDetails
        firstName={first}
        lastName={last}
        role={role}
        phone={phone}
        email={email}
        rowId={rowId}
        rowIdUserDetails={rowIdUserDetails}
      />
    );
    expect(wrapper.instance().props).toEqual({
      firstName: 'Hamza',
      lastName: 'Javed',
      role: 'frontend developer',
      phone: '6042999395',
      email: 'hamza@button.is',
      rowId: 1,
      rowIdUserDetails: 0
    });
  });
  it('edit button should render table', () => {
    const { getByTestId } = render(<UserDetails
      firstName={first}
      lastName={last}
      role={role}
      phone={phone}
      email={email}
      rowId={rowId}
      rowIdUserDetails={rowIdUserDetails}
    />);
    fireEvent.click(getByTestId('button-edit'));
    expect(getByTestId('form-edit')).toBeDefined();
    expect(getByTestId('button-submit')).toBeDefined();
  });
  it('form elements should be editable', () => {
    const { getByTestId, getByLabelText } = render(<UserDetails
      firstName={first}
      lastName={last}
      role={role}
      phone={phone}
      email={email}
      rowId={rowId}
      rowIdUserDetails={rowIdUserDetails} />);
    fireEvent.click(getByTestId('button-edit'));
    fireEvent.change(getByLabelText('First Name'), { target: { value: "Helen" } });
    expect(getByLabelText('First Name').value).toEqual("Helen");
  });
  it('submit button should collapse form', () => {
    const { getByTestId } = render(<UserDetails
      firstName={first}
      lastName={last}
      role={role}
      phone={phone}
      email={email}
      rowId={rowId}
      rowIdUserDetails={rowIdUserDetails} />);
    fireEvent.click(getByTestId('button-edit'));
    fireEvent.click(getByTestId('button-submit'));
    expect({ getByTestId }).not.toContain('form-edit');
  })
});

describe('mutation1 test', () => {
  let tester;
  beforeEach(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });

  it('produces error if incomplete input', () => {
    let error;
    try {
      tester.mock(mutation1, {
        input: {
          rowId: 1
        }
      });
    } catch (error2) {
      error = error2;
    }
  });

  it('ouputs correct rowId', () => {
    const test = tester.mock(mutation1, {
      input: {
        rowId: 1,
        userPatch: {
          firstName: 'Hamza',
          lastName: 'Javed',
          emailAddress: 'hamza@button.is'
        }
      }
    });
    expect(test).toBeDefined();
    expect(typeof test.data.updateUserByRowId.user.rowId).toBe('number');
  });

  describe('mutation2 test', () => {
    let tester;
    beforeEach(() => {
      tester = new EasyGraphQLTester(schemaCode);
    });

    it('produces error if incomplete input', () => {
      let error;
      try {
        tester.mock(mutation2, {
          input: {
            rowId: 1
          }
        });
      } catch (error2) {
        error = error2;
      }
    });

    it('ouputs correct rowId', () => {
      const test = tester.mock(mutation2, {
        input: {
          rowId: 1,
          userDetailPatch: {
            userId: 1,
            role: 'frontend developer',
            phone: '6042999395',
            email: 'hamza@button.is'
          }
        }
      });
      expect(test).toBeDefined();
      expect(typeof test.data.updateUserDetailByRowId.userDetail.rowId).toBe(
        'number'
      );
    });
  });
});
