import React, {useState} from 'react';
import {Collapse, Table, Button} from 'react-bootstrap';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ApplicationCommentsContainer_formResult} from 'ApplicationCommentsContainer_formResult.graphql';
import createReviewCommentMutation from 'mutations/application/createReviewCommentMutation';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
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

  const addComment = async (e: IChangeEvent) => {
    if (!e.formData.commentInput) return null;
    const {environment} = props.relay;
    const variables = {
      input: {
        reviewComment: {
          applicationId: formResult.applicationByApplicationId.rowId,
          formId: formResult.formJsonByFormId.rowId,
          description: e.formData.commentInput,
          resolved: false
        }
      }
    };
    const formResultId = formResult.id;

    const response = await createReviewCommentMutation(
      environment,
      variables,
      formResultId
    );
    console.log(response);
  };

  const schema: JSONSchema6 = {
    type: 'object',
    properties: {
      commentInput: {
        type: 'string'
      }
    }
  };

  const uiSchema = {
    commentInput: {
      'ui:widget': 'textarea',
      classNames: 'hide-title'
    }
  };

  function CustomFieldTemplate(props) {
    const {classNames, help, description, errors, children} = props;
    return (
      <div className={classNames}>
        {description}
        {children}
        {errors}
        {help}
      </div>
    );
  }

  return (
    <>
      <div key={formResult.id} className="form-result-box">
        <div onClick={() => setIsOpen(!isOpen)}>
          <h5> {formResult.formJsonByFormId.name} </h5>
        </div>
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
                {formResult.applicationComments.edges.map(({node}) => {
                  if (node.resolved && !showResolved) return null;
                  return (
                    <ApplicationCommentsBox
                      key={node.id}
                      review={review}
                      reviewComment={node}
                    />
                  );
                })}
              </tbody>
            </Table>
            <JsonSchemaForm
              schema={schema}
              uiSchema={uiSchema}
              FieldTemplate={CustomFieldTemplate}
              showErrorList={false}
              onSubmit={addComment}
            >
              <Button type="submit">+ Add Comment</Button>
            </JsonSchemaForm>
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
      );
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
      applicationByApplicationId {
        id
        rowId
      }
      formJsonByFormId {
        rowId
        name
      }
      applicationComments(first: 2147483647)
        @connection(key: "ApplicationCommentsContainer_applicationComments") {
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
