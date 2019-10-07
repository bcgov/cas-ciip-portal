import React, {Component} from 'react';
import propTypes from 'prop-types';
import * as SurveyJSCreator from 'survey-creator';
import 'survey-creator/survey-creator.css';
import {graphql, commitMutation, createFragmentContainer} from 'react-relay';

class FormCreator extends Component {
  static propTypes = {
    formData: propTypes.shape({
      formId: propTypes.number,
      formJson: propTypes.object
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.createFormJson = graphql`
      mutation FormCreatorMutation($input: CreateFormJsonInput!) {
        createFormJson(input: $input) {
          formJson {
            rowId
          }
        }
      }
    `;

    this.updateFormJson = graphql`
      mutation FormCreatorUpdateMutation($input: UpdateFormJsonByRowIdInput!) {
        updateFormJsonByRowId(input: $input) {
          formJson {
            rowId
          }
        }
      }
    `;
  }

  componentDidMount() {
    const options = {showEmbededSurveyTab: true};
    this.surveyCreator = new SurveyJSCreator.SurveyCreator(
      'surveyCreatorContainer',
      options
    );

    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
  }

  componentDidUpdate() {
    if (this.props.formData.formJson) {
      console.log(
        'SurveyCreator.js > componentDidUpdate',
        this.props.formData.formJson
      );
      this.surveyCreator.text = this.props.formData.formJson;
    }
  }

  render() {
    return (
      <>
        <div id="surveyCreatorContainer" />
      </>
    );
  }

  saveMySurvey = () => {
    const formJson = JSON.parse(this.surveyCreator.text);
    const saveVariables = {
      input: {
        formJson: {
          name: formJson.title,
          formJson: JSON.stringify(formJson)
        }
      }
    };

    const updateVariables = {
      input: {
        rowId: this.props.formData.formId,
        formJsonPatch: {
          name: formJson.title,
          formJson: JSON.stringify(formJson)
        }
      }
    };
    const saveMutation = this.createFormJson;
    const updateMutation = this.updateFormJson;
    const {environment} = this.props.relay;
    console.log('FormCreator.js > saveMySurvey', this.props.formData);
    commitMutation(environment, {
      mutation: this.props.formData.formId ? updateMutation : saveMutation,
      variables: this.props.formData.formId ? updateVariables : saveVariables,
      onCompleted: response => {
        console.log(
          this.props.formData.formId
            ? `Form Saved at id ${this.props.formData.formId}`
            : 'Form Created'
        );
        console.log('Form Saved', response);
      },
      onError: err => console.error(err)
    });
  };
}

export default createFragmentContainer(FormCreator, {});

/*
Use proptypes
 */
