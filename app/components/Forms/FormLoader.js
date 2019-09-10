import React, {Component} from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import 'survey-creator/survey-creator.css';
import {graphql, QueryRenderer, commitMutation} from 'react-relay';
import initEnvironment from '../../lib/createRelayEnvironment';

const environment = initEnvironment();

class FormLoader extends Component {
  constructor(props) {
    super(props);
    this.createFormResult = graphql`
      mutation FormLoaderMutation($input: CreateFormResultInput!) {
        createFormResult(input: $input) {
          formResult {
            rowId
          }
        }
      }
    `;
  }

  storeResult = form_result => {
    const variables = {
      input: {
        formResult: {
          formId: this.props.formId,
          userId: 2,
          formResult: JSON.stringify(form_result)
        }
      }
    };

    const mutation = this.createFormResult;

    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        console.log('Response received from server.');
      },
      onError: err => console.error(err)
    });
  };

  // Define a callback methods on survey complete
  onComplete = result => {
    const form_data = result.data;
    console.log('form data', form_data);
    this.storeResult(form_data);
    console.log('Complete!', result.data);
  };

  onValueChanged = () => {
    console.log('value changed');
  };

  createForm = ({error, props}) => {
    console.log('FormLoader > createForm():', props, error);
    this.onValueChanged();
    Survey.Survey.cssType = 'bootstrap';
    if (props) {
      const formJson = JSON.parse(props.formJsonByRowId.formJson);
      formJson.completedHtml = '<h2>Thank you for your submission</h2>';
      const model = new Survey.Model(JSON.stringify(formJson));
      return (
        <Survey.Survey
          model={model}
          onComplete={this.onComplete}
          onValueChanged={this.onValueChanged}
        />
      );
    }

    return <div>Loading...</div>;
  };

  render() {
    return (
      <>
        <div id="surveyContainer">
          <QueryRenderer
            environment={environment}
            query={graphql`
              query FormLoaderQuery($rowId: Int!) {
                formJsonByRowId(rowId: $rowId) {
                  id
                  name
                  formJson
                }
              }
            `}
            variables={{
              rowId: this.props.formId
            }}
            render={this.createForm}
          />
          <style jsx global>
            {`
              #surveyContainer {
                border: 1px solid #dcdcdcf2;
                border-radius: 4px;
                box-shadow: 0px 7px 9px 0px #00000026;
                padding: 20px;
              }
              .card-footer :global {
                background: white !important;
                display: none;
              }
              .sv_container .panel-footer {
                background: white;
                text-align: right;
              }
              .sv_container .panel-footer .btn.sv_complete_btn {
                background: #036;
                color: white;
              }
            `}
          </style>
        </div>
      </>
    );
  }
}

export default FormLoader;
