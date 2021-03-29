import {JSONSchema7} from 'json-schema';
import JsonSchemaForm, {UiSchema} from '@rjsf/core';
import React, {useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import SearchDropdownWidget from 'components/Forms/SearchDropdownWidget';
import {AllowableProductsSearch_query} from '__generated__/AllowableProductsSearch_query.graphql';
import ProductRowIdField from 'containers/Forms/ProductRowIdField';

const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    productRowId: {
      type: 'integer'
    }
  }
};

const uiSchema: UiSchema = {
  productRowId: {
    'ui:col-md': 8,
    'ui:widget': 'SearchWidget',
    'ui:field': 'productRowId',
    'ui:placeholder': 'Search Products...'
  }
};

interface Props {
  query: AllowableProductsSearch_query;
  naicsCodeId: number;
  existingProductIds: number[];
  addAllowedProduct: (productRowId: number, mandatory: boolean) => void;
}

export const AllowableProductsSearchContainer: React.FunctionComponent<Props> = (
  props
) => {
  const [selectedProductId] = useState<number>(undefined);

  const CUSTOM_FIELDS = {
    productRowId: (props) => {
      return <ProductRowIdField query={props.formContext.query} {...props} />;
    }
  };

  const onAddClick = (mandatory: boolean) => {
    if (selectedProductId !== undefined)
      props.addAllowedProduct(selectedProductId, mandatory);
  };

  return (
    <Card>
      <Card.Header className="bc-card-header">
        Add an Allowed Product
      </Card.Header>
      <Card.Body>
        <JsonSchemaForm
          formContext={{query: props.query}}
          formData={{productRowId: undefined}}
          fields={CUSTOM_FIELDS}
          widgets={{SearchWidget: SearchDropdownWidget}}
          schema={schema}
          uiSchema={uiSchema}
        >
          <Button onClick={() => onAddClick(true)}>Add Mandatory</Button>
          <Button onClick={() => onAddClick(false)}>Add Optional</Button>
        </JsonSchemaForm>
      </Card.Body>
    </Card>
  );
};

export default createFragmentContainer(AllowableProductsSearchContainer, {
  query: graphql`
    fragment AllowableProductsSearch_query on Query {
      ...ProductRowIdField_query
    }
  `
});
