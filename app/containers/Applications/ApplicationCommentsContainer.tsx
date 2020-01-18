import React, {useState} from 'react';
import {Collapse, Table, Button, Row, Col} from 'react-bootstrap';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ApplicationCommentsContainer_formResult} from 'ApplicationCommentsContainer_formResult.graphql';
import ApplicationCommentsBox from './ApplicationCommentsByForm';

/*
 * The ApplicationComments renders all the comments on the various sections of the application
 */

interface Props {
  formResult: ApplicationCommentsContainer_formResult;
  relay: RelayProp;
  review: boolean;
}

export const ApplicationCommentsComponent: React.FunctionComponent<Props> = props => {
  const {formResult, review} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [showResolved, toggleShowResolved] = useState(false);

  return (
    <>
      <div key={formResult.id} className="form-result-box">
        <Row>
          <Col md={10}>
            <h5> {formResult.formJsonByFormId.name} </h5>
          </Col>
          <Col md={{span: 1}} style={{textAlign: 'right'}}>
            <Button
              aria-label="toggle-card-open"
              title="expand or collapse the card"
              variant="outline-dark"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? '+' : '-'}
            </Button>
          </Col>
        </Row>
        <Collapse in={!isOpen}>
          <div>
            <Table striped bordered hover>
              <thead style={{textAlign: 'center'}}>
                <tr>
                  <th>Comment</th>
                  {review ? <th>Resolve</th> : null}
                </tr>
              </thead>
              <tbody>
                {formResult.internalGeneralComments.edges.map(({node}) => {
                  if (node.resolved && !showResolved) return null;
                  return (
                    <ApplicationCommentsBox
                      key={node.id}
                      review={review}
                      reviewComment={node}
                      version={formResult.versionNumber}
                    />
                  );
                })}
              </tbody>
            </Table>
            <Table striped bordered hover>
              <thead style={{textAlign: 'center'}}>
                <tr>
                  <th>Comment</th>
                  {review ? <th>Resolve</th> : null}
                </tr>
              </thead>
              <tbody>
                {formResult.requestedChangeComments.edges.map(({node}) => {
                  if (node.resolved && !showResolved) return null;
                  return (
                    <ApplicationCommentsBox
                      key={node.id}
                      review={review}
                      reviewComment={node}
                      version={formResult.versionNumber}
                    />
                  );
                })}
              </tbody>
            </Table>
            {showResolved ? (
              <a href="#" onClick={() => toggleShowResolved(!showResolved)}>
                Hide Resolved
              </a>
            ) : (
              <a href="#" onClick={() => toggleShowResolved(!showResolved)}>
                Show Resolved
              </a>
            )}
          </div>
        </Collapse>
      </div>
      <style jsx global>{`
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

        .hide-title label.form-label {
          display: none;
        }
      `}</style>
    </>
  );
};

export default createFragmentContainer(ApplicationCommentsComponent, {
  formResult: graphql`
    fragment ApplicationCommentsContainer_formResult on FormResult {
      id
      versionNumber
      applicationByApplicationId {
        id
        rowId
      }
      formJsonByFormId {
        rowId
        name
      }
      internalGeneralComments(first: 2147483647)
        @connection(
          key: "ApplicationCommentsContainer_internalGeneralComments"
        ) {
        edges {
          node {
            id
            resolved
            ...ApplicationCommentsByForm_reviewComment
          }
        }
      }
      requestedChangeComments(first: 2147483647)
        @connection(
          key: "ApplicationCommentsContainer_requestedChangeComments"
        ) {
        edges {
          node {
            id
            resolved
            ...ApplicationCommentsByForm_reviewComment
          }
        }
      }
    }
  `
});
