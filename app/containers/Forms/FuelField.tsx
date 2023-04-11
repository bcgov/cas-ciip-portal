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
  const selectedEmissionCategoryRowId = useMemo(
    () => formData.emissionCategoryRowId,
    [formData]
  );

  const getFuelIdsByEmissionCategoryRowId = (EmissionCategoryRowId) => {
    const categoryObject = query.fuelIdsByEmissionCategoryId.edges.find(
      (edge) => edge.node.emissionCategoryId === EmissionCategoryRowId
    );
    return categoryObject?.node?.fuelIds;
  };
  const emissionCategoryFuelIds = useMemo(() => {
    return getFuelIdsByEmissionCategoryRowId(selectedEmissionCategoryRowId);
  }, [selectedEmissionCategoryRowId]);

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
  const fuelByRowIdSchema = useMemo(
    () => JSON.parse(JSON.stringify(schema.properties.fuelRowId)),
    [schema]
  );

  const modifiedSchema = useMemo(
    () => ({
      ...schema,
      properties: {
        ...schema.properties,
        fuelRowId: {
          ...fuelByRowIdSchema,
          enum: fuels.activeRowIds,
          enumNames: fuels.activeNames,
        },
      },
    }),
    [schema, fuels]
  );

  const modifiedUiSchema = useMemo(() => {
    return {
      ...uiSchema,
      fuelRowId: {
        ...uiSchema.fuelRowId,
        "ui:readonly": !selectedEmissionCategoryRowId,
      },
      quantity: {
        ...uiSchema.quantity,
        "ui:disabled": !selectedEmissionCategoryRowId,
      },
    };
  }, [selectedEmissionCategoryRowId]);

  const isFuelArchived =
    formData.fuelRowId !== undefined &&
    query.allFuels.edges.some(
      ({ node }) =>
        node.state === "archived" && node.rowId === formData.fuelRowId
    );

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

  const handleEmissionCategoryChange = (fuel) => {
    const { emissionCategoryRowId, fuelRowId } = fuel;
    const newFuelIds =
      emissionCategoryRowId && fuelRowId
        ? getFuelIdsByEmissionCategoryRowId(emissionCategoryRowId)
        : null;
    if (newFuelIds && newFuelIds.includes(fuelRowId)) onChange(fuel);
    else
      onChange({
        ...fuel,
        fuelRowId: undefined,
        quantity: "",
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
