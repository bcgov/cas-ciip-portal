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
});
