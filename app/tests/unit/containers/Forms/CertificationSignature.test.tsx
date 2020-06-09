import React from 'react';
import {shallow} from 'enzyme';
import {CertificationSignature} from 'containers/Forms/CertificationSignature';

describe('The Confirmation Component', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(
      <CertificationSignature
        certificationIdsToSign={[]}
        reportSubmissions={null}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('allows the certifier to sign if no signature exists', () => {
    const wrapper = shallow(
      <CertificationSignature
        certificationIdsToSign={[]}
        reportSubmissions={null}
        relay={null}
      />
    );
    expect(wrapper.find('Button').at(0).text()).toBe('Sign');
  });

  it('displays a success message if the application has been signed', () => {
    const wrapper = shallow(
      <CertificationSignature
        submitted
        certificationIdsToSign={[]}
        reportSubmissions={null}
        relay={null}
      />
    );
    expect(wrapper.find('span').text()).toBe('Signed Successfully!');
  });
});
