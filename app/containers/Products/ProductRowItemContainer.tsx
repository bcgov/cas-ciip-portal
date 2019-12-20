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
import saveProductMutation from 'mutations/product/saveProductMutation';
import editBenchmarkMutation from 'mutations/benchmark/editBenchmarkMutation';
import createBenchmarkMutation from 'mutations/benchmark/createBenchmarkMutation';
import FormArrayFieldTemplate from '../Forms/FormArrayFieldTemplate';
import FormFieldTemplate from '../Forms/FormFieldTemplate';
import FormObjectFieldTemplate from '../Forms/FormObjectFieldTemplate';
import {productSchema, productUISchema} from './ProductBenchmarkJsonSchemas';
import FutureBenchmarks from './FutureBenchmarks';

interface Props {
  relay: RelayProp;
  product: ProductRowItemContainer_product;
  query: ProductRowItemContainer_query;
}

// Schema for ProductRowItemContainer
const benchmarkUISchema = {
  benchmark: {
    'ui:col-md': 6
  },
  description: {
    'ui:col-md': 6
  },
  startReportingYear: {
    'ui:col-md': 6,
    'ui:help': 'The first reporting year where this benchmark is used'
  },
  endReportingYear: {
    'ui:col-md': 6,
    'ui:help': 'The last reporting year where this benchmark is used'
  }
};

/**  Note: There is some placeholder validation done on the front end here (dateRegexFormat, timeRangeOverlap, etc) that should be revisited
 *         when we have had a design / constraint brainstorming session for benchmarks.
 * */

export const ProductRowItemComponent: React.FunctionComponent<Props> = ({
  relay,
  product,
  query
}) => {
  const {reportingYear: currentReportingYear} = query.getReportingYear;

  const currentBenchmark = useMemo(() => {
    return product.benchmarksByProductId.edges.find(({node: benchmark}) => {
      return (
        !benchmark.deletedAt &&
        benchmark.startReportingYear <= currentReportingYear &&
        benchmark.endReportingYear >= currentReportingYear
      );
    })?.node;
  }, [product.benchmarksByProductId.edges, currentReportingYear]);

  const pastBenchmarks = useMemo(
    () =>
      product.benchmarksByProductId.edges
        .filter(
          ({node}) =>
            !node.deletedAt && node.endReportingYear < currentReportingYear
        )
        .map(({node}) => node),
    [currentReportingYear, product.benchmarksByProductId.edges]
  );

  const futureBenchmarks = useMemo(
    () =>
      product.benchmarksByProductId.edges
        .filter(
          ({node}) =>
            !node.deletedAt && node.startReportingYear > currentReportingYear
        )
        .map(({node}) => node),
    [currentReportingYear, product.benchmarksByProductId.edges]
  );

  // Schema for ProductRowItemContainer
  const benchmarkSchema = useMemo<JSONSchema6>(() => {
    const reportingYears = query.allReportingYears.edges
      .filter(({node}) => node.reportingYear >= currentReportingYear)
      .map(({node}) => node.reportingYear);
    return {
      type: 'object',
      properties: {
        benchmark: {
          type: 'number',
          title: 'Benchmark'
        },
        eligibilityThreshold: {
          type: 'number',
          title: 'Eligibility Threshold'
        },
        incentiveMultiplier: {
          type: 'number',
          title: 'Incentive Multiplier',
          defaultValue: 1
        },
        startReportingYear: {
          type: 'number',
          title: 'Start Reporting Year',
          enum: reportingYears
        },
        endReportingYear: {
          type: 'number',
          title: 'End Reporting Year',
          enum: reportingYears
        }
      }
    };
  }, [currentReportingYear, query.allReportingYears]);

  const displayPastBenchmark = benchmark => {
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

  // Toggle the 'archived' value of a Product
  const toggleArchived = async () => {
    const newState = product.state === 'archived' ? 'active' : 'archived';
    const variables = {
      input: {
        newName: product.name,
        newDescription: product.description || '',
        newState,
        prevId: product.rowId,
        newParent: [product.rowId],
        newUnits: product.units
      }
    };
    const response = await saveProductMutation(relay.environment, variables);
    console.log(response);
  };

  // Save a product
  const saveProduct = async (e: IChangeEvent) => {
    const variables = {
      input: {
        newName: e.formData.product,
        newDescription: e.formData.description,
        newState: 'active',
        prevId: product.rowId,
        newParent: [product.rowId],
        newUnits: product.units
      }
    };
    const response = await saveProductMutation(relay.environment, variables);
    console.log(response);
  };

  const createBenchmark = async ({formData}: IChangeEvent) => {
    const variables = {
      input: {
        benchmarkInput: formData.benchmark,
        eligibilityThresholdInput: formData.eligibilityThreshold,
        incentiveMultiplierInput: formData.incentiveMultiplier,
        productIdInput: product.rowId,
        startReportingYearInput: formData.startReportingYear,
        endDateInput: formData.endReportingYear
      }
    };

    const response = await createBenchmarkMutation(
      relay.environment,
      variables
    );
    console.log(response);
  };

  const updateCurrentBenchmark = async ({formData}: IChangeEvent) => {
    const variables = {
      input: {
        id: currentBenchmark.id,
        benchmarkPatch: {
          ...formData
        }
      }
    };
    const response = await editBenchmarkMutation(relay.environment, variables);
    console.log(response);
  };

  // This fuction does not 'DELETE' from the database, but sets the deleted at / deleted by values. This action is not recoverable through the UI
  const deleteBenchmark = async benchmark => {
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
    const response = await editBenchmarkMutation(relay.environment, variables);
    console.log(response);
  };

  const productFormData = {
    product: product.name,
    description: product.description
  };

  const handleDeleteBenchmark = async benchmark => {
    await deleteBenchmark(benchmark);
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
      onHide={() => setModalShow(false)}
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
            schema={productSchema}
            uiSchema={productUISchema}
            formData={productFormData}
            showErrorList={false}
            ArrayFieldTemplate={FormArrayFieldTemplate}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            onSubmit={saveProduct}
          >
            <Button type="submit" variant="primary">
              Save Product
            </Button>
            {product.state === 'active' ? (
              <Button variant="warning" onClick={toggleArchived}>
                Archive Product
              </Button>
            ) : (
              <Button variant="success" onClick={toggleArchived}>
                Restore Product
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
              currentBenchmark ? updateCurrentBenchmark : createBenchmark
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
                    {futureBenchmarks.map(benchmark => (
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
                        {pastBenchmarks.map(benchmark => {
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
        <td>{product.name}</td>
        <td>{product.units}</td>
        <td>{currentBenchmark?.benchmark ?? null}</td>
        <td>{currentBenchmark?.eligibilityThreshold ?? null}</td>
        <td>{currentBenchmark?.incentiveMultiplier ?? null}</td>
        <td>{product.state}</td>
        <td>
          <Button variant="info" onClick={() => setModalShow(true)}>
            Edit
          </Button>
        </td>
      </tr>
      {editModal}
    </>
  );
};

export default createFragmentContainer(ProductRowItemComponent, {
  product: graphql`
    fragment ProductRowItemContainer_product on Product {
      rowId
      name
      description
      state
      units
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
            deletedAt
          }
        }
      }
    }
  `,
  query: graphql`
    fragment ProductRowItemContainer_query on Query {
      getReportingYear {
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
