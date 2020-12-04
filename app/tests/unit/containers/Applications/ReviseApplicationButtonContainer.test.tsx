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
          latestDraftRevision: {
            versionNumber: 1
          },
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

  it('should render a "View most recent submission" button when viewing an older submission (viewed version < last submitted version)', () => {
    const r = shallow(
      <ReviseApplicationButton
        relay={null}
        application={{
          ' $refType': 'ReviseApplicationButtonContainer_application',
          id: 'foo',
          rowId: 1,
          latestDraftRevision: {
            versionNumber: 2
          },
          latestSubmittedRevision: {
            versionNumber: 2
          }
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('View most recent submission');
  });

  it('should render a "Resume latest draft" button when a new draft exists (but has not yet been submitted)', () => {
    const r = shallow(
      <ReviseApplicationButton
        relay={null}
        application={{
          ' $refType': 'ReviseApplicationButtonContainer_application',
          id: 'foo',
          rowId: 1,
          latestDraftRevision: {
            versionNumber: 2
          },
          latestSubmittedRevision: {
            versionNumber: 1
          }
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('Resume latest draft');
  });
});
