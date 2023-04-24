import React, { useMemo } from "react";
import { FieldProps } from "@rjsf/core";
import { createFragmentContainer, graphql } from "react-relay";
import { FuelField_query } from "FuelField_query.graphql";
import ObjectField from "@rjsf/core/dist/cjs/components/fields/ObjectField";

interface Props extends FieldProps {
  query: FuelField_query;
}

export const FuelFieldComponent: React.FunctionComponent<Props> = (props) => {
  const { formData, schema, uiSchema, query, onChange } = props;

  /**
   *
   * @param EmissionCategoryRowId
   * @returns array of fuels that can be reported under given emission category
   */
  const getFuelIdsByEmissionCategoryRowId = (EmissionCategoryRowId) => {
    const categoryObject = query.fuelIdsByEmissionCategoryId.edges.find(
      (edge) => edge.node.emissionCategoryId === EmissionCategoryRowId
    );
    return categoryObject?.node?.fuelIds;
  };

  const selectedEmissionCategoryRowId = useMemo(
    () => formData.emissionCategoryRowId,
    [formData]
  );
  // This updates the list of fuel ids whenever the selected emission category changes.
  const emissionCategoryFuelIds = useMemo(() => {
    return getFuelIdsByEmissionCategoryRowId(selectedEmissionCategoryRowId);
  }, [selectedEmissionCategoryRowId]);

  /**
   * fuels filters the activeFuels query result by the list of emissionCategoryFuelIds to create two arrays:
   * @property activeRowIds a list of all of the fuels that can be reported under the selected category, and are active
   * @property activeNames a list of the fuel names corresponding to the activeRowIds
   *
   * These lists are used as the lists of enum values and names for the midifiedSchema, effectively filtering
   * which fuels can be selected based on which emissions category is selected.
   */
  const fuels = useMemo(
    () => ({
      activeRowIds: props.query.activeFuels.edges
        .filter(({ node }) => emissionCategoryFuelIds?.includes(node.rowId))
        .map(({ node }) => node.rowId),
      activeNames: props.query.activeFuels?.edges
        ?.filter(({ node }) => emissionCategoryFuelIds?.includes(node.rowId))
        .map(({ node }) => node.name),
    }),
    [props.query, emissionCategoryFuelIds]
  );
  const fuelRowIdSchema = useMemo(
    () => JSON.parse(JSON.stringify(schema.properties.fuelRowId)),
    [schema]
  );

  const modifiedSchema = useMemo(
    () => ({
      ...schema,
      properties: {
        ...schema.properties,
        fuelRowId: {
          ...fuelRowIdSchema,
          enum: fuels.activeRowIds,
          enumNames: fuels.activeNames,
        },
      },
    }),
    [schema, fuels]
  );

  // When an emission category is not set, the fuel and quantity cannot be filled.
  const modifiedUiSchema = useMemo(() => {
    return {
      ...uiSchema,
      fuelRowId: {
        ...uiSchema.fuelRowId,
        "ui:readonly": !selectedEmissionCategoryRowId,
      },
      quantity: {
        ...uiSchema.quantity,
        "ui:disabled": !selectedEmissionCategoryRowId, // disabled was used as the widget changes drastically in readonly, but not in disabled
      },
    };
  }, [selectedEmissionCategoryRowId]);

  const isFuelArchived =
    formData.fuelRowId !== undefined &&
    query.allFuels.edges.some(
      ({ node }) =>
        node.state === "archived" && node.rowId === formData.fuelRowId
    );

  // This function updates the fuel, along with the units associated with that fuel
  const handlefuelChange = (fuelRowId: number) => {
    const fuel = query.allFuels.edges.find(
      ({ node }) => node.rowId === fuelRowId
    )?.node;
    onChange({
      ...formData,
      fuelRowId,
      fuelUnits: fuel?.units,
    });
  };

  /**
   * on change handler for when the emissions category is changed.
   * @param fuelFormData updated form data to be handled
   * There are three scenarios that this function handles:
   * 1. The emission category is changed to another category that allows the currently selected fuel ==> the fuel data remains in place
   * 2. The emissions categotry was unset ==> the fuel, fuelUnits, and quantity are also be unset
   * 3. The emission category is changed to one that does not contain the currently selected fuel ==> the fuel, fuelUnits, and quantity are also be unset
   */
  const handleEmissionCategoryChange = (fuelFormData) => {
    const { emissionCategoryRowId, fuelRowId } = fuelFormData;
    const newFuelIds = emissionCategoryRowId
      ? getFuelIdsByEmissionCategoryRowId(emissionCategoryRowId)
      : null;

    // Scenario 3
    if (newFuelIds && newFuelIds.includes(fuelRowId)) onChange(fuelFormData);
    // Sceanrios 2 & 3
    else
      onChange({
        ...fuelFormData,
        fuelRowId: undefined,
        quantity: "", // This one needs to be an empty string for the widget to rerender without the text when the value is cleared
        fuelUnits: undefined,
      });
  };

  const handleChange = (fuel) => {
    if (formData.emissionCategoryRowId !== fuel.emissionCategoryRowId)
      handleEmissionCategoryChange(fuel);
    else if (formData.fuelRowId === fuel.fuelRowId) onChange(fuel);
    else handlefuelChange(fuel.fuelRowId);
  };

  return (
    <ObjectField
      {...props}
      schema={modifiedSchema}
      uiSchema={modifiedUiSchema}
      disabled={isFuelArchived}
      onChange={handleChange}
    />
  );
};

export default createFragmentContainer(FuelFieldComponent, {
  query: graphql`
    fragment FuelField_query on Query {
      allFuels {
        edges {
          node {
            units
            rowId
            state
          }
        }
      }
      fuelIdsByEmissionCategoryId {
        edges {
          node {
            emissionCategoryId
            fuelIds
          }
        }
      }
      activeFuels: allFuels(
        filter: { state: { equalTo: "active" } }
        orderBy: NAME_ASC
      ) {
        edges {
          node {
            rowId
            name
          }
        }
      }
    }
  `,
});
