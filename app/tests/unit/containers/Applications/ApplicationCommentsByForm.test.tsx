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
          resolved: false
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
          resolved: false
        }}
      />
    );
    expect(renderer.find('td').text()).toBe('fix it');
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
          resolved: false
        }}
      />
    );
    expect(renderer.find('small').text()).toBe('Dec 12th 2019, 12:00:00 am');
  });
  it('should not render the resolve checkbox if review prop is false', async () => {
    const renderer = shallow(
      <ApplicationCommentsByForm
        relay={null}
        review={false}
        reviewComment={{
          ' $refType': 'ApplicationCommentsByForm_reviewComment',
          id: 'abc',
          description: 'fix it',
          createdAt: '2019-12-12',
          resolved: false
        }}
      />
    );
    expect(renderer.exists('FormCheck')).toBe(false);
  });
  it('should render the resolve checkbox if review prop is true', async () => {
    const renderer = shallow(
      <ApplicationCommentsByForm
        review
        relay={null}
        reviewComment={{
          ' $refType': 'ApplicationCommentsByForm_reviewComment',
          id: 'abc',
          description: 'fix it',
          createdAt: '2019-12-12',
          resolved: false
        }}
      />
    );
    expect(renderer.exists('FormCheck')).toBe(true);
  });
  it('should render the resolve checkbox as un-checked if resolved = true', async () => {
    const renderer = shallow(
      <ApplicationCommentsByForm
        review
        relay={null}
        reviewComment={{
          ' $refType': 'ApplicationCommentsByForm_reviewComment',
          id: 'abc',
          description: 'fix it',
          createdAt: '2019-12-12',
          resolved: false
        }}
      />
    );
    expect(renderer.find('FormCheck').prop('checked')).toBe(false);
  });
  it('should render the resolve checkbox as checked if resolved = true', async () => {
    const renderer = shallow(
      <ApplicationCommentsByForm
        review
        relay={null}
        reviewComment={{
          ' $refType': 'ApplicationCommentsByForm_reviewComment',
          id: 'abc',
          description: 'fix it',
          createdAt: '2019-12-12',
          resolved: true
        }}
      />
    );
    expect(renderer.find('FormCheck').prop('checked')).toBe(true);
  });
});
