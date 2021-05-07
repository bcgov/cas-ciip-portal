import fs from 'fs';
import path from 'path';
import EasyGraphQLTester from 'easygraphql-tester';
import {mutation} from 'mutations/application_review_step/createReviewCommentMutation';

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../../server', 'schema.graphql'),
  'utf8'
);

const mutationString = (mutation as any).default.params.text;

describe('updateApplicationReviewStepMutation', () => {
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
      'Variable "$input" of required type "CreateReviewCommentInput!" was not provided.'
    );
  });
  it('Should throw an error if a variable is missing', () => {
    let error;
    try {
      tester.mock(mutationString, {
        input: {
          reviewComment: {
            commentType: 'GENERAL',
            description: 'here is a comment'
          }
        }
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" got invalid value { commentType: "GENERAL", description: "here is a comment" } at "input.reviewComment"; Field "applicationReviewStepId" of required type "Int!" was not provided.'
    );
  });
  it('Should return id(string) if valid', () => {
    const test = tester.mock(mutationString, {
      input: {
        reviewComment: {
          applicationReviewStepId: 1
        }
      }
    });

    expect(test).toBeDefined();
    expect(typeof test.data.createReviewComment.reviewCommentEdge.node.id).toBe(
      'string'
    );
  });
  it('Should return the comment details if valid', () => {
    const test = tester.mock(mutationString, {
      input: {
        reviewComment: {
          applicationReviewStepId: 1,
          description: 'comment',
          commentType: 'GENERAL'
        }
      }
    });

    expect(test).toBeDefined();
    const returnedNode = test.data.createReviewComment.reviewCommentEdge.node;
    expect(typeof returnedNode.id).toBe('string');
    expect(returnedNode.createdAt).toBeDefined();
    expect(returnedNode.resolved).toBeDefined();
  });
});
