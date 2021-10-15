import React, { useMemo } from "react";
import { graphql, createFragmentContainer, RelayProp } from "react-relay";
import { Modal, Badge, Dropdown, Button } from "react-bootstrap";
import { IChangeEvent } from "@rjsf/core";
import { ProductRowItemContainer_product } from "ProductRowItemContainer_product.graphql";
import { ProductRowItemContainer_query } from "ProductRowItemContainer_query.graphql";
import updateProductMutation from "mutations/product/updateProductMutation";
import { CiipProductState } from "updateProductMutation.graphql";
import updateBenchmarkMutation from "mutations/benchmark/updateBenchmarkMutation";
import createBenchmarkMutation from "mutations/benchmark/createBenchmarkMutation";
import benchmarkSchemaFunction from "./benchmark-schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import InnerModal, {
  productBenchmarkModalHeaderId,
} from "./InnerProductBenchmarkModal";
import { dateTimeFormat } from "functions/formatDates";
import LinkedProducts from "./LinkedProducts";

interface Props {
  relay: RelayProp;
  product: ProductRowItemContainer_product;
  query: ProductRowItemContainer_query;
}

export const ProductRowItemComponent: React.FunctionComponent<Props> = ({
  relay,
  product,
  query,
}) => {
  const [productModalShow, setProductModalShow] = React.useState(false);
  const [benchmarkModalShow, setBenchmarkModalShow] = React.useState(false);
  const [linkProductModalShow, setLinkProductModalShow] = React.useState(false);

  const currentBenchmark = product.benchmarksByProductId?.edges[0]?.node;
  const pastBenchmarks = product.benchmarksByProductId?.edges.slice(1);

  // Schema for ProductRowItemContainer
  const benchmarkSchema = useMemo(() => {
    const reportingYears = query.allReportingYears.edges.map(
      ({ node }) => node.reportingYear
    );
    return benchmarkSchemaFunction(reportingYears);
  }, [query.allReportingYears]);

  /** Mutation functions **/

  // Change a product status
  const updateStatus = async (state: CiipProductState) => {
    const variables = {
      input: {
        id: product.id,
        productPatch: {
          productState: state,
        },
      },
    };
    await updateProductMutation(relay.environment, variables);
    setProductModalShow(false);
  };

  // Save a product
  const editProduct = async (e: IChangeEvent) => {
    const variables = {
      input: {
        id: product.id,
        productPatch: {
          productName: e.formData.productName,
          units: e.formData.units,
          productState: product.productState,
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
          requiresProductAmount: e.formData.requiresProductAmount,
          addEmissionsFromEios: e.formData.addEmissionsFromEios,
        },
      },
    };
    await updateProductMutation(relay.environment, variables);
    setProductModalShow(false);
  };

  const createBenchmark = async ({ formData }: IChangeEvent) => {
    const variables = {
      input: {
        benchmark: {
          ...formData,
          productId: product.rowId,
        },
      },
      productId: product.id,
    };

    await createBenchmarkMutation(relay.environment, variables);
    setBenchmarkModalShow(false);
  };

  const editBenchmark = async ({ formData }: IChangeEvent) => {
    const variables = {
      input: {
        id: currentBenchmark.id,
        benchmarkPatch: {
          ...formData,
        },
      },
    };
    await updateBenchmarkMutation(relay.environment, variables);
    setBenchmarkModalShow(false);
  };

  /** Modals **/

  const editProductModal = (
    <Modal
      centered
      size="xl"
      show={productModalShow}
      aria-labelledby={productBenchmarkModalHeaderId}
      onHide={() => {
        setProductModalShow(false);
      }}
    >
      <InnerModal
        isProduct
        updateStatus={updateStatus}
        product={product}
        benchmarkSchema={benchmarkSchema}
        currentBenchmark={currentBenchmark}
        editProduct={editProduct}
        editBenchmark={editBenchmark}
        createBenchmark={createBenchmark}
        pastBenchmarks={pastBenchmarks}
      />
    </Modal>
  );

  const editBenchmarkModal = (
    <Modal
      centered
      size="xl"
      show={benchmarkModalShow}
      aria-labelledby={productBenchmarkModalHeaderId}
      onHide={() => {
        setBenchmarkModalShow(false);
      }}
    >
      <InnerModal
        isProduct={false}
        updateStatus={updateStatus}
        product={product}
        benchmarkSchema={benchmarkSchema}
        currentBenchmark={currentBenchmark}
        editProduct={editProduct}
        editBenchmark={editBenchmark}
        createBenchmark={createBenchmark}
        pastBenchmarks={pastBenchmarks}
      />
    </Modal>
  );

  const statusBadgeColor: Record<
    CiipProductState,
    "warning" | "success" | "secondary"
  > = {
    DRAFT: "warning",
    PUBLISHED: "success",
    ARCHIVED: "secondary",
  };

  return (
    <>
      <tr>
        <td className="text-left">{product.productName}</td>
        <td>
          <Dropdown>
            <Dropdown.Toggle
              id={`dropdown-${product.id}`}
              variant="light"
              as={Button}
              aria-label="Product Settings"
              title="Product Settings"
              style={{ background: "transparent", border: "none" }}
            >
              <FontAwesomeIcon size="lg" icon={faCog} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setProductModalShow(true)}>
                Product details
              </Dropdown.Item>
              {product.isCiipProduct && (
                <Dropdown.Item onClick={() => setBenchmarkModalShow(true)}>
                  Benchmark
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={() => setLinkProductModalShow(true)}>
                Linked products
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
        <td>{dateTimeFormat(product.updatedAt, "date_year_first")}</td>
        <td>{currentBenchmark?.benchmark ?? null}</td>
        <td>{currentBenchmark?.eligibilityThreshold ?? null}</td>
        <td>{product.requiresEmissionAllocation ? "Yes" : "No"}</td>
        <td>{product.isCiipProduct ? "Yes" : "No"}</td>
        <td>
          <Badge pill variant={statusBadgeColor[product.productState]}>
            {product.productState}
          </Badge>
        </td>
        <td />
      </tr>
      {editProductModal}
      {editBenchmarkModal}
      {linkProductModalShow && (
        <LinkedProducts
          product={product}
          setLinkProductModalShow={setLinkProductModalShow}
          query={query}
        />
      )}
      <style jsx global>
        {`
          .hidden-title label {
            display: none;
          }
          .editIcon:hover {
            color: red;
            cursor: pointer;
          }
          .editIcon-disabled {
            opacity: 0.5;
          }
        }
        .editIcon-disabled:hover {
          color: red;
          opacity: 0.5;
          cursor: pointer;
        }
        .table td {
          vertical-align: middle;
        }
        `}
      </style>
    </>
  );
};

export default createFragmentContainer(ProductRowItemComponent, {
  product: graphql`
    fragment ProductRowItemContainer_product on Product {
      id
      rowId
      productName
      productState
      units
      requiresEmissionAllocation
      isCiipProduct
      isReadOnly
      addPurchasedElectricityEmissions
      subtractExportedElectricityEmissions
      addPurchasedHeatEmissions
      subtractExportedHeatEmissions
      subtractGeneratedElectricityEmissions
      subtractGeneratedHeatEmissions
      addEmissionsFromEios
      requiresProductAmount
      updatedAt
      currentBenchmark
      currentEligibilityThreshold
      benchmarksByProductId(orderBy: ID_DESC) {
        edges {
          node {
            id
            rowId
            benchmark
            eligibilityThreshold
            incentiveMultiplier
            startReportingYear
            endReportingYear
            minimumIncentiveRatio
            maximumIncentiveRatio
            createdAt
          }
        }
      }
      ...LinkedProducts_product
    }
  `,
  query: graphql`
    fragment ProductRowItemContainer_query on Query {
      nextReportingYear {
        reportingYear
      }
      allReportingYears {
        edges {
          node {
            reportingYear
          }
        }
      }
      ...LinkedProducts_query
    }
  `,
});
