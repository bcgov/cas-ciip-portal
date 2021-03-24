import React from 'react';
import {shallow} from 'enzyme';
import {CreateNaicsCodeModal} from 'components/Admin/CreateNaicsCodeModal';

describe('CreateNaicsCodeModal', () => {
  it('should match the snapshot with the NaicsCodeTable container', async () => {
    const renderer = shallow(
      <CreateNaicsCodeModal
        validated
        show
        onSubmit={jest.fn()}
        onClose={jest.fn()}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
  it('should call handleCreateNaicsCode when the form is submitted', async () => {
    const handleSubmit = jest.fn();
    const renderer = shallow(
      <CreateNaicsCodeModal
        validated
        show
        onSubmit={handleSubmit}
        onClose={jest.fn()}
      />
    );
    renderer.find('Form').prop('onSubmit')({});
    expect(handleSubmit).toBeCalledTimes(1);
  });
});
