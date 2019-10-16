import React from 'react';
import {shallow} from 'enzyme';
import {ProductCreatorContainer} from '../../../containers/Products/ProductCreatorContainer';

describe('ProductCreatorContainer', () => {
  describe('render()', () => {
    let render;

    beforeAll(() => {
      render = shallow(<ProductCreatorContainer />);
    });

    it('should match the last usable snapshot', async () => {
      expect(render).toMatchSnapshot();
    });

    it('should render the product name field', async () => {
      expect(
        render
          .find('FormGroup[controlId="product_name"]')
          .find('FormLabel')
          .text()
      ).toBe('Product Name');
    });

    it('should render the product desc field', async () => {
      expect(
        render
          .find('FormGroup[controlId="product_description"]')
          .find('FormLabel')
          .text()
      ).toBe('Product Description');
    });

    it('should render the Create Product button', async () => {
      expect(render.find('Button[type="submit"]').text()).toBe(
        'Create Product'
      );
    });
  });

  describe('mutations', () => {
    it.todo('is tested');
  });
});
