import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ApplicationCommentsContainer_query} from 'ApplicationCommentsContainer_query.graphql';
import ApplicationCommentsBox from './ApplicationCommentsByForm';

/*
 * The ApplicationComments renders all the comments on the various sections of the application
 */

interface Props {
  query: ApplicationCommentsContainer_query;
  relay: RelayProp;
}

export const ApplicationCommentsComponent: React.FunctionComponent<Props> = props => {
  const formResults = props.query.application.formResultsByApplicationId.edges;

  return (
    <>
      {formResults.map(({node}) => {
        const applicationReviews = node.applicationReviewsByFormResultId.edges;
        return (
          <div key={node.id} className="form-result-box">
            <div>
              <h5> {node.formJsonByFormId.name} </h5>
            </div>
            {applicationReviews.map(({node}) => {
              return (
                <ApplicationCommentsBox
                  key={node.id}
                  applicationReview={node}
                />
              );
            })}
          </div>
        );
      })}
      <style jsx>{`
        .form-result-box {
          padding: 25px;
          margin-bottom: 20px;
          border: 1px solid #ff713a;
          border-radius: 5px;
          background-color: #fff4dcab;
          font-size: 14px;
        }

        .form-result-box h5 {
          border-bottom: 1px solid #888;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }

        .form-result-box .review-box {
          border-bottom: 1px solid #d2d2d2;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default createFragmentContainer(ApplicationCommentsComponent, {
  query: graphql`
    fragment ApplicationCommentsContainer_query on Query
      @argumentDefinitions(applicationId: {type: "ID!"}) {
      application(id: $applicationId) {
        formResultsByApplicationId {
          edges {
            node {
              id
              formJsonByFormId {
                name
              }
              applicationReviewsByFormResultId {
                edges {
                  node {
                    id
                    ...ApplicationCommentsByForm_applicationReview
                  }
                }
              }
            }
          }
        }
      }
    }
  `
});
