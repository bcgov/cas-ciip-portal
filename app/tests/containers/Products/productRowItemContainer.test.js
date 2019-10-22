import {shallow} from 'enzyme';
import React from 'react';
import {ProductRowItemContainer} from '../../../containers/Products/ProductRowItemContainer';

const product = {
  id: 'product-1',
  rowId: 9,
  name: 'Milk',
  description: 'Sustenance for baby cows',
  state: 'active',
  parent: null,
  createdAt: 'foo',
  createdBy: 'foo',
  benchmarksByProductId: {
    edges: [
      {
        node: {
          rowId: 1,
          benchmark: 10,
          eligibilityThreshold: 20,
          startDate: null,
          endDate: null,
          deletedAt: null,
          deletedBy: null
        }
      }
    ]
  }
};

const productRowActions = {
  toggleProductMode: jest.fn(),
  toggleBenchmarkMode: jest.fn(),
  openConfirmationWindow: jest.fn(),
  closeConfirmationWindow: jest.fn(),
  toggleBenchmarkDeleted: jest.fn()
};

let render;
describe('ProductRowItemContainer', () => {
  describe('with active product', () => {
    beforeAll(() => {
      render = shallow(
        <ProductRowItemContainer
          product={product}
          productRowActions={productRowActions}
        />
      );
    });

    it('should render the product row item', () => {
      expect(render).toMatchSnapshot();
    });

    it('should toggle product mode when I click edit product button', () => {
      const calls = productRowActions.toggleProductMode.mock.calls.length;
      render.find('Button.edit-product').simulate('click');
      expect(productRowActions.toggleProductMode.mock.calls.length).toBe(
        calls + 1
      );
    });

    it('should toggle benchmark mode when I click edit product button', () => {
      const calls = productRowActions.toggleBenchmarkMode.mock.calls.length;
      render.find('Button.edit-benchmark').simulate('click');
      expect(productRowActions.toggleBenchmarkMode.mock.calls.length).toBe(
        calls + 1
      );
    });

    it('should toggle benchmark on secondary variant', () => {
      const calls = productRowActions.toggleBenchmarkMode.mock.calls.length;
      render.find('Button.secondary-toggle-benchmark-mode').simulate('click');
      expect(productRowActions.toggleBenchmarkMode.mock.calls.length).toBe(
        calls + 1
      );
    });

    it('should open confirmation window when I click the archive button', () => {
      const calls = productRowActions.openConfirmationWindow.mock.calls.length;
      render.find('Button.archive-benchmark').simulate('click');
      expect(productRowActions.openConfirmationWindow.mock.calls.length).toBe(
        calls + 1
      );
    });

    // TODO: avoid using nativeEvent
    it.skip('should save on submit', () => {
      const calls = productRowActions.toggleBenchmarkMode.mock.calls.length;
      render.find('form.save-benchmark').simulate('submit');
      expect(productRowActions.toggleBenchmarkMode.mock.calls.length).toBe(
        calls + 1
      );
    });
  });

  describe('with archived product', () => {
    beforeAll(() => {
      render = shallow(
        <ProductRowItemContainer
          product={{...product, state: 'archived'}}
          productRowActions={productRowActions}
        />
      );
    });

    it('should render the product row item', () => {
      expect(render).toMatchSnapshot();
    });
  });

  // TODO: setting css class based on a prop breaks encapsulation
  const modes = ['view', 'product', 'benchmark'];
  modes.forEach(mode => {
    describe(`with mode set to ${mode}`, () => {
      beforeAll(() => {
        render = shallow(
          <ProductRowItemContainer
            mode={mode}
            product={product}
            productRowActions={productRowActions}
          />
        );
      });

      it(`should render the product row item with the ${mode} class`, () => {
        expect(render).toMatchSnapshot();
      });

      it.todo(`should add the ${mode} class to the benchmark editor`);
      it.todo(`should add the ${mode} class to the product editor`);
      it.todo(`should add the ${mode} class to the item editor`);
    });
  });

  describe('with confirmation modal open', () => {
    beforeAll(() => {
      render = shallow(
        <ProductRowItemContainer
          confirmationModalOpen
          product={product}
          productRowActions={productRowActions}
        />
      );
    });

    it('should close confirmation window when I click the no button', () => {
      const calls = productRowActions.closeConfirmationWindow.mock.calls.length;
      render.find('Button.close-confirmation-window').simulate('click');
      expect(productRowActions.closeConfirmationWindow.mock.calls.length).toBe(
        calls + 1
      );
    });

    // TODO: CurrentBenchmark needs isolation
    it.skip('should mark benchmark deleted when I click the yes button', () => {
      const calls = productRowActions.toggleBenchmarkDeleted.mock.calls.length;
      render.find('Button.toggle-benchmark-deleted').simulate('click');
      expect(productRowActions.toggleBenchmarkDeleted.mock.calls.length).toBe(
        calls + 1
      );
    });
  });
});
