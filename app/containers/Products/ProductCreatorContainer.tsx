import React from 'react';
import {createFragmentContainer, RelayProp} from 'react-relay';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import {Button, Card, Collapse} from 'react-bootstrap';
import FormArrayFieldTemplate from '../Forms/FormArrayFieldTemplate';
import FormFieldTemplate from '../Forms/FormFieldTemplate';
import FormObjectFieldTemplate from '../Forms/FormObjectFieldTemplate';
import createProductMutation from '../../mutations/product/createProductMutation';

interface Props {
  relay: RelayProp;
  expanded: boolean;
  resetForm: (...args: any[]) => void;
  createProductFormKey: number;
}

export const ProductCreator: React.FunctionComponent<Props> = ({
  relay,
  expanded,
  resetForm,
  createProductFormKey
}) => {
  const saveProduct = async (e: IChangeEvent) => {
    const variables = {
      input: {
        product: {
          name: e.formData.product,
          description: e.formData.description,
          state: 'active',
          parent: [null]
        }
      }
    };
    console.log(variables);
    resetForm();
    const {environment} = relay;
    const response = await createProductMutation(environment, variables);
    console.log(response);
  };

  // Schema for JsonSchemaForm component
  const createProductSchema: JSONSchema6 = {
    type: 'object',
    properties: {
      product: {
        type: 'string',
        title: 'Product'
      },
      description: {
        type: 'string',
        title: 'Description'
      }
    },
    required: ['product']
  };

  return (
    <Collapse in={expanded}>
      <Card style={{marginTop: '10px'}}>
        <Card.Header as="h5">Create a Product</Card.Header>
        <Card.Body>
          <JsonSchemaForm
            key={createProductFormKey}
            omitExtraData
            liveOmit
            schema={createProductSchema}
            showErrorList={false}
            ArrayFieldTemplate={FormArrayFieldTemplate}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            onSubmit={saveProduct}
          >
            <Button type="submit">Add Product</Button>
          </JsonSchemaForm>
        </Card.Body>
      </Card>
    </Collapse>
  );
};

export default createFragmentContainer(ProductCreator, {});
