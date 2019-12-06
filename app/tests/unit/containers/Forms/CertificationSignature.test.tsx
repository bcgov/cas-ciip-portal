import React from 'react';
import {shallow} from 'enzyme';
import {CertificationSignatureComponent} from 'containers/Forms/CertificationSignature';

describe('The Confirmation Component', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(
      <CertificationSignatureComponent
        application={{
          ' $refType': 'CertificationSignature_application',
          id: 'abc',
          rowId: 1,
          certificationSignature: undefined,
          applicationStatus: {
            id: 'def'
          }
        }}
        relay={null}
        user={1}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('allows the certifier to sign if no signature exists', () => {
    const wrapper = shallow(
      <CertificationSignatureComponent
        application={{
          ' $refType': 'CertificationSignature_application',
          id: 'abc',
          rowId: 1,
          certificationSignature: undefined,
          applicationStatus: {
            id: 'def'
          }
        }}
        relay={null}
        user={1}
      />
    );
    expect(
      wrapper
        .find('Button')
        .at(0)
        .text()
    ).toBe('Sign');
  });

  it('allows the certifier to submit if the application has been signed', () => {
    const wrapper = shallow(
      <CertificationSignatureComponent
        application={{
          ' $refType': 'CertificationSignature_application',
          id: 'abc',
          rowId: 1,
          certificationSignature: 'signed',
          applicationStatus: {
            id: 'def'
          }
        }}
        relay={null}
        user={1}
      />
    );
    expect(
      wrapper
        .find('Button')
        .at(0)
        .text()
    ).toBe('Submit Application');
  });
});
