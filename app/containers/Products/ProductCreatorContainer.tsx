import React from 'react';
import {createFragmentContainer, RelayProp} from 'react-relay';
import {IChangeEvent} from '@rjsf/core';
import {Card} from 'react-bootstrap';
import createProductMutation from 'mutations/product/createProductMutation';
import {CiipProductState} from 'createProductMutation.graphql';
import ProductCreatorForm from './ProductCreatorForm';

interface Props {
  relay: RelayProp;
  toggleShowCreateForm: (...args: any[]) => void;
}

export const ProductCreator: React.FunctionComponent<Props> = ({
  relay,
  toggleShowCreateForm
}) => {
  const saveProduct = async (e: IChangeEvent) => {
    const variables = {
      input: {
        product: {
          productName: e.formData.productName,
          units: e.formData.units,
          productState: 'DRAFT' as CiipProductState,
          requiresEmissionAllocation: e.formData.requiresEmissionAllocation,
          isCiipProduct: e.formData.isCiipProduct,
          isEnergyProduct: false,
          addPurchasedElectricityEmissions:
            e.formData.addPurchasedElectricityEmissions,
          subtractExportedElectricityEmissions:
            e.formData.subtractExportedElectricityEmissions,
          addPurchasedHeatEmissions: e.formData.addPurchasedHeatEmissions,
          subtractExportedHeatEmissions:
            e.formData.subtractExportedHeatEmissions,
          subtractGeneratedElectricityEmissions:
            e.formData.subtractGeneratedElectricityEmissions,
          subtractGeneratedHeatEmissions:
            e.formData.subtractGeneratedHeatEmissions,
          requiresProductAmount: e.formData.requiresProductAmount
        }
      },
      messages: {
        success: 'Product created successfully.'
      }
    };
    const {environment} = relay;
    await createProductMutation(environment, variables);
    toggleShowCreateForm();
  };

  return (
    <>
      <div style={{marginBottom: '50px'}}>
        <Card
          style={{
            marginTop: '10px',
            borderColor: '#a4a4a4',
            backgroundColor: '#f4f4f4'
          }}
        >
          <Card.Header
            as="h2"
            style={{
              backgroundColor: '#036',
              color: '#fff',
              fontSize: '1.5rem'
            }}
          >
            Create a Product
          </Card.Header>
          <Card.Body style={{padding: '2em'}}>
            <ProductCreatorForm
              saveProduct={saveProduct}
              disabled={false}
              toggleShowCreateForm={toggleShowCreateForm}
            />
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default createFragmentContainer(ProductCreator, {});
