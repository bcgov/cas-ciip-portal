import React from 'react';
import {shallow} from 'enzyme';
import {ReviseApplicationButton} from 'containers/Applications/ReviseApplicationButtonContainer';

describe('The ReviseApplicationButton', () => {
  it('should render an button', () => {
    const r = shallow(
      <ReviseApplicationButton
        relay={null}
        application={{
          ' $refType': 'ReviseApplicationButtonContainer_application',
          id: 'foo',
          rowId: 1,
          latestSubmittedRevision: {
            versionNumber: 1
          }
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('Revise Application');
  });
});
