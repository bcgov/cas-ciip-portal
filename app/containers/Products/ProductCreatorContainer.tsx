import React from 'react';
import {createFragmentContainer, RelayProp} from 'react-relay';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {Button, Card} from 'react-bootstrap';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import FormArrayFieldTemplate from 'containers/Forms/FormArrayFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import createProductMutation from 'mutations/product/createProductMutation';
import {JSONSchema6} from 'json-schema';
import productSchema from './product-schema.json';

interface Props {
  relay: RelayProp;
  updateProductCount: (...args: any[]) => void;
  toggleShowCreateForm: (...args: any[]) => void;
  toggleShowProductCreatedToast: (...args: any[]) => void;
}

export const ProductCreator: React.FunctionComponent<Props> = ({
  relay,
  updateProductCount,
  toggleShowCreateForm,
  toggleShowProductCreatedToast
}) => {
  const saveProduct = async (e: IChangeEvent) => {
    const variables = {
      input: {
        product: {
          name: e.formData.name,
          description: e.formData.description,
          units: e.formData.units,
          state: 'active',
          parent: [null],
          requiresEmissionAllocation: e.formData.requiresEmissionAllocation,
          addImportedElectricityEmissions:
            e.formData.addImportedElectricityEmissions,
          subtractExportedElectricityEmissions:
            e.formData.subtractExportedElectricityEmissions,
          addImportedHeatEmissions: e.formData.addImportedHeatEmissions,
          subtractExportedHeatEmissions:
            e.formData.subtractExportedHeatEmissions,
          subtractGeneratedElectricityEmissions:
            e.formData.subtractGeneratedElectricityEmissions,
          subtractGeneratedHeatEmissions:
            e.formData.subtractGeneratedHeatEmissions
        }
      }
    };
    const {environment} = relay;
    const response = await createProductMutation(environment, variables);
    updateProductCount(response.createProduct.query.allProducts.totalCount);
    toggleShowCreateForm();
    if (response.createProduct) toggleShowProductCreatedToast(true);
    else console.log(response);
  };

  return (
    <>
      <div>
        <Card style={{marginTop: '10px'}}>
          <Card.Header as="h5">Create a Product</Card.Header>
          <Card.Body>
            <JsonSchemaForm
              omitExtraData
              liveOmit
              schema={productSchema.schema as JSONSchema6}
              uiSchema={productSchema.uiSchema}
              showErrorList={false}
              ArrayFieldTemplate={FormArrayFieldTemplate}
              FieldTemplate={FormFieldTemplate}
              ObjectFieldTemplate={FormObjectFieldTemplate}
              onSubmit={saveProduct}
            >
              <Button type="submit">Add Product</Button>
              <Button variant="danger" onClick={toggleShowCreateForm}>
                Close
              </Button>
            </JsonSchemaForm>
          </Card.Body>
        </Card>
      </div>
      <style jsx>{`
        div {
          margin-bottom: 50px;
        }
      `}</style>
    </>
  );
};

export default createFragmentContainer(ProductCreator, {});
