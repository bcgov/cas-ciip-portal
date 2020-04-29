import React from 'react';
import {View} from '@react-pdf/renderer';
import {ObjectFieldTemplateProps} from 'react-jsonschema-form';

const PdfObjectFieldTemplate: React.FunctionComponent<ObjectFieldTemplateProps> = (
  props
) => {
  // The fragment below shouldn't be needed, but the React.FunctionComponent
  // type definition doesn't allow an array as the return type
  // See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356,
  // dependant on https://github.com/microsoft/TypeScript/issues/21699
  /* eslint-disable react/jsx-no-useless-fragment */
  return (
    <>
      {props.properties.map(
        (prop) =>
          prop.content && <View key={prop.content.key}>{prop.content}</View>
      )}
    </>
  );
  /* eslint-enable react/jsx-no-useless-fragment */
};

export default PdfObjectFieldTemplate;
