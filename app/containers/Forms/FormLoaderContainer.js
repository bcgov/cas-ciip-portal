import React, {useEffect, useState} from 'react';
import {Survey, Model} from 'survey-react';
import 'survey-react/survey.css';
import 'survey-creator/survey-creator.css';
import {graphql, commitMutation, createRefetchContainer} from 'react-relay';

const FormLoaderContainer = props => {
  const [productList, setProductsList] = useState([]);
  useEffect(() => {
    const {query} = props;
    const {products} = query || {};
    const {edges = []} = products || {};
    setProductsList(edges.map(({node}) => node.name));
  }, [props, props.query.products]);

  const [unitsProducts, setUnitsProducts] = useState({});
  useEffect(() => {
    const {query} = props;
    const {products} = query || {};
    const {edges = []} = products || {};

    const newUnitsProducts = {};
    edges.forEach(({node: product}) => {
      if (newUnitsProducts[product.units] === undefined)
        newUnitsProducts[product.units] = [`'${product.name}'`];
      else newUnitsProducts[product.units].push(`'${product.name}'`);
    });
    setUnitsProducts(newUnitsProducts);
  }, [props, props.query.products, productList]);

  const [surveyModel, setSurveyModel] = useState(null);
  useEffect(() => {
    const {query} = props;
    const {json} = query || {};
    if (!json) return setSurveyModel(null);
    const {formJson} = json.edges[0].node;

    const parsedForm = JSON.parse(formJson);
    // Inject the productList and unitsProducts into the form
    for (const page of parsedForm.pages) {
      for (const element of page.elements) {
        for (const templateElement of element.templateElements) {
          if (templateElement.type === 'dropdown') {
            if (templateElement.name === 'product') {
              templateElement.choices = productList;
            } else if (templateElement.name === 'product_units') {
              for (const key in unitsProducts) {
                if (key !== 'null') {
                  templateElement.choices.push({
                    value: key,
                    text: key,
                    visibleIf: `[${unitsProducts[key]},${unitsProducts.null}] contains {panel.processing_unit}`
                  });
                }
              }
            }
          }
        }
      }
    }
    // Create survey model from updated formJson

    setSurveyModel(new Model(JSON.stringify(parsedForm)));
  }, [productList, props, props.query.json, unitsProducts]);

  useEffect(() => {
    const {relay, formId} = props;
    relay.refetch({condition: {rowId: formId}});
  }, [props, props.formId, props.relay]);

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

  if (!surveyModel) return null;

  Survey.cssType = 'bootstrap';
  return (
    <>
      <div id="surveyContainer">
        <Survey
          model={surveyModel}
          onComplete={onComplete}
          onValueChanged={onValueChanged}
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

export default createRefetchContainer(
  FormLoaderContainer,
  {
    query: graphql`
      fragment FormLoaderContainer_query on Query
        @argumentDefinitions(condition: {type: "FormJsonCondition"}) {
        json: allFormJsons(condition: $condition) {
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
  },
  graphql`
    query FormLoaderContainerRefetchQuery($condition: FormJsonCondition) {
      query {
        ...FormLoaderContainer_query @arguments(condition: $condition)
      }
    }
  `
);
