import React from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import 'survey-creator/survey-creator.css';
import {graphql, commitMutation, createFragmentContainer} from 'react-relay';

const FormLoaderContainer = props => {
  // Mutation: stores the result of the form
  const createFormResult = graphql`
    mutation FormLoaderContainerMutation($input: CreateFormResultInput!) {
      createFormResult(input: $input) {
        formResult {
          rowId
        }
      }
    }
  `;
  // Mutation: stores a status along with the form result
  const createApplicationStatus = graphql`
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

  // Function: store the application status
  const storeApplicationStatus = resultId => {
    const variables = {
      input: {
        applicationStatus: {
          applicationStatus: 'pending',
          formResultId: resultId
        }
      }
    };

    const mutation = createApplicationStatus;
    const {environment} = props.relay;
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
  const storeResult = formResult => {
    const variables = {
      input: {
        formResult: {
          formId: props.formId,
          userId: 2,
          formResult: JSON.stringify(formResult)
        }
      }
    };

    const mutation = createFormResult;
    const {environment} = props.relay;
    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: response => {
        console.log(response);
        console.log('Store Result Response received from server.');
        storeApplicationStatus(response.createFormResult.formResult.rowId);
      },
      onError: err => console.error(err)
    });
  };

  // Define a callback methods on survey complete
  const onComplete = result => {
    const formData = result.data;
    console.log('form data', formData);
    storeResult(formData);
    console.log('Complete!', result.data);
  };

  // TODO: Is this going to be necessary going forward, or was it just for debugging?
  const onValueChanged = () => {
    console.log('value changed');
  };

  // Function: Add the product/unit choices into the formJson before creating the survey
  const editFormJson = data => {
    const parsedForm = JSON.parse(data.formJson);

    parsedForm.completedHtml = '<h2>Thank you for your submission</h2>';

    // Add choices into formJson for products and units (by product units)
    parsedForm.pages[3].elements[0].templateElements[0].choices =
      data.productList;

    // TODO: Units are broken, to be fixed on working with split forms
    // For (const key in data.unitObj) {
    //   if (key !== 'null') {
    //     parsedForm.pages[3].elements[0].templateElements[2].choices.push({
    //       value: key,
    //       text: key,
    //       visibleIf: `[${data.unitObj[key]},${data.unitObj.null}] contains {panel.processing_unit}`
    //     });
    //   }
    // }

    return parsedForm;
  };

  // Creates the Survey from the form JSON
  const createSurveyForm = () => {
    if (props.query) {
      const unitObj = {};
      const productList = [];

      props.query.products.edges.forEach(({node: product}) => {
        if (unitObj[product.units] === undefined)
          unitObj[product.units] = [`'${product.name}'`];
        else unitObj[product.units].push(`'${product.name}'`);
        productList.push(product.name);
      });

      const {formJson} = props.query.json.edges[0].node;
      const data = {formJson, unitObj, productList};
      const parsedForm = editFormJson(data);

      // Create survey model from updated formJson
      Survey.Survey.cssType = 'bootstrap';
      const model = new Survey.Model(JSON.stringify(parsedForm));
      return (
        <Survey.Survey
          model={model}
          onComplete={onComplete}
          onValueChanged={onValueChanged}
        />
      );
    }
  };

  return (
    <>
      <div id="surveyContainer">
        {createSurveyForm()}
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
};

export default createFragmentContainer(FormLoaderContainer, {
  query: graphql`
    fragment FormLoaderContainer_query on Query
      @argumentDefinitions(condition: {type: "Int"}) {
      json: allFormJsons(condition: {rowId: 1}) {
        edges {
          node {
            rowId
            name
            formJson
          }
        }
      }
      products: allProducts {
        edges {
          node {
            name
            units
          }
        }
      }
    }
  `
});
