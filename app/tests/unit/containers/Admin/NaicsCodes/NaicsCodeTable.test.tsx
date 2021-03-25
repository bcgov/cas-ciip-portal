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
                  id: 'abc',
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
                  id: 'abc',
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
                  id: 'abc',
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

  it('should open CreateNaicsCode modal component on New NAICS Code Button click', async () => {
    const renderer = shallow(
      <NaicsCodeTableContainer
        query={{
          ' $refType': 'NaicsCodeTable_query',
          allNaicsCodes: {
            __id: 'abc',
            edges: [
              {
                node: {
                  id: 'abc',
                  ' $fragmentRefs': {
                    NaicsCodeTableRow_naicsCode: true
                  }
                }
              }
            ]
          }
        }}
        relay={null}
      />
    );

    renderer.find('Button').first().simulate('click');

    expect(renderer.find('CreateNaicsCodeModal').prop('show')).toBe(true);
  });

  it('should call the create mutation on Form submit', async () => {
    const spy = jest.spyOn(
      require('mutations/naics_code/createNaicsCodeMutation'),
      'default'
    );
    spy.mockImplementation(() => null);
    const relay = {environment: null};
    const renderer = shallow(
      <NaicsCodeTableContainer
        query={{
          ' $refType': 'NaicsCodeTable_query',
          allNaicsCodes: {
            __id: 'abc',
            edges: [
              {
                node: {
                  id: 'abc',
                  ' $fragmentRefs': {
                    NaicsCodeTableRow_naicsCode: true
                  }
                }
              }
            ]
          }
        }}
        relay={relay as any}
      />
    );

    renderer.find('CreateNaicsCodeModal').prop('onSubmit')({
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
      persist: jest.fn(),
      currentTarget: {checkValidity: jest.fn(() => true)},
      target: [{value: 'a'}, {value: 'b'}, {value: 'c'}]
    } as any);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(null, {
      input: {
        ciipSectorInput: 'b',
        naicsCodeInput: 'a',
        naicsDescriptionInput: 'c'
      }
    });
  });
});
