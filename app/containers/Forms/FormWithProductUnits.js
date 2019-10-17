import React, {useEffect, useState} from 'react';
import 'survey-react/survey.css';
import 'survey-creator/survey-creator.css';
import {graphql, createFragmentContainer} from 'react-relay';

const FormWithProductUnits = props => {
  const {query, formJson, children} = props;
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

  const [formJsonWithProductUnits, setFormJsonWithProductUnits] = useState(
    null
  );
  useEffect(() => {
    if (!formJson) return setFormJsonWithProductUnits(null);

    const formSpec = JSON.parse(formJson);
    // Inject the productList and unitsProducts into the form
    for (const page of formSpec.pages) {
      for (const element of page.elements) {
        for (const templateElement of element.templateElements) {
          if (templateElement.type === 'dropdown') {
            if (templateElement.name === 'product') {
              templateElement.choices = productList;
            } else if (templateElement.name === 'productUnits') {
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

    // FormSpec.showNavigationButtons = 'none';
    setFormJsonWithProductUnits(JSON.stringify(formSpec));

    // Create survey model from updated formJson
  }, [formJson, productList, unitsProducts]);

  return (
    <>
      {React.cloneElement(children, {
        formJson: formJsonWithProductUnits
      })}
    </>
  );
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
