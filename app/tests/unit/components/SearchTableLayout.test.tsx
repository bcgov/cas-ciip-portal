import React from 'react';
import {shallow} from 'enzyme';
import {SearchTableLayoutComponent} from 'components/SearchTableLayout';
import {OrganisationRequestsTableRowComponent} from 'containers/Admin/OrganisationRequestsTableRow';

describe('SearchTableLayout', () => {
  const edges = [
    {
      node: {
        id: 'abc',
        status: null,
        userId: null,
        ciipUserByUserId: {
          firstName: 'a',
          lastName: 'b',
          emailAddress: 'c'
        },
        organisationByOrganisationId: {
          operatorName: 'a'
        }
      }
    }
  ];

  const body = (
    <tbody>
      <OrganisationRequestsTableRowComponent
        key={edges[0].node.id}
        userOrganisation={edges[0].node}
      />
    </tbody>
  );

  const emptyBody = {
    props: {
      children: []
    }
  };

  const displayNameToColumnNameMap = {
    'User ID': 'user_id',
    'First Name': 'first_name',
    'Last Name': 'last_name',
    Email: 'email_address',
    Operator: 'operator_name',
    Status: 'status',
    '': null
  };

  it('should render the proper headers', async () => {
    const r = shallow(
      <SearchTableLayoutComponent
        body={body}
        displayNameToColumnNameMap={displayNameToColumnNameMap}
        handleEvent={jest.fn()}
      />
    );
    expect(r).toMatchSnapshot();
    expect(
      r.find('SortableTableHeader').at(0).prop('headerVariables').displayName
    ).toBe('User ID');
    expect(
      r.find('SortableTableHeader').at(1).prop('headerVariables').displayName
    ).toBe('First Name');
    expect(
      r.find('SortableTableHeader').at(2).prop('headerVariables').displayName
    ).toBe('Last Name');
    expect(
      r.find('SortableTableHeader').at(3).prop('headerVariables').displayName
    ).toBe('Email');
    expect(
      r.find('SortableTableHeader').at(4).prop('headerVariables').displayName
    ).toBe('Operator');
    expect(
      r.find('SortableTableHeader').at(5).prop('headerVariables').displayName
    ).toBe('Status');
  });
  it('should render a table row if data is returned from the search query', async () => {
    const r = shallow(
      <SearchTableLayoutComponent
        body={body}
        displayNameToColumnNameMap={displayNameToColumnNameMap}
        handleEvent={jest.fn()}
      />
    );
    expect(r.exists('OrganisationRequestsTableRowComponent')).toBe(true);
  });
  it('should render an empty result message if no data is returned from the search query', async () => {
    const r = shallow(
      <SearchTableLayoutComponent
        body={emptyBody}
        displayNameToColumnNameMap={displayNameToColumnNameMap}
        handleEvent={jest.fn()}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('span').text()).toContain('No matching results');
  });
});
