import React, {Component} from 'react';
import propTypes from 'prop-types';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import 'survey-creator/survey-creator.css';
import {graphql, commitMutation, fetchQuery} from 'react-relay';
import initEnvironment from '../../lib/createRelayEnvironment';
import FormLoader from '../../components/Forms/FormLoader';

const environment = initEnvironment();

class FormLoaderContainer extends Component {
  static propTypes = {
    formId: propTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.getFormJson = graphql`
      query FormLoaderContainerFormJsonQuery($condition: FormJsonCondition) {
        allFormJsons(condition: $condition) {
          nodes {
            formJson
          }
        }
      }
    `;

    this.getProducts = graphql`
      query FormLoaderContainerProductQuery {
        allProducts {
          nodes {
            name
            units
          }
        }
      }
    `;

    // Mutation: stores the result of the form
    this.createFormResult = graphql`
      mutation FormLoaderContainerMutation($input: CreateFormResultInput!) {
        createFormResult(input: $input) {
          formResult {
            rowId
          }
        }
      }
    `;
    // Mutation: stores a status along with the form result
    this.createApplicationStatus = graphql`
      mutation FormLoaderContainerApplicationStatusMutation(
        $input: CreateApplicationStatusInput!
      ) {
        createApplicationStatus(input: $input) {
          applicationStatus {
            rowId
          }
        }
      }
    `;
  }

  // Set the state
  state = {
    formJson: <div>Loading...</div>
  };

  // Function: store the application status
  storeApplicationStatus = resultId => {
    const variables = {
      input: {
        applicationStatus: {
          applicationStatus: 'pending',
          formResultId: resultId
        }
      }
    };

    const mutation = this.createApplicationStatus;

    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: response => {
        console.log(response);
        console.log('Store Application Status Response received from server.');
        console.log('Application Status Created.');
      },
      onError: err => console.error(err)
    });
  };

  // Function: store the form result
  storeResult = formResult => {
    const variables = {
      input: {
        formResult: {
          formId: this.props.formId,
          userId: 2,
          formResult: JSON.stringify(formResult)
        }
      }
    };

    const mutation = this.createFormResult;

    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: response => {
        console.log(response);
        console.log('Store Result Response received from server.');
        this.storeApplicationStatus(response.createFormResult.formResult.rowId);
      },
      onError: err => console.error(err)
    });
  };

  // Define a callback methods on survey complete
  onComplete = result => {
    const formData = result.data;
    console.log('form data', formData);
    this.storeResult(formData);
    console.log('Complete!', result.data);
  };

  // TODO: Is this going to be necessary going forward, or was it just for debugging?
  onValueChanged = () => {
    console.log('value changed');
  };

  // Function: Add the product/unit choices into the formJson before creating the survey
  editFormJson = data => {
    const parsedForm = JSON.parse(data.formJson);

    parsedForm.completedHtml = '<h2>Thank you for your submission</h2>';

    // Add choices into formJson for products and units (by product units)
    parsedForm.pages[3].elements[0].templateElements[0].choices =
      data.productList;

    for (const key in data.unitObj) {
      if (key !== 'null') {
        parsedForm.pages[3].elements[0].templateElements[2].choices.push({
          value: key,
          text: key,
          visibleIf: `[${data.unitObj[key]},${data.unitObj.null}] contains {panel.processing_unit}`
        });
      }
    }

    return parsedForm;
  };

  // Creates the Survey from the form JSON
  createSurveyForm = async () => {
    if (this.props.formId) {
      const formData = await fetchQuery(environment, this.getFormJson, {
        formIdInput: this.props.formId
      });
      const products = await fetchQuery(environment, this.getProducts, {});

      const unitObj = {};
      const productList = [];

      products.allProducts.nodes.forEach(product => {
        if (unitObj[product.units] === undefined)
          unitObj[product.units] = [`'${product.name}'`];
        else unitObj[product.units].push(`'${product.name}'`);
        productList.push(product.name);
      });

      const {formJson} = formData.allFormJsons.nodes[0];
      const data = {formJson, unitObj, productList};
      const parsedForm = this.editFormJson(data);

      // Create survey model from updated formJson
      Survey.Survey.cssType = 'bootstrap';
      const model = new Survey.Model(JSON.stringify(parsedForm));
      this.setState({
        formJson: (
          <Survey.Survey
            model={model}
            onComplete={this.onComplete}
            onValueChanged={this.onValueChanged}
          />
        )
      });
    }
  };

  componentDidMount = async () => {
    await this.createSurveyForm();
  };

  render() {
    return (
      <>
        <div id="surveyContainer">
          <FormLoader formJson={this.state.formJson} />
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
              .panel-footer {
                background: white;
                text-align: right;
              }
              .panel-footer .btn.sv_complete_btn {
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

export default FormLoaderContainer;
