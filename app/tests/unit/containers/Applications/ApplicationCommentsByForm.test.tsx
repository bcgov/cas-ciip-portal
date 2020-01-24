import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationCommentsByForm} from 'containers/Applications/ApplicationCommentsByForm';

describe('ApplicationCommentsComponent', () => {
  it('should match the snapshot with the ApplicationCommentsByForm component', async () => {
    const renderer = shallow(
      <ApplicationCommentsByForm
        relay={null}
        review={false}
        reviewComment={{
          ' $refType': 'ApplicationCommentsByForm_reviewComment',
          id: 'abc',
          description: 'fix it',
          createdAt: '2019-12-12',
          resolved: false,
          commentType: 'GENERAL',
          applicationByApplicationId: {
            id: '1'
          },
          ciipUserByCreatedBy: {
            firstName: 'Test',
            lastName: 'Test'
          }
        }}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
  it('should render the comment description', async () => {
    const renderer = shallow(
      <ApplicationCommentsByForm
        relay={null}
        review={false}
        reviewComment={{
          ' $refType': 'ApplicationCommentsByForm_reviewComment',
          id: 'abc',
          description: 'fix it',
          createdAt: '2019-12-12',
          resolved: false,
          commentType: 'GENERAL',
          applicationByApplicationId: {
            id: '1'
          },
          ciipUserByCreatedBy: {
            firstName: 'Test',
            lastName: 'Test'
          }
        }}
      />
    );
    expect(renderer.find('td .description').text()).toBe('fix it');
  });
  it('should render the createdAt date', async () => {
    const renderer = shallow(
      <ApplicationCommentsByForm
        relay={null}
        review={false}
        reviewComment={{
          ' $refType': 'ApplicationCommentsByForm_reviewComment',
          id: 'abc',
          description: 'fix it',
          createdAt: '2019-12-12',
          resolved: false,
          commentType: 'GENERAL',
          applicationByApplicationId: {
            id: '1'
          },
          ciipUserByCreatedBy: {
            firstName: 'Test',
            lastName: 'Test'
          }
        }}
      />
    );
    expect(renderer.find('small').text()).toBe(
      'Test Test (Dec 12th 2019, 12:00 am)'
    );
  });
  it('should not render the resolve button if review prop is false', async () => {
    const renderer = shallow(
      <ApplicationCommentsByForm
        relay={null}
        review={false}
        reviewComment={{
          ' $refType': 'ApplicationCommentsByForm_reviewComment',
          id: 'abc',
          description: 'fix it',
          createdAt: '2019-12-12',
          resolved: false,
          commentType: 'GENERAL',
          applicationByApplicationId: {
            id: '1'
          },
          ciipUserByCreatedBy: {
            firstName: 'Test',
            lastName: 'Test'
          }
        }}
      />
    );
    expect(renderer.exists('Button.resolve-check')).toBe(false);
  });
  it('should render the resolve button if review prop is true', async () => {
    const renderer = shallow(
      <ApplicationCommentsByForm
        review
        relay={null}
        reviewComment={{
          ' $refType': 'ApplicationCommentsByForm_reviewComment',
          id: 'abc',
          description: 'fix it',
          createdAt: '2019-12-12',
          resolved: false,
          commentType: 'GENERAL',
          applicationByApplicationId: {
            id: '1'
          },
          ciipUserByCreatedBy: {
            firstName: 'Test',
            lastName: 'Test'
          }
        }}
      />
    );
    expect(renderer.exists('Button.resolve-check')).toBe(true);
  });
  it('should render the resolve button as un-checked if resolved = true', async () => {
    const renderer = shallow(
      <ApplicationCommentsByForm
        review
        relay={null}
        reviewComment={{
          ' $refType': 'ApplicationCommentsByForm_reviewComment',
          id: 'abc',
          description: 'fix it',
          createdAt: '2019-12-12',
          resolved: false,
          commentType: 'GENERAL',
          applicationByApplicationId: {
            id: '1'
          },
          ciipUserByCreatedBy: {
            firstName: 'Test',
            lastName: 'Test'
          }
        }}
      />
    );
    expect(renderer.find('Button.resolve-check').text()).toBe('Resolve');
  });
  it('should render the resolve button as checked if resolved = true', async () => {
    const renderer = shallow(
      <ApplicationCommentsByForm
        review
        relay={null}
        reviewComment={{
          ' $refType': 'ApplicationCommentsByForm_reviewComment',
          id: 'abc',
          description: 'fix it',
          createdAt: '2019-12-12',
          resolved: true,
          commentType: 'GENERAL',
          applicationByApplicationId: {
            id: '1'
          },
          ciipUserByCreatedBy: {
            firstName: 'Test',
            lastName: 'Test'
          }
        }}
      />
    );
    expect(renderer.find('Button.resolve-check').text()).toBe('Unresolve');
  });
});
