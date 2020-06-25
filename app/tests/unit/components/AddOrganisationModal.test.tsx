import React from 'react';
import {mount} from 'enzyme';
import AddOrganisationFacility from 'components/AddOrganisationModal';

describe('AddOrganisationFacility Component', () => {
  it('should match the last snapshot', () => {
    const render = mount(
      <AddOrganisationFacility onAddOrganisation={jest.fn()} />
    );
    expect(render).toMatchSnapshot();
  });

  it("should render the 'Click here to add a new Operator.' Link when passed the onAddOrganisation prop", () => {
    const render = mount(
      <AddOrganisationFacility onAddOrganisation={jest.fn()} />
    );
    expect(render.find('Button').text()).toBe('Add Operator +');
  });
});
