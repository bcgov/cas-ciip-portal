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

    // Query: Gets form json along with products by their units
    this.getFormData = graphql`
      query FormLoaderContainerJSONWithProductsQuery($formIdInput: BigFloat) {
        getFormJsonWithProducts(formIdInput: $formIdInput) {
          nodes {
            klProducts
            m3Products
            tProducts
            formJson
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

  // Creates the Survey from the form JSON
  createSurveyForm = async () => {
    if (this.props.formId) {
      const formData = await fetchQuery(environment, this.getFormData, {
        formIdInput: this.props.formId
      });
      Survey.Survey.cssType = 'bootstrap';
      const data = formData.getFormJsonWithProducts.nodes[0];
      const parsedForm = JSON.parse(data.formJson);

      // Merge product arrays to get all products (duplicate values with null units are possible, so create as a set to dedup)
      const products = new Set([
        ...data.klProducts,
        ...data.m3Products,
        ...data.tProducts
      ]);
      console.log(products);
      // Add quotes to beginning and end of each array item (for SurveyJs to read)
      const m3 = data.m3Products.map(product => "'" + product + "'");
      const kl = data.klProducts.map(product => "'" + product + "'");
      const t = data.tProducts.map(product => "'" + product + "'");

      parsedForm.completedHtml = '<h2>Thank you for your submission</h2>';

      // Add choices into formJson for products and units (by product units)
      parsedForm.pages[3].elements[0].templateElements[0].choices = products;
      parsedForm.pages[3].elements[0].templateElements[2].choices = [
        {
          value: 'm3',
          text: 'meters cube',
          visibleIf: `[${m3}] contains {panel.processing_unit}`
        },
        {
          value: 'kl',
          text: 'kiloliters',
          visibleIf: `[${kl}] contains {panel.processing_unit}`
        },
        {
          value: 't',
          text: 'tonnes',
          visibleIf: `[${t}] contains {panel.processing_unit}`
        }
      ];
      console.log(parsedForm);
      // Create survey model from updated formJson
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

export default FormLoaderContainer;
