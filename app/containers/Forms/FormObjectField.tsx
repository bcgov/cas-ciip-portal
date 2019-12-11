import React, {useCallback} from 'react';
import {FieldProps, ErrorSchema} from 'react-jsonschema-form';
import ObjectField from 'react-jsonschema-form/lib/components/fields/ObjectField';
import * as math from 'mathjs';
const {evaluate} = math;

const FormObjectField: React.FunctionComponent<FieldProps> = props => {
  const {onChange, uiSchema} = props;
  const handleChange = useCallback(
    (formData: any, es?: ErrorSchema) => {
      if (!uiSchema?.['ui:formulae']) return onChange(formData, es);
      const formDataWithFormulaeResults = {...formData};
      for (const field of Object.keys(uiSchema['ui:formulae'])) {
        try {
          const formula = uiSchema['ui:formulae'][field];
          if (typeof formula === 'string') {
            formDataWithFormulaeResults[field] = evaluate(
              formula,
              formDataWithFormulaeResults
            );
          } else {
            formDataWithFormulaeResults[field] = formDataWithFormulaeResults[
              formula.items
            ]
              .map(i => evaluate(formula.itemFormula, i))
              .reduce((accumulator, currentValue) => {
                return math[formula.reduceFunction](accumulator, currentValue);
              });
          }
        } catch (error) {
          formDataWithFormulaeResults[field] = undefined;
          console.log(error);
        }
      }

      onChange(formDataWithFormulaeResults, es);
    },
    [onChange, uiSchema]
  );

  return <ObjectField {...props} onChange={handleChange} />;
};

export default FormObjectField;
