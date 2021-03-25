import React from 'react';
import {shallow} from 'enzyme';
import {NaicsCodeTableRowContainer} from 'containers/Admin/NaicsCode/NaicsCodeTableRow';

describe('NaicsCodeTable', () => {
  it('should match the snapshot with the NaicsCodeTableRow container', async () => {
    const renderer = shallow(
      <NaicsCodeTableRowContainer
        relay={null}
        connectionId="connection"
        naicsCode={{
          ' $refType': 'NaicsCodeTableRow_naicsCode',
          id: 'abc',
          naicsCode: 'code',
          ciipSector: 'sector',
          naicsDescription: 'description',
          deletedAt: null
        }}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
  it('should open the confimation modal delete button click', async () => {
    const renderer = shallow(
      <NaicsCodeTableRowContainer
        relay={null}
        connectionId="connection"
        naicsCode={{
          ' $refType': 'NaicsCodeTableRow_naicsCode',
          id: 'abc',
          naicsCode: 'code',
          ciipSector: 'sector',
          naicsDescription: 'description',
          deletedAt: null
        }}
      />
    );

    renderer.find('td').at(3).find('Button').simulate('click');

    expect(renderer.find('DeleteConfirmationModal').prop('show')).toBe(true);
  });

  it('should call the update mutation on confirmation', async () => {
    const spy = jest
      .spyOn(require('mutations/naics_code/updateNaicsCodeMutation'), 'default')
      .mockImplementation(() => null);
    const relay = {environment: null};
    const renderer = shallow(
      <NaicsCodeTableRowContainer
        relay={relay as any}
        connectionId="connection"
        naicsCode={{
          ' $refType': 'NaicsCodeTableRow_naicsCode',
          id: 'abc',
          naicsCode: 'code',
          ciipSector: 'sector',
          naicsDescription: 'description',
          deletedAt: null
        }}
      />
    );

    renderer.find('DeleteConfirmationModal').prop('handleDelete')({} as any);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(
      null,
      {
        input: {
          id: 'abc',
          naicsCodePatch: {
            ciipSector: 'sector',
            deletedAt: expect.any(String),
            naicsCode: 'code',
            naicsDescription: 'description'
          }
        }
      },
      'connection'
    );
  });
});
