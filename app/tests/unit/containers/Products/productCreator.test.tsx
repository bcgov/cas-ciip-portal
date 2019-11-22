import React from 'react';
import {shallow, mount} from 'enzyme';
import {ProductCreator} from 'containers/Products/ProductCreatorContainer';

describe('ProductCreator', () => {
  describe('render()', () => {
    let render;

    beforeAll(() => {
      render = mount(
        <ProductCreator
          expanded
          relay={null}
          resetForm={jest.fn()}
          createProductFormKey={1}
        />
      );
    });

    it('should match the last usable snapshot', async () => {
      expect(render).toMatchSnapshot();
    });

    it('should render the product name field', async () => {
      expect(
        render
          .find('label')
          .filter('[htmlFor="root_product"]')
          .text()
      ).toBe('Product*');
    });

    it('should render the product desc field', async () => {
      expect(
        render
          .find('label')
          .filter('[htmlFor="root_description"]')
          .text()
      ).toBe('Description');
    });

    it('should render the Create Product button', async () => {
      expect(render.find('Button[type="submit"]').text()).toBe('Add Product');
    });
  });

  describe('mutations', () => {
    it.todo('is tested');
  });
});
