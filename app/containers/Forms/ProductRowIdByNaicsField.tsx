import React, {useMemo} from 'react';
// import {InputGroup} from 'react-bootstrap';
import {FieldProps} from '@rjsf/core';
import {createFragmentContainer, graphql} from 'react-relay';
import {ProductRowIdByNaicsField_naicsCode} from 'ProductRowIdByNaicsField_naicsCode.graphql';

interface Props extends FieldProps<number> {
  naicsCode: ProductRowIdByNaicsField_naicsCode;
}

/**
 * Separates active products from archived products & renders according to the product's state.
 * For active products, the fieldProps are generated & either a search dropdown component is rendered
 * or the value is rendered based on what is defined in the currentjsonschema form registry.
 * For archived proucts, a readonly input is rendered with the name of the archived product.
 * This split based on the state of the product allows archived products to be rendered in the product form,
 * but since only the active products are passed to the field props, these products are not available to be selected
 * from the search dropdown component when filling out an application.
 */
export const ProductRowIdByNaicsFieldComponent: React.FunctionComponent<Props> = (
  props
) => {
  // The last id in the Product table for energy products (ids 1-7)
  const lastEnergyProductIndex = 7;

  console.log(props);
  /**
   * Injects the list of products in the schema, and remove `naicsCode` from the props
   * Other props are passed as-is to the StringField.
   * If this component is rendered from the admin product-benchmark link product modal, the energy products are removed from the choices.
   */
  const fieldProps = useMemo(
    () => ({
      ...props,
      schema: {
        ...props.schema,
        enum: props.isLinkModal
          ? props.naicsCode.productsByNaicsCode.edges
              .filter(({node}) => node.rowId > lastEnergyProductIndex)
              .map(({node}) => node.rowId)
          : props.naicsCode.productsByNaicsCode.edges.map(
              ({node}) => node.rowId
            ),
        enumNames: props.isLinkModal
          ? props.naicsCode.productsByNaicsCode.edges
              .filter(({node}) => node.rowId > lastEnergyProductIndex)
              .map(({node}) => node.productName)
          : props.naicsCode.productsByNaicsCode.edges.map(
              ({node}) => node.productName
            )
      },
      naicsCode: undefined
    }),
    [props]
  );

  // /**
  //  * Contains all products, split into arrays of productsByNaicsCode / archived product IDs and names.
  //  */
  // const allProducts = useMemo(
  //   () => ({
  //     productsByNaicsCodeProductIds: props.naicsCode.productsByNaicsCode.edges.map(
  //       ({node}) => node.rowId
  //     ),
  //     archivedProductIds: props.naicsCode.archived.edges.map(
  //       ({node}) => node.rowId
  //     ),
  //     archivedProductNames: props.naicsCode.archived.edges.map(
  //       ({node}) => node.productName
  //     )
  //   }),
  //   [props]
  // );

  // Pass the fieldProps for productsByNaicsCode product
  // if (
  //   allProducts.productsByNaicsCodeProductIds.includes(props.formData) ||
  //   props.formData === undefined
  // )
  return <props.registry.fields.StringField {...fieldProps} />;

  // Render a disabled text input for an archived product
  // const archivedIndex = allProducts.archivedProductIds.indexOf(props.formData);
  // return (
  //   <div>
  //     <InputGroup className="mb-3">
  //       <InputGroup.Prepend>
  //         <InputGroup.Text>
  //           {allProducts.archivedProductNames[archivedIndex]}
  //         </InputGroup.Text>
  //       </InputGroup.Prepend>
  //     </InputGroup>
  //   </div>
  // );
};

export default createFragmentContainer(ProductRowIdByNaicsFieldComponent, {
  naicsCode: graphql`
    fragment ProductRowIdByNaicsField_naicsCode on NaicsCode {
      id
      productsByNaicsCode: productsByProductNaicsCodeNaicsCodeIdAndProductId(
        filter: {productState: {equalTo: productsByNaicsCode}}
      ) {
        edges {
          node {
            rowId
            productName
            productState
          }
        }
      }
    }
  `
});
