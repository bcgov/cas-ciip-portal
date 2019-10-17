import React, {useEffect, useState} from 'react';
import 'survey-react/survey.css';
import 'survey-creator/survey-creator.css';
import {graphql, createFragmentContainer} from 'react-relay';

export const FormWithFuelUnitsComponent = props => {
  const {query, formJson, children} = props;
  const {allFuels} = query || {};

  const [fuelList, setFuelsList] = useState([]);
  useEffect(() => {
    const {edges = []} = allFuels || {};
    setFuelsList(edges.map(({node}) => node.name));
  }, [allFuels]);

  const [unitsFuels, setUnitsFuels] = useState({});
  useEffect(() => {
    const {edges = []} = allFuels || {};

    const newUnitsFuels = {null: []};
    edges.forEach(({node: fuel}) => {
      if (newUnitsFuels[fuel.units] === undefined)
        newUnitsFuels[fuel.units] = [`'${fuel.name}'`];
      else newUnitsFuels[fuel.units].push(`'${fuel.name}'`);
    });
    setUnitsFuels(newUnitsFuels);
  }, [allFuels, fuelList]);

  const [formJsonWithFuelUnits, setFormJsonWithFuelUnits] = useState(null);
  useEffect(() => {
    if (!formJson) return setFormJsonWithFuelUnits(null);

    const formSpec = JSON.parse(formJson);
    // Inject the productList and unitsFuels into the form
    for (const page of formSpec.pages) {
      for (const element of page.elements) {
        for (const templateElement of element.templateElements) {
          if (templateElement.type === 'dropdown') {
            if (templateElement.name === 'fuelType') {
              templateElement.choices = fuelList;
            } else if (templateElement.name === 'fuelUnits') {
              templateElement.choices = [];
              for (const key in unitsFuels) {
                if (key !== 'null') {
                  const p = [...unitsFuels[key], ...unitsFuels.null];
                  templateElement.choices.push({
                    value: key,
                    text: key,
                    visibleIf: `[${p}] contains {panel.fuelType}`
                  });
                }
              }
            }
          }
        }
      }
    }

    // FormSpec.showNavigationButtons = 'none';
    setFormJsonWithFuelUnits(JSON.stringify(formSpec));

    // Create survey model from updated formJson
  }, [formJson, fuelList, unitsFuels]);

  return (
    <>
      {React.cloneElement(children, {
        formJson: formJsonWithFuelUnits
      })}
    </>
  );
};

export default createFragmentContainer(FormWithFuelUnitsComponent, {
  query: graphql`
    fragment FormWithFuelUnits_query on Query {
      allFuels {
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
