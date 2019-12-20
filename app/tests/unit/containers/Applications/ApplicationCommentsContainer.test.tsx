import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationCommentsComponent} from 'containers/Applications/ApplicationCommentsContainer';

describe('ApplicationCommentsComponent', () => {
  it('should match the snapshot with the ApplicationCommentsComponent component', async () => {
    const renderer = shallow(
      <ApplicationCommentsComponent
        relay={null}
        review={false}
        formResult={{
          ' $refType': 'ApplicationCommentsContainer_formResult',
          id: 'abc',
          applicationByApplicationId: {
            id: 'abc',
            rowId: 1
          },
          formJsonByFormId: {
            rowId: 1,
            name: 'ddd'
          },
          applicationComments: {
            edges: [
              {
                node: {
                  id: 'abc',
                  resolved: false,
                  ' $fragmentRefs': {
                    ApplicationCommentsByForm_reviewComment: true
                  }
                }
              }
            ]
          }
        }}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
  it('should render the ApplicationCommentsByForm component', async () => {
    const renderer = shallow(
      <ApplicationCommentsComponent
        relay={null}
        review={false}
        formResult={{
          ' $refType': 'ApplicationCommentsContainer_formResult',
          id: 'abc',
          applicationByApplicationId: {
            id: 'abc',
            rowId: 1
          },
          formJsonByFormId: {
            rowId: 1,
            name: 'ddd'
          },
          applicationComments: {
            edges: [
              {
                node: {
                  id: 'abc',
                  resolved: false,
                  ' $fragmentRefs': {
                    ApplicationCommentsByForm_reviewComment: true
                  }
                }
              }
            ]
          }
        }}
      />
    );
    expect(renderer.exists('Relay(ApplicationCommentsByForm)')).toBe(true);
  });
});
