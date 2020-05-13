import React, {useMemo} from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {
  Button,
  Modal,
  Container,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import {JSONSchema6} from 'json-schema';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {ProductRowItemContainer_product} from 'ProductRowItemContainer_product.graphql';
import {ProductRowItemContainer_query} from 'ProductRowItemContainer_query.graphql';
import updateProductMutation from 'mutations/product/updateProductMutation';
import {CiipProductState} from 'updateProductMutation.graphql';
import updateBenchmarkMutation from 'mutations/benchmark/updateBenchmarkMutation';
import createBenchmarkMutation from 'mutations/benchmark/createBenchmarkMutation';
import FormArrayFieldTemplate from 'containers/Forms/FormArrayFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import productSchema from './product-schema.json';
import moment from 'moment-timezone';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTachometerAlt, faCube} from '@fortawesome/free-solid-svg-icons';
import HeaderWidget from 'components/HeaderWidget';
import PastBenchmarks from 'components/Benchmark/PastBenchmarks';

interface Props {
  relay: RelayProp;
  product: ProductRowItemContainer_product;
  query: ProductRowItemContainer_query;
  updateProductCount: (...args: any[]) => void;
  productCount: number;
}

// Schema for ProductRowItemContainer
// TODO: Use a number widget for string types that should be numbers (with postgres numeric type)
const benchmarkUISchema = {
  current: {
    'ui:col-md': 12,
    classNames: 'hidden-title',
    'ui:widget': 'header',
    'ui:options': {
      text: 'Current Benchmark Information'
    }
  },
  benchmark: {
    'ui:col-md': 3
  },
  eligibilityThreshold: {
    'ui:col-md': 3
  },
  startReportingYear: {
    'ui:col-md': 3,
    'ui:help': 'The first reporting year where this benchmark is used'
  },
  endReportingYear: {
    'ui:col-md': 3,
    'ui:help': 'The last reporting year where this benchmark is used'
  },
  incentiveMultiplier: {
    'ui:col-md': 3
  },
  minimumIncentiveRatio: {
    'ui:col-md': 3
  },
  maximumIncentiveRatio: {
    'ui:col-md': 3
  }
};

/**  Note: There is some placeholder validation done on the front end here (dateRegexFormat, timeRangeOverlap, etc) that should be revisited
 *         when we have had a design / constraint brainstorming session for benchmarks.
 * */

export const ProductRowItemComponent: React.FunctionComponent<Props> = ({
  relay,
  product,
  query,
  updateProductCount,
  productCount
}) => {
  const currentBenchmark = product.benchmarksByProductId?.edges[0]?.node;

  const pastBenchmarks = product.benchmarksByProductId?.edges.slice(1);

  // Schema for ProductRowItemContainer
  const benchmarkSchema = useMemo<JSONSchema6>(() => {
    const reportingYears = query.allReportingYears.edges.map(
      ({node}) => node.reportingYear
    );
    return {
      type: 'object',
      required: [
        'benchmark',
        'eligibilityThreshold',
        'minimumIncentiveRatio',
        'maximumIncentiveRatio',
        'incentiveMultiplier',
        'startReportingYear',
        'endReportingYear'
      ],
      properties: {
        current: {
          type: 'string'
        },
        benchmark: {
          type: 'string',
          title: 'Benchmark'
        },
        startReportingYear: {
          type: 'number',
          title: 'Start Reporting Period',
          enum: reportingYears
        },
        endReportingYear: {
          type: 'number',
          title: 'End Reporting Period',
          enum: reportingYears
        },
        eligibilityThreshold: {
          type: 'string',
          title: 'Eligibility Threshold'
        },
        incentiveMultiplier: {
          type: 'string',
          title: 'Incentive Multiplier',
          defaultValue: '1'
        },
        minimumIncentiveRatio: {
          type: 'string',
          title: 'Minimum incentive ratio',
          defaultValue: '0'
        },
        maximumIncentiveRatio: {
          type: 'string',
          title: 'Maximum incentive ratio',
          defaultValue: '1'
        }
      }
    };
  }, [query.allReportingYears]);

  /**
   * Mutation functions
   */

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

  const handleUpdateProductCount = (newCount) => {
    updateProductCount(newCount);
  };

  const [productModalShow, setProductModalShow] = React.useState(false);
  const [benchmarkModalShow, setBenchmarkModalShow] = React.useState(false);

  const modalButtons = (isProduct: boolean) => {
    if (isProduct) {
      if (product.productState === 'DRAFT')
        return (
          <>
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Button
              variant="success"
              onClick={async () => updateStatus('PUBLISHED')}
            >
              Publish Product
            </Button>
          </>
        );

      if (product.productState === 'PUBLISHED')
        return (
          <Button
            variant="warning"
            onClick={async () => updateStatus('ARCHIVED')}
          >
            Archive Product
          </Button>
        );
    }

    if (
      product.productState === 'DRAFT' ||
      product.productState === 'PUBLISHED'
    )
      return <Button type="submit">Save</Button>;

    return <Button className="hidden-button" />;
  };

  const innerModal = (isProduct: boolean) => (
    <>
      <Modal.Header closeButton style={{color: 'white', background: '#003366'}}>
        <Modal.Title>
          {isProduct ? 'Edit Product' : 'Edit Benchmark'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{background: '#f5f5f5'}}>
        <Container>
          <JsonSchemaForm
            omitExtraData
            liveOmit
            disabled={
              isProduct
                ? product.productState !== 'DRAFT' || product.isReadOnly
                : product.productState === 'ARCHIVED' || product.isReadOnly
            }
            widgets={{header: HeaderWidget}}
            schema={
              isProduct
                ? (productSchema.schema as JSONSchema6)
                : benchmarkSchema
            }
            uiSchema={isProduct ? productSchema.uiSchema : benchmarkUISchema}
            formData={isProduct ? product : currentBenchmark}
            showErrorList={false}
            ArrayFieldTemplate={FormArrayFieldTemplate}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            onSubmit={
              isProduct
                ? editProduct
                : currentBenchmark && product.productState === 'DRAFT'
                ? editBenchmark
                : createBenchmark
            }
          >
            {modalButtons(isProduct)}
          </JsonSchemaForm>
          {isProduct ? null : (
            <PastBenchmarks pastBenchmarks={pastBenchmarks} />
          )}
        </Container>
      </Modal.Body>
      <style jsx global>{`
        .hidden-title label {
          display: none;
        }
        .close {
          color: white;
        }
        .hidden-button {
          display: none;
        }
      `}</style>
    </>
  );

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
      {innerModal(true)}
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
      {innerModal(false)}
    </Modal>
  );

  return (
    <>
      <tr>
        <td>{product.productName}</td>
        <td>{moment(product.updatedAt).format('DD-MM-YYYY')}</td>
        <td>{currentBenchmark?.benchmark ?? null}</td>
        <td>{currentBenchmark?.eligibilityThreshold ?? null}</td>
        <td>{product.requiresEmissionAllocation ? 'Yes' : 'No'}</td>
        <td>{product.productState}</td>
        <td>{product.isCiipProduct ? 'Yes' : 'No'}</td>
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
                {product.productState === 'DRAFT' ? 'Edit' : 'View'} Product
              </Tooltip>
            }
          >
            <FontAwesomeIcon
              className={
                product.productState === 'DRAFT'
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
      <style jsx global>
        {`
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
    }
  `
});
