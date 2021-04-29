import React from 'react';
import {act} from 'react-dom/test-utils';
import {shallow, mount} from 'enzyme';
import {AddReviewCommentModal} from 'components/Admin/ApplicationReview/AddReviewCommentModal';

const getTestElement = ({
  show = true,
  title = '',
  onSubmit = () => {},
  onHide = () => {}
}) => {
  return (
    <AddReviewCommentModal
      show={show}
      title={title}
      onSubmit={onSubmit}
      onHide={onHide}
    />
  );
};

describe('Add Review Comment modal', () => {
  it('matches the last accepted snapshot ("internal" left unchecked)', () => {
    const wrapper = shallow(getTestElement({}));
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a Bootstrap modal', () => {
    const wrapper = shallow(getTestElement({}));
    expect(wrapper.find('Modal').exists()).toBeTrue();
  });
  it('passes the `show` prop to the Bootstrap modal', () => {
    const shown = shallow(getTestElement({show: true}));
    expect(shown.find('Modal').prop('show')).toBeTrue();
    const hidden = shallow(getTestElement({show: false}));
    expect(hidden.find('Modal').prop('show')).toBeFalse();
  });
  it('renders the `title` prop as a heading', () => {
    const title = 'Test Title';
    const wrapper = shallow(getTestElement({title}));
    expect(wrapper.find('ModalHeader').text()).toInclude(title);
  });
  it('clicking "Add Comment" fires the `onSubmit` prop, only if comment is not empty', () => {
    const testComment = 'Typing a test comment';
    const spy = jest.fn();
    const wrapper = mount(getTestElement({onSubmit: spy}));
    const textarea = wrapper.find('Modal').first().find('textarea');
    const button = wrapper.find('Button#submit');
    expect(button.exists()).toBeTrue();
    expect(spy).not.toHaveBeenCalled();
    button.simulate('click');
    expect(spy).not.toHaveBeenCalled();
    // Fill the form as the user would, before attempting to reset:
    act(() => {
      textarea.simulate('change', {target: {value: testComment}});
    });
    expect(textarea.text()).toEqual(testComment);
    button.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('closing the Bootstrap modal fires the `onHide` prop', () => {
    const spy = jest.fn();
    const wrapper = shallow(getTestElement({onHide: spy}));
    const modalOnHide: () => void = wrapper.find('Modal').prop('onHide');
    expect(spy).not.toHaveBeenCalled();
    modalOnHide();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('closing the Bootstrap modal clears the form', () => {
    const testComment = 'Typing a test comment';
    const wrapper = mount(getTestElement({}));
    const textarea = wrapper.find('Modal').first().find('textarea');

    // Fill the form as the user would, before attempting to reset:
    act(() => {
      textarea.simulate('change', {target: {value: testComment}});
    });
    expect(textarea.text()).toEqual(testComment);
    const modalOnHide: () => void = wrapper
      .find('Modal#add-comment-modal')
      .first()
      .prop('onHide');
    act(() => {
      modalOnHide();
    });
    expect(textarea.text()).toEqual('');
  });
});
