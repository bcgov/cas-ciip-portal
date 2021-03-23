import React from 'react';
import {shallow} from 'enzyme';
import {NaicsCodeTableContainer} from 'containers/Admin/NaicsCode/NaicsCodeTable';

describe('NaicsCodeTable', () => {
  it('should match the snapshot with the NaicsCodeTable container', async () => {
    const renderer = shallow(
      <NaicsCodeTableContainer
        relay={null}
        query={{
          ' $refType': 'NaicsCodeTable_query',
          allNaicsCodes: {
            __id: 'abc',
            edges: [
              {
                node: {
                  ' $fragmentRefs': {
                    NaicsCodeTableRow_naicsCode: true
                  }
                }
              }
            ]
          }
        }}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
  it('should render the NaicsCodeTableRow container', async () => {
    const renderer = shallow(
      <NaicsCodeTableContainer
        relay={null}
        query={{
          ' $refType': 'NaicsCodeTable_query',
          allNaicsCodes: {
            __id: 'abc',
            edges: [
              {
                node: {
                  ' $fragmentRefs': {
                    NaicsCodeTableRow_naicsCode: true
                  }
                }
              }
            ]
          }
        }}
      />
    );
    expect(renderer.exists('Relay(NaicsCodeTableRowContainer)')).toBe(true);
  });

  it('should render the CreateNaicsCode modal component', async () => {
    const renderer = shallow(
      <NaicsCodeTableContainer
        relay={null}
        query={{
          ' $refType': 'NaicsCodeTable_query',
          allNaicsCodes: {
            __id: 'abc',
            edges: [
              {
                node: {
                  ' $fragmentRefs': {
                    NaicsCodeTableRow_naicsCode: true
                  }
                }
              }
            ]
          }
        }}
      />
    );
    expect(renderer.exists('CreateNaicsCodeModal')).toBe(true);
  });
});
