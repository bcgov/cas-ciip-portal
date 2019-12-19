import React, {useState} from 'react';
import {Collapse, Table, Button} from 'react-bootstrap';
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {formResults.map(({node}) => {
        const applicationComments = node.applicationComments.edges;
        return (
          <div key={node.id} className="form-result-box">
            <div onClick={() => setIsOpen(!isOpen)}>
              <h5> {node.formJsonByFormId.name} </h5>
            </div>
            <Collapse in={!isOpen}>
              <div>
                <Table striped bordered hover>
                  <thead style={{textAlign: 'center'}}>
                    <tr>
                      <th>Comment</th>
                      <th>Resolve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationComments.map(({node}) => {
                      return (
                        <ApplicationCommentsBox
                          key={node.id}
                          reviewComment={node}
                        />
                      );
                    })}
                  </tbody>
                </Table>
                <Button>+ Add Comment</Button>
              </div>
            </Collapse>
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
              applicationComments {
                id
                ...ApplicationCommentsByForm_reviewComment
              }
            }
          }
        }
      }
    }
  `
});
