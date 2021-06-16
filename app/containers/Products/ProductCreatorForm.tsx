import React from 'react';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import FormArrayFieldTemplate from 'containers/Forms/FormArrayFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import {JSONSchema7} from 'json-schema';
import productSchema from './product-schema.json';
import JsonSchemaForm, {IChangeEvent} from '@rjsf/core';
import {Button} from 'react-bootstrap';
import HeaderWidget from 'components/HeaderWidget';

interface Props {
  saveProduct: (e: IChangeEvent) => Promise<void>;
  toggleShowCreateForm: (...args: any[]) => void;
  disabled: boolean;
}

const ProductCreatorForm: React.FunctionComponent<Props> = ({
  saveProduct,
  disabled,
  toggleShowCreateForm
}) => {
  return (
    <JsonSchemaForm
      omitExtraData
      liveOmit
      widgets={{header: HeaderWidget}}
      schema={productSchema.schema as JSONSchema7}
      uiSchema={productSchema.uiSchema}
      showErrorList={false}
      ArrayFieldTemplate={FormArrayFieldTemplate}
      FieldTemplate={FormFieldTemplate}
      ObjectFieldTemplate={FormObjectFieldTemplate}
      onSubmit={saveProduct}
      disabled={disabled}
    >
      <Button type="submit" disabled={disabled}>
        Add Product
      </Button>
      <Button
        variant="secondary"
        style={{marginLeft: '0.5em'}}
        onClick={toggleShowCreateForm}
      >
        Close
      </Button>
    </JsonSchemaForm>
  );
};

export default ProductCreatorForm;
