import React from 'react';
import LoadingOnClickButton from 'components/helpers/LoadingOnClickButton';
import {mount} from 'enzyme';

describe('the loading on click button', () => {
  it('renders its children in its normal state', () => {
    const rendered = mount(
      <LoadingOnClickButton loadingText="loading">
        test text
      </LoadingOnClickButton>
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('button').prop('disabled')).toBeFalse();
    expect(rendered.find('button').text()).toBe('test text');
  });

  it('renders the loading text when onclick has been clicked', () => {
    const blockingClickHandler = async () => {
      await new Promise(() => {
        // block forever
      });
    };

    const rendered = mount(
      <LoadingOnClickButton
        loadingText="loading"
        onClick={blockingClickHandler}
      >
        test text
      </LoadingOnClickButton>
    );

    rendered.find('button').simulate('click');

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('button').prop('disabled')).toBeTrue();
    expect(rendered.find('button').text()).toBe('loading');
  });
});
