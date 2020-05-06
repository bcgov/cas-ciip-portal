import React, {useMemo} from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {
  Button,
  Modal,
  Container,
  Row,
  Col,
  Card,
  Collapse,
  Table
} from 'react-bootstrap';
import {JSONSchema6} from 'json-schema';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import moment from 'moment-timezone';
import {ProductRowItemContainer_product} from 'ProductRowItemContainer_product.graphql';
import {ProductRowItemContainer_query} from 'ProductRowItemContainer_query.graphql';
import updateProductMutation from 'mutations/product/updateProductMutation';
import {CiipProductState} from 'updateProductMutation.graphql';
import updateBenchmarkMutation from 'mutations/benchmark/updateBenchmarkMutation';
import createBenchmarkMutation from 'mutations/benchmark/createBenchmarkMutation';
import FormArrayFieldTemplate from 'containers/Forms/FormArrayFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import FutureBenchmarks from './FutureBenchmarks';
import productSchema from './product-schema.json';

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
  startReportingYear: {
    'ui:help': 'The first reporting year where this benchmark is used'
  },
  endReportingYear: {
    'ui:help': 'The last reporting year where this benchmark is used'
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
  const {reportingYear: nextReportingYear} = query.nextReportingYear;

  const currentBenchmark = useMemo(() => {
    return product.benchmarksByProductId.edges.find(({node: benchmark}) => {
      return (
        !benchmark.deletedAt &&
        benchmark.startReportingYear <= nextReportingYear &&
        benchmark.endReportingYear >= nextReportingYear
      );
    })?.node;
  }, [product.benchmarksByProductId.edges, nextReportingYear]);

  const pastBenchmarks = useMemo(
    () =>
      product.benchmarksByProductId.edges
        .filter(
          ({node}) =>
            !node.deletedAt && node.endReportingYear < nextReportingYear
        )
        .map(({node}) => node),
    [nextReportingYear, product.benchmarksByProductId.edges]
  );

  const futureBenchmarks = useMemo(
    () =>
      product.benchmarksByProductId.edges
        .filter(
          ({node}) =>
            !node.deletedAt && node.startReportingYear > nextReportingYear
        )
        .map(({node}) => node),
    [nextReportingYear, product.benchmarksByProductId.edges]
  );

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
        benchmark: {
          type: 'string',
          title: 'Benchmark'
        },
        eligibilityThreshold: {
          type: 'string',
          title: 'Eligibility Threshold'
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
        },
        incentiveMultiplier: {
          type: 'string',
          title: 'Incentive Multiplier',
          defaultValue: '1'
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
        }
      }
    };
  }, [query.allReportingYears]);

  const displayPastBenchmark = (benchmark) => {
    return (
      <tr key={benchmark.id}>
        <td>{benchmark.benchmark}</td>
        <td>{benchmark.eligibilityThreshold}</td>
        <td>{benchmark.incentiveMultiplier}</td>
        <td>{benchmark.startReportingYear}</td>
        <td>{benchmark.endReportingYear}</td>
      </tr>
    );
  };

  /**
   * Mutation functions
   */

  // Archive a Product
  const setArchived = async () => {
    const variables = {
      input: {
        id: product.id,
        productPatch: {
          productState: 'ARCHIVED' as CiipProductState
        }
      }
    };
    const response = await updateProductMutation(relay.environment, variables);
    handleUpdateProductCount((productCount += 1));
    console.log(response);
  };

  // Save a product
  const editProduct = async (e: IChangeEvent) => {
    const variables = {
      input: {
        id: product.id,
        productPatch: {
          productName: e.formData.name,
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
    console.log(response);
  };

  // This fuction does not 'DELETE' from the database, but sets the deleted at / deleted by values. This action is not recoverable through the UI
  const deleteBenchmark = async (benchmark) => {
    if (!benchmark) return;
    const variables = {
      input: {
        id: currentBenchmark.id,
        benchmarkPatch: {
          deletedAt: moment
            .tz('America/Vancouver')
            .format('YYYY-MM-DDTHH:mm:ss')
        }
      }
    };
    const response = await updateBenchmarkMutation(
      relay.environment,
      variables
    );
    console.log(response);
  };

  const handleDeleteBenchmark = async (benchmark) => {
    await deleteBenchmark(benchmark);
  };

  const handleUpdateProductCount = (newCount) => {
    updateProductCount(newCount);
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [futureBenchmarksOpen, setFutureBenchmarksOpen] = React.useState(false);
  const [pastBenchmarksOpen, setPastBenchmarksOpen] = React.useState(false);
  const [addBenchmarkOpen, setAddBenchmarkOpen] = React.useState(false);

  const editModal = (
    <Modal
      centered
      size="xl"
      show={modalShow}
      onHide={() => {
        setModalShow(false);
        handleUpdateProductCount((productCount += 1));
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>PRODUCT</Row>
          <JsonSchemaForm
            omitExtraData
            liveOmit
            schema={productSchema.schema as JSONSchema6}
            uiSchema={productSchema.uiSchema}
            formData={product}
            showErrorList={false}
            ArrayFieldTemplate={FormArrayFieldTemplate}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            onSubmit={editProduct}
          >
            {product.productState === 'DRAFT' && (
              <Button type="submit" variant="primary">
                Save Product
              </Button>
            )}
            {product.productState === 'PUBLISHED' && (
              <Button variant="warning" onClick={setArchived}>
                Archive Product
              </Button>
            )}
          </JsonSchemaForm>
          <br />
          <Row>BENCHMARKS</Row>
          <br />
          Current
          <hr />
          <Row>
            <Col md={4}>Benchmark: {currentBenchmark?.benchmark ?? null}</Col>
            <Col md={4}>
              ET: {currentBenchmark?.eligibilityThreshold ?? null}
            </Col>
            <Col md={4}>
              Multiplier: {currentBenchmark?.incentiveMultiplier ?? null}
            </Col>
            <Col md={4}>
              Last Reporting Year: {currentBenchmark?.endReportingYear ?? null}
            </Col>
          </Row>
          <JsonSchemaForm
            omitExtraData
            liveOmit
            schema={benchmarkSchema}
            uiSchema={benchmarkUISchema}
            formData={currentBenchmark}
            showErrorList={false}
            ArrayFieldTemplate={FormArrayFieldTemplate}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            onSubmit={
              product.productState === 'DRAFT' ? editBenchmark : createBenchmark
            }
          >
            <Button type="submit">Save</Button>
            <Button
              variant="danger"
              onClick={async () => deleteBenchmark(currentBenchmark)}
            >
              Delete
            </Button>
          </JsonSchemaForm>
          <br />
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header
                  onClick={() => setFutureBenchmarksOpen(!futureBenchmarksOpen)}
                >
                  Future Benchmarks
                </Card.Header>
                <Collapse in={futureBenchmarksOpen}>
                  <Card.Body>
                    {futureBenchmarks.map((benchmark) => (
                      <FutureBenchmarks
                        key={benchmark.id}
                        benchmark={benchmark}
                        environment={relay.environment}
                        handleDeleteBenchmark={handleDeleteBenchmark}
                        benchmarkSchema={benchmarkSchema}
                        benchmarkUISchema={benchmarkUISchema}
                      />
                    ))}
                  </Card.Body>
                </Collapse>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header
                  onClick={() => setPastBenchmarksOpen(!pastBenchmarksOpen)}
                >
                  Past Benchmarks
                </Card.Header>
                <Collapse in={pastBenchmarksOpen}>
                  <Card.Body>
                    <Table>
                      <thead>
                        <tr>
                          <th>Benchmark</th>
                          <th>Eligibility Threshold</th>
                          <th>Incentive Multiplier</th>
                          <th>Start Reporting Year</th>
                          <th>End Reporting Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pastBenchmarks.map((benchmark) => {
                          return displayPastBenchmark(benchmark);
                        })}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Collapse>
              </Card>
            </Col>
          </Row>
          <Button
            style={{marginTop: '10px'}}
            variant="success"
            onClick={() => setAddBenchmarkOpen(!addBenchmarkOpen)}
          >
            Add Benchmark +
          </Button>
          <Collapse in={addBenchmarkOpen}>
            <Card>
              <Card.Header>Add Benchmark</Card.Header>
              <Card.Body>
                <JsonSchemaForm
                  omitExtraData
                  liveOmit
                  schema={benchmarkSchema}
                  uiSchema={benchmarkUISchema}
                  showErrorList={false}
                  ArrayFieldTemplate={FormArrayFieldTemplate}
                  FieldTemplate={FormFieldTemplate}
                  ObjectFieldTemplate={FormObjectFieldTemplate}
                  onSubmit={createBenchmark}
                >
                  <Button type="submit">Save</Button>
                  <Button
                    variant="warning"
                    onClick={() => setAddBenchmarkOpen(!addBenchmarkOpen)}
                  >
                    Cancel
                  </Button>
                </JsonSchemaForm>
              </Card.Body>
            </Card>
          </Collapse>
        </Container>
      </Modal.Body>
    </Modal>
  );

  return (
    <>
      <tr>
        <td>{product.productName}</td>
        <td>{product.units}</td>
        <td>{currentBenchmark?.benchmark ?? null}</td>
        <td>{currentBenchmark?.eligibilityThreshold ?? null}</td>
        <td>{product.productState}</td>
        <td>
          {product.productState === 'DRAFT' && (
            <Button variant="info" onClick={() => setModalShow(true)}>
              Edit
            </Button>
          )}
        </td>
      </tr>
      {editModal}
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
      addPurchasedElectricityEmissions
      subtractExportedElectricityEmissions
      addPurchasedHeatEmissions
      subtractExportedHeatEmissions
      subtractGeneratedElectricityEmissions
      subtractGeneratedHeatEmissions
      addEmissionsFromEios
      requiresProductAmount
      benchmarksByProductId {
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
            deletedAt
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
