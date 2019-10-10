import React, {useEffect, useState} from 'react';
import {Model} from 'survey-react';
import 'survey-react/survey.css';
import 'survey-creator/survey-creator.css';
import {graphql, createFragmentContainer} from 'react-relay';
import SurveyWrapper from '../../components/Survey/SurveyWrapper';

const FormWithProductUnits = ({query, formJson, onComplete}) => {
  const {allProducts} = query || {};

  const [productList, setProductsList] = useState([]);
  useEffect(() => {
    const {edges = []} = allProducts || {};
    setProductsList(edges.map(({node}) => node.name));
  }, [allProducts]);

  const [unitsProducts, setUnitsProducts] = useState({});
  useEffect(() => {
    const {edges = []} = allProducts || {};

    const newUnitsProducts = {null: []};
    edges.forEach(({node: product}) => {
      if (newUnitsProducts[product.units] === undefined)
        newUnitsProducts[product.units] = [`'${product.name}'`];
      else newUnitsProducts[product.units].push(`'${product.name}'`);
    });
    setUnitsProducts(newUnitsProducts);
  }, [allProducts, productList]);

  const [surveyModel, setSurveyModel] = useState(null);
  useEffect(() => {
    if (!formJson) return setSurveyModel(null);

    const formSpec = JSON.parse(formJson);
    // Inject the productList and unitsProducts into the form
    for (const page of formSpec.pages) {
      for (const element of page.elements) {
        for (const templateElement of element.templateElements) {
          if (templateElement.type === 'dropdown') {
            if (templateElement.name === 'product') {
              templateElement.choices = productList;
            } else if (templateElement.name === 'product_units') {
              templateElement.choices = [];
              for (const key in unitsProducts) {
                if (key !== 'null') {
                  const p = [...unitsProducts[key], ...unitsProducts.null];
                  templateElement.choices.push({
                    value: key,
                    text: key,
                    visibleIf: `[${p}] contains {panel.product}`
                  });
                }
              }
            }
          }
        }
      }
    }

    setSurveyModel(new Model(JSON.stringify(formSpec)));

    // Create survey model from updated formJson
  }, [formJson, productList, unitsProducts]);

  return <SurveyWrapper model={surveyModel} onComplete={onComplete} />;
};

export default createFragmentContainer(FormWithProductUnits, {
  query: graphql`
    fragment FormWithProductUnits_query on Query {
      allProducts {
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
