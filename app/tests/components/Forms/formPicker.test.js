import React from 'react';
import {shallow} from 'enzyme';
import {queryMock} from '../../../lib/relayQueryMock';
import {FormPicker} from '../../../containers/Forms/FormPicker';

let mockAppQueryData;

describe('Form Loader', () => {
  describe('render()', () => {
    const query = {
      allFormJsons: {
        edges: [
          {
            node: {
              rowId: 1,
              id: 'WyJmb3JtX2pzb25zIiwxXQ==',
              name: 'Test form 1',
              formJson:
                '{"elements":[{"name":"customerName","type":"text","title":"1: What is your name?","isRequired":true}]}'
            }
          }
        ]
      }
    };

    const handleFormId = jest.fn();

    let render;
    beforeAll(() => {
      render = shallow(
        <FormPicker query={query} handleFormId={handleFormId} />
      );
    });

    it('should render the form', async () => {
      expect(render).toMatchSnapshot();
    });

    it('should have a dropdown button', () => {
      const DropdownButton = render.find('DropdownButton');
      expect(DropdownButton.prop('title')).toBe('Please select a form');
    });

    it('should have a clickable dropdown item', () => {
      const DropdownItem = render.find('DropdownItem');
      expect(DropdownItem.text()).toBe('Test form 1');
      DropdownItem.simulate('click');
      expect(handleFormId.mock.calls.length).toBe(1);
      expect(handleFormId.mock.calls[0]).toEqual([
        1,
        query.allFormJsons.edges[0].node.formJson
      ]);
    });
  });
});
