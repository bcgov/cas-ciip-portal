import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {RequestedChangesByFormResult_application} from 'RequestedChangesByFormResult_application.graphql';
import ApplicationCommentsBox from './ApplicationCommentsByForm';

interface Props {
  application: RequestedChangesByFormResult_application;
  relay: RelayProp;
}

export const RequestedChangesByFormResult: React.FunctionComponent<Props> = props => {
  const formResults = props.application.formResultsByApplicationId.edges;
  return (
    <>
      {formResults.map(({node}) => {
        const applicationReviews = node.requestedChanges.edges;
        if (applicationReviews.length === 0) return null;
        return (
          <div key={node.id} className="form-result-box">
            <div>
              <h5>{node.formJsonByFormId.name}</h5>
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
      `}</style>
    </>
  );
};

export default createFragmentContainer(RequestedChangesByFormResult, {
  application: graphql`
    fragment RequestedChangesByFormResult_application on Application {
      formResultsByApplicationId {
        edges {
          node {
            id
            formJsonByFormId {
              name
            }
            requestedChanges {
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
  `
});
