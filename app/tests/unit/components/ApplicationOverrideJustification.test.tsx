import React from 'react';
import {mount, shallow} from 'enzyme';
import {ApplicationOverrideJustificationComponent} from 'components/Application/ApplicationOverrideJustification';

describe('OverrideJustification', () => {
  it('Should allow the user to save a justification if one is not currently active', async () => {
    const r = mount(
      <ApplicationOverrideJustificationComponent
        hasErrors
        applicationDetailsRendered
        overrideActive={false}
        setOverrideActive={jest.fn()}
        applicationOverrideJustification={null}
        revisionId="abc"
        relay={null}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('button.btn-success').text()).toBe('Save');
  });

  it('Should allow the user to edit a justification if one is currently active', async () => {
    const r = mount(
      <ApplicationOverrideJustificationComponent
        overrideActive
        hasErrors
        applicationDetailsRendered
        setOverrideActive={jest.fn()}
        applicationOverrideJustification="bad stuff"
        revisionId="abc"
        relay={null}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('button.btn-secondary').text()).toBe('Edit Justification');
  });

  it('Should allow the user to delete a justification if one is currently active', async () => {
    const r = mount(
      <ApplicationOverrideJustificationComponent
        overrideActive
        hasErrors
        applicationDetailsRendered
        setOverrideActive={jest.fn()}
        applicationOverrideJustification="bad stuff"
        revisionId="abc"
        relay={null}
      />
    );
    expect(r.find('button.btn-danger').text()).toBe('Delete Override');
  });

  it('Should not render the override justification box if the application has no errors', async () => {
    const r = shallow(
      <ApplicationOverrideJustificationComponent
        overrideActive
        applicationDetailsRendered
        hasErrors={false}
        setOverrideActive={jest.fn()}
        applicationOverrideJustification="bad stuff"
        revisionId="abc"
        relay={null}
      />
    );
    expect(r.exists('Alert')).toBe(false);
    expect(r.exists('AccordionCollapse')).toBe(false);
  });

  it('Should not render the override justification box if the ApplicationDetails component has not rendered', async () => {
    const r = shallow(
      <ApplicationOverrideJustificationComponent
        overrideActive
        hasErrors
        applicationDetailsRendered={false}
        setOverrideActive={jest.fn()}
        applicationOverrideJustification="bad stuff"
        revisionId="abc"
        relay={null}
      />
    );
    expect(r.exists('Alert')).toBe(false);
    expect(r.exists('AccordionCollapse')).toBe(false);
  });
});
