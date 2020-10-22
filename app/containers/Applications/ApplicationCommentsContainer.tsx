import React, {useState} from 'react';
import {Collapse, Table, Button} from 'react-bootstrap';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ApplicationCommentsContainer_formResult} from 'ApplicationCommentsContainer_formResult.graphql';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import ApplicationCommentsBox from './ApplicationCommentsByForm';

/*
 * The ApplicationComments renders all the comments on the various sections of the application
 */

interface Props {
  formResult: ApplicationCommentsContainer_formResult;
  relay: RelayProp;
  review: boolean;
}

export const ApplicationCommentsComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {formResult, review} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [showResolved, toggleShowResolved] = useState(false);
  return (
    <>
      <div key={formResult.id} className="form-result-box">
        <h3>
          {formResult.formJsonByFormId.name}{' '}
          <i
            aria-label="Collapse or expand comment"
            title="Collapse or expand comment"
            style={{float: 'right', marginRight: '10px'}}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faChevronRight} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </i>
        </h3>
        <Collapse in={!isOpen}>
          <div>
            <Table hover>
              <thead className="comments-header">
                <tr>
                  <th>General Comment</th>
                  {review ? (
                    <th style={{textAlign: 'right'}}>Resolve/Delete</th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {formResult.internalGeneralComments.edges.map(({node}) => {
                  if (node.resolved && !showResolved) return null;
                  if (
                    !review &&
                    formResult.applicationByApplicationId
                      .applicationRevisionStatus.applicationRevisionStatus ===
                      'SUBMITTED'
                  )
                    return null;
                  return (
                    <ApplicationCommentsBox
                      key={node.id}
                      review={review}
                      reviewComment={node}
                      version={formResult.versionNumber}
                      formResultId={formResult.id}
                    />
                  );
                })}
              </tbody>
            </Table>
            <Table hover>
              <thead className="comments-header">
                <tr>
                  <th>Request Changes</th>
                  {review ? (
                    <th style={{textAlign: 'right'}}>Resolve/Delete</th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {formResult.requestedChangeComments.edges.map(({node}) => {
                  if (node.resolved && !showResolved) return null;
                  if (
                    !review &&
                    formResult.applicationByApplicationId
                      .applicationRevisionStatus.applicationRevisionStatus ===
                      'SUBMITTED'
                  )
                    return null;
                  return (
                    <ApplicationCommentsBox
                      key={node.id}
                      review={review}
                      reviewComment={node}
                      version={formResult.versionNumber}
                      formResultId={formResult.id}
                    />
                  );
                })}
              </tbody>
            </Table>
            <Button
              variant="link"
              style={{textDecoration: 'none'}}
              onClick={() => toggleShowResolved(!showResolved)}
            >
              {showResolved ? 'Hide Resolved' : 'Show Resolved'}
            </Button>
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

        .form-result-box h3 {
          border-bottom: 1px solid #888;
          padding-bottom: 10px;
          margin-bottom: 20px;
          font-size: 1.25rem;
        }

        .hide-title label.form-label {
          display: none;
        }
        i {
          cursor: pointer;
        }
        .comments-header {
          font-weight: bold;
          color: #036;
        }
        .comments-header th {
          border: 0;
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
        applicationRevisionStatus(versionNumberInput: $version) {
          applicationRevisionStatus
        }
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
