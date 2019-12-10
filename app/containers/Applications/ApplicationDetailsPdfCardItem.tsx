import React from 'react';
import {Document, Page, Text, View} from '@react-pdf/renderer';
import JsonSchemaForm from 'react-jsonschema-form';

const objectFieldTemplate = props => {
  return (
    <>
      {props.properties.map(prop => (
        <View key={prop.content.key}>{prop.content}</View>
      ))}
    </>
  );
};

const fieldTemplate = props => {
  return (
    <>
      <Text>{props.label}</Text>
      {props.children}
    </>
  );
};

const CUSTOM_FIELDS = {
  TitleField: props => <Text>{props.title}</Text>,
  StringField: props => <Text>{props.formData}</Text>
};

const customWidget = {
  RadioWidget: props => props.value
};

const ApplicationDetailsPdfCardItem = props => {
  const {application} = props;

  const {node} = application.formResultsByApplicationId.edges[0];
  const {schema, uiSchema} = node.formJsonByFormId.formJson;
  const {formResult} = node;

  return (
    <Document>
      <JsonSchemaForm
        // ArrayFieldTemplate={fieldTemplate}
        FieldTemplate={fieldTemplate}
        ObjectFieldTemplate={objectFieldTemplate}
        showErrorList={false}
        fields={CUSTOM_FIELDS}
        schema={schema}
        uiSchema={uiSchema}
        formData={formResult}
        tagName={Page}
        widgets={customWidget}
      >
        <View />
      </JsonSchemaForm>
    </Document>
  );
};

export default ApplicationDetailsPdfCardItem;
