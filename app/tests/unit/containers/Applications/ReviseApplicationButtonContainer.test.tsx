import React from 'react';
import {shallow} from 'enzyme';
import {ReviseApplicationButton} from 'containers/Applications/ReviseApplicationButtonContainer';

describe('The ReviseApplicationButton', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');
  useRouter.mockImplementation(() => {
    return {query: {version: 1}};
  });

  it('should render a "Revise" button when the version being viewed === the latest draft version (there is not yet a newer draft)', () => {
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
