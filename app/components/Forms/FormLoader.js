import util from 'util';
import React, {Component} from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import 'survey-creator/survey-creator.css';
import {graphql, QueryRenderer, commitMutation, fetchQuery} from 'react-relay';
import initEnvironment from '../../lib/createRelayEnvironment';

const environment = initEnvironment();

const getFormData = graphql`
  query FormLoaderJSONWithProductsQuery($formIdInput: BigFloat) {
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

    this.createApplicationStatus = graphql`
      mutation FormLoaderApplicationStatusMutation(
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
      onCompleted: (response, errors) => {
        console.log('Application Status Created.');
      },
      onError: err => console.error(err)
    });
  };

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
        console.log(response);
        console.log('Response received from server.');
        this.storeApplicationStatus(response.createFormResult.formResult.rowId);
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
    // Console.log(
    //   util.inspect(Survey.JsonObject, false, null, true /* Enable colors */)
    // );
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

  createFormNew = async () => {
    this.onValueChanged();

    if (this.props.formId) {
      const formData = await fetchQuery(environment, getFormData, {
        formIdInput: 1
      });
      const data = formData.getFormJsonWithProducts.nodes[0];
      const parsedForm = JSON.parse(data.formJson);
      const products = [
        ...data.klProducts,
        ...data.m3Products,
        ...data.tProducts
      ];
      parsedForm.completedHtml = '<h2>Thank you for your submission</h2>';
      const model = new Survey.Model(JSON.stringify(parsedForm));
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

  componentDidMount = async () => {
    const formData = await fetchQuery(environment, getFormData, {
      formIdInput: 1
    });
    const data = formData.getFormJsonWithProducts.nodes[0];
    const parsedForm = JSON.parse(data.formJson);
    const products = [
      ...data.klProducts,
      ...data.m3Products,
      ...data.tProducts
    ];
    console.log(products);
    console.log(parsedForm.pages[2].elements[0].templateElements[0]);
    console.log(parsedForm.pages[2].elements[0].templateElements[2]);
    parsedForm.pages[2].elements[0].templateElements[0].choices = products;
    parsedForm.pages[2].elements[0].templateElements[2].choices = [
      {
        value: 'm3',
        text: 'meters cube',
        visibleIf: `${data.m3Products} contains {module_throughput_and_production_data[{panelIndex}].processing_unit} or ${products} not contains {module_throughput_and_production_data[{panelIndex}].processing_unit}`
      },
      {
        value: 'kl',
        text: 'kiloliters',
        visibleIf: `${data.klProducts} contains {module_throughput_and_production_data[{panelIndex}].processing_unit} or ${products} not contains {module_throughput_and_production_data[{panelIndex}].processing_unit}`
      },
      {
        value: 't',
        text: 'tonnes',
        visibleIf: `[${data.tProducts}] contains {module_throughput_and_production_data[{panelIndex}].processing_unit} or ${products} not contains {module_throughput_and_production_data[{panelIndex}].processing_unit}`
      }
    ];
    console.log(parsedForm.pages[2].elements[0].templateElements[0]);
    console.log(parsedForm.pages[2].elements[0].templateElements[2]);
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
