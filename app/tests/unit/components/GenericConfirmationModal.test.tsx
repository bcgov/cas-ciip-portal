import React from 'react';
import {shallow} from 'enzyme';
import GenericConfirmationModal from 'components/GenericConfirmationModal';

const getTestElement = ({
  size = undefined,
  title = 'Are you sure you want to continue?',
  show = true,
  onCancel = () => {},
  onConfirm = () => {},
  cancelButtonVariant = undefined,
  confirmButtonVariant = undefined,
  cancelButtonText = undefined,
  confirmButtonText = undefined,
  children = undefined
}) => {
  return children ? (
    <GenericConfirmationModal
      size={size}
      title={title}
      show={show}
      onCancel={onCancel}
      onConfirm={onConfirm}
      cancelButtonVariant={cancelButtonVariant}
      confirmButtonVariant={confirmButtonVariant}
      cancelButtonText={cancelButtonText}
      confirmButtonText={confirmButtonText}
    >
      {children}
    </GenericConfirmationModal>
  ) : (
    <GenericConfirmationModal
      size={size}
      title={title}
      show={show}
      onCancel={onCancel}
      onConfirm={onConfirm}
      cancelButtonVariant={cancelButtonVariant}
      confirmButtonVariant={confirmButtonVariant}
      cancelButtonText={cancelButtonText}
      confirmButtonText={confirmButtonText}
    />
  );
};

describe('Generic Confirmation Modal', () => {
  it('should render a default Bootstrap modal with Cancel and Confirm buttons (no body content)', () => {
    const wrapper = shallow(getTestElement({}));
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Modal').prop('show')).toBeTrue();
    // quirk of react-bootstrap: will only render a 'medium' size if left unspecified
    expect(wrapper.find('Modal').prop('size')).toBeUndefined();
    expect(wrapper.find('Button#cancel').exists()).toBeTrue();
    expect(wrapper.find('Button#confirm').exists()).toBeTrue();
  });
  it('should render a Bootstrap modal (with custom body content)', () => {
    const children = (
      <div>
        <p>
          There is something we want you to stop and consider before continuing.
        </p>
        <p>
          Here is some more detail you should be aware of before confirming this
          action.
        </p>
      </div>
    );
    const wrapper = shallow(getTestElement({children}));
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.contains(children)).toBeTrue();
  });
  it('displays the `title` prop as a heading', () => {
    const title = 'Test Title';
    const wrapper = shallow(getTestElement({title}));
    expect(wrapper.find('h2').text()).toEqual(title);
  });
  it('passes the `size` prop to the Bootstrap modal for customization', () => {
    const small = shallow(getTestElement({size: 'sm'}));
    const smallModal = small.find('Modal');
    expect(smallModal.prop('size')).toEqual('sm');
    const large = shallow(getTestElement({size: 'lg'}));
    const largeModal = large.find('Modal');
    expect(largeModal.prop('size')).toEqual('lg');
    const xLarge = shallow(getTestElement({size: 'xl'}));
    const xLargeModal = xLarge.find('Modal');
    expect(xLargeModal.prop('size')).toEqual('xl');
  });
  it('passes the `show` prop to the Bootstrap modal for customization', () => {
    const opened = shallow(getTestElement({show: true}));
    const openedModal = opened.find('Modal');
    expect(openedModal.prop('show')).toBeTrue();
    const closed = shallow(getTestElement({show: false}));
    const closedModal = closed.find('Modal');
    expect(closedModal.prop('show')).toBeFalse();
  });
  it('passes the confirm button variant to the Bootstrap button', () => {
    const wrapper = shallow(getTestElement({confirmButtonVariant: 'danger'}));
    const button = wrapper.find('Button#confirm');
    expect(button.prop('variant')).toEqual('danger');
  });
  it('passes the cancel button variant to the Bootstrap button', () => {
    const wrapper = shallow(
      getTestElement({cancelButtonVariant: 'outline-danger'})
    );
    const button = wrapper.find('Button#cancel');
    expect(button.prop('variant')).toEqual('outline-danger');
  });
  it('renders custom Confirm button text', () => {
    const wrapper = shallow(getTestElement({confirmButtonText: 'Yep'}));
    const button = wrapper.find('Button#confirm');
    expect(button.text()).toEqual('Yep');
  });
  it('renders custom Cancel button text', () => {
    const wrapper = shallow(getTestElement({cancelButtonText: 'Nope'}));
    const button = wrapper.find('Button#cancel');
    expect(button.text()).toEqual('Nope');
  });
  it('fires the onConfirm handler when the Confirm button is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(getTestElement({onConfirm: spy}));
    wrapper.find('Button#confirm').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('fires the onCancel handler when the Cancel button is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(getTestElement({onCancel: spy}));
    wrapper.find('Button#cancel').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('fires the onCancel handler when the dialog is exited by means other than the Cancel button', () => {
    const spy = jest.fn();
    const wrapper = shallow(getTestElement({onCancel: spy}));
    const modalOnHide: () => void = wrapper.find('Modal').prop('onHide');
    expect(modalOnHide).toBe(spy);
    expect(spy).toHaveBeenCalledTimes(0);
    modalOnHide();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
