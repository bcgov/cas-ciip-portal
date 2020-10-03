import React, {useMemo} from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {Modal, Badge, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {IChangeEvent} from 'react-jsonschema-form';
import {ProductRowItemContainer_product} from 'ProductRowItemContainer_product.graphql';
import {ProductRowItemContainer_query} from 'ProductRowItemContainer_query.graphql';
import updateProductMutation from 'mutations/product/updateProductMutation';
import {CiipProductState} from 'updateProductMutation.graphql';
import updateBenchmarkMutation from 'mutations/benchmark/updateBenchmarkMutation';
import createBenchmarkMutation from 'mutations/benchmark/createBenchmarkMutation';
import benchmarkSchemaFunction from './benchmark-schema';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faCube,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons';
import createLinkedProductMutation from 'mutations/linked_product/createLinkedProductMutation';
import updateLinkedProductMutation from 'mutations/linked_product/updateLinkedProductMutation';
import InnerModal from './InnerProductBenchmarkModal';
import LinkedProductModal from './LinkedProductModal';
import {dateTimeFormat} from 'functions/formatDates';

interface Props {
  relay: RelayProp;
  product: ProductRowItemContainer_product;
  query: ProductRowItemContainer_query;
  updateProductCount: (...args: any[]) => void;
  productCount: number;
}

export const ProductRowItemComponent: React.FunctionComponent<Props> = ({
  relay,
  product,
  query,
  updateProductCount,
  productCount
}) => {
  const [productModalShow, setProductModalShow] = React.useState(false);
  const [benchmarkModalShow, setBenchmarkModalShow] = React.useState(false);
  const [linkProductModalShow, setLinkProductModalShow] = React.useState(false);

  const currentBenchmark = product.benchmarksByProductId?.edges[0]?.node;
  const pastBenchmarks = product.benchmarksByProductId?.edges.slice(1);

  // Schema for ProductRowItemContainer
  const benchmarkSchema = useMemo(() => {
    const reportingYears = query.allReportingYears.edges.map(
      ({node}) => node.reportingYear
    );
    return benchmarkSchemaFunction(reportingYears);
  }, [query.allReportingYears]);

  /** Mutation functions **/

  const handleUpdateProductCount = (newCount) => {
    updateProductCount(newCount);
  };

  // Change a product status
  const updateStatus = async (state: CiipProductState) => {
    const variables = {
      input: {
        id: product.id,
        productPatch: {
          productState: state
        }
      }
    };
    const response = await updateProductMutation(relay.environment, variables);
    handleUpdateProductCount((productCount += 1));
    setProductModalShow(false);
    console.log(response);
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
          addEmissionsFromEios: e.formData.addEmissionsFromEios
        }
      }
    };
    const response = await updateProductMutation(relay.environment, variables);
    handleUpdateProductCount((productCount += 1));
    setProductModalShow(false);
    console.log(response);
  };

  const createBenchmark = async ({formData}: IChangeEvent) => {
    const variables = {
      input: {
        benchmark: {
          ...formData,
          productId: product.rowId
        }
      }
    };

    const response = await createBenchmarkMutation(
      relay.environment,
      variables
    );
    handleUpdateProductCount((productCount += 1));
    setBenchmarkModalShow(false);
    console.log(response);
  };

  const editBenchmark = async ({formData}: IChangeEvent) => {
    const variables = {
      input: {
        id: currentBenchmark.id,
        benchmarkPatch: {
          ...formData
        }
      }
    };
    const response = await updateBenchmarkMutation(
      relay.environment,
      variables
    );
    handleUpdateProductCount((productCount += 1));
    setBenchmarkModalShow(false);
    console.log(response);
  };

  const createLinkedProduct = async (newLink: number) => {
    const variables = {
      input: {
        linkedProduct: {
          productId: product.rowId,
          linkedProductId: newLink,
          isDeleted: false
        }
      }
    };

    const response = await createLinkedProductMutation(
      relay.environment,
      variables
    );
    handleUpdateProductCount((productCount += 1));
    console.log(response);
  };

  const removeLinkedProduct = async (removeLink: {
    productRowId: number;
    linkId: number;
  }) => {
    const variables = {
      input: {
        rowId: removeLink.linkId,
        linkedProductPatch: {
          productId: product.rowId,
          linkedProductId: removeLink.productRowId,
          isDeleted: true
        }
      }
    };

    const response = await updateLinkedProductMutation(
      relay.environment,
      variables
    );
    handleUpdateProductCount((productCount += 1));
    console.log(response);
  };

  const getLinkData = () => {
    const dataArray = [];
    if (!product) return [];
    product.linkedProduct.edges.forEach((edge) => {
      const dataObject = {productRowId: null, linkId: null};
      dataObject.productRowId = edge.node.linkedProductId;
      dataObject.linkId = edge.node.rowId;
      dataArray.push(dataObject);
    });
    return dataArray;
  };

  const linkData = getLinkData();

  const saveLinkedProducts = async (newData: IChangeEvent) => {
    const previousLinks = [];
    const newLinks = [];

    linkData.forEach((obj) => {
      previousLinks.push(obj.productRowId);
    });
    newData.formData.forEach((obj) => {
      newLinks.push(obj.productRowId);
    });

    newLinks.forEach(async (id) => {
      if (!previousLinks.includes(id)) {
        const response = await createLinkedProduct(id);
        console.log(response);
      }
    });

    previousLinks.forEach(async (id, index) => {
      if (!newLinks.includes(id)) {
        const response = await removeLinkedProduct(linkData[index]);
        console.log(response);
      }
    });
    setLinkProductModalShow(false);
  };

  /** Modals **/

  const editProductModal = (
    <Modal
      centered
      size="xl"
      show={productModalShow}
      onHide={() => {
        setProductModalShow(false);
        handleUpdateProductCount((productCount += 1));
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
      onHide={() => {
        setBenchmarkModalShow(false);
        handleUpdateProductCount((productCount += 1));
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
    'warning' | 'success' | 'secondary'
  > = {
    DRAFT: 'warning',
    PUBLISHED: 'success',
    ARCHIVED: 'secondary'
  };

  return (
    <>
      <tr>
        <td>{product.productName}</td>
        <td>{dateTimeFormat(product.updatedAt, 'days_numbered')}</td>
        <td>{currentBenchmark?.benchmark ?? null}</td>
        <td>{currentBenchmark?.eligibilityThreshold ?? null}</td>
        <td>{product.requiresEmissionAllocation ? 'Yes' : 'No'}</td>
        <td>
          <Badge pill variant={statusBadgeColor[product.productState]}>
            {product.productState}
          </Badge>
        </td>
        <td>{product.isCiipProduct ? 'Yes' : 'No'}</td>
        <td>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="link-product">Link Products</Tooltip>}
          >
            <FontAwesomeIcon
              className={
                product.productState === 'ARCHIVED'
                  ? 'editIcon-disabled'
                  : 'editIcon'
              }
              icon={faShareAlt}
              onClick={() => setLinkProductModalShow(true)}
            />
          </OverlayTrigger>
          &emsp;
        </td>
        <td>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="benchmark">
                {product.productState === 'ARCHIVED' ? 'View' : 'Edit'}{' '}
                Benchmark
              </Tooltip>
            }
          >
            <FontAwesomeIcon
              className={
                product.productState === 'ARCHIVED'
                  ? 'editIcon-disabled'
                  : 'editIcon'
              }
              icon={faTachometerAlt}
              onClick={() => setBenchmarkModalShow(true)}
            />
          </OverlayTrigger>
          &emsp;
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="product">
                {product.productState === 'DRAFT' && !product.isReadOnly
                  ? 'Edit'
                  : 'View'}{' '}
                Product
              </Tooltip>
            }
          >
            <FontAwesomeIcon
              className={
                product.productState === 'DRAFT' && !product.isReadOnly
                  ? 'editIcon'
                  : 'editIcon-disabled'
              }
              icon={faCube}
              onClick={() => setProductModalShow(true)}
            />
          </OverlayTrigger>
        </td>
      </tr>
      {editProductModal}
      {editBenchmarkModal}
      <LinkedProductModal
        product={product}
        linkProductModalShow={linkProductModalShow}
        setLinkProductModalShow={setLinkProductModalShow}
        query={query}
        saveLinkedProducts={saveLinkedProducts}
        linkData={linkData}
      />
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
      benchmarksByProductId(orderBy: CREATED_AT_DESC) {
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
      linkedProduct {
        edges {
          node {
            rowId
            rowId
            linkedProductId
          }
        }
      }
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
      ...ProductRowIdField_query
    }
  `
});
