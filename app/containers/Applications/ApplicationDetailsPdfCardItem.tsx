import React from 'react';
import {Document, Page, Text, View} from '@react-pdf/renderer';
import JsonSchemaForm from 'react-jsonschema-form';

const CUSTOM_FIELDS = {
  TitleField: props => <Text>{props.title}</Text>
};

const fieldTemplate = () => {
  return (
    <View>
      <Text>Section #1</Text>
    </View>
  );
};

const ApplicationDetailsPdfCardItem = props => {
  const {application} = props;

  const {node} = application.formResultsByApplicationId.edges[0];
  const {schema, uiSchema} = node.formJsonByFormId.formJson;
  const {formResult} = node;

  return (
    <Document>
      <Page>
        <JsonSchemaForm
          // ArrayFieldTemplate={SummaryFormArrayFieldTemplate}
          FieldTemplate={fieldTemplate}
          showErrorList={false}
          fields={CUSTOM_FIELDS}
          // CustomFormats={customFormats}
          schema={schema}
          uiSchema={uiSchema}
          //   ObjectFieldTemplate={FormObjectFieldTemplate}
          formData={formResult}
        />
      </Page>
    </Document>
  );
};

export default ApplicationDetailsPdfCardItem;
