import fs from 'fs';
import path from 'path';
import EasyGraphQLTester from 'easygraphql-tester';
import {mutation} from 'mutations/application_review_step/deleteReviewCommentMutation';

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../../server', 'schema.graphql'),
  'utf8'
);

const mutationString = (mutation as any).default.params.text;

describe('deleteReviewCommentMutation', () => {
  let tester;
  beforeEach(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });
  it('Should throw an error if input is missing', () => {
    let error;
    try {
      tester.mock(mutationString);
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" of required type "UpdateReviewCommentInput!" was not provided.'
    );
  });
  it('Should throw an error if a variable is missing', () => {
    let error;
    try {
      tester.mock(mutationString, {
        input: {
          id: 'abc'
        }
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" got invalid value { id: "abc" }; Field "reviewCommentPatch" of required type "ReviewCommentPatch!" was not provided.'
    );
  });
  it('Should return id(string) if valid', () => {
    const timestamp = '2021-04-09T23:21:34.601Z';
    const test = tester.mock(mutationString, {
      input: {
        id: 'abc',
        reviewCommentPatch: {
          deletedAt: timestamp
        }
      }
    });
    expect(test).toBeDefined();
    expect(typeof test.data.updateReviewComment.reviewComment.id).toBe(
      'string'
    );
  });
});
