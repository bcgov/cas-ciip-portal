import React from 'react';
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

import moment from 'moment';
import FormArrayFieldTemplate from '../Forms/FormArrayFieldTemplate';
import FormFieldTemplate from '../Forms/FormFieldTemplate';
import FormObjectFieldTemplate from '../Forms/FormObjectFieldTemplate';
import saveProductMutation from '../../mutations/product/saveProductMutation';
import editBenchmarkMutation from '../../mutations/benchmark/editBenchmarkMutation';
// Import createBenchmarkMutation from '../../mutations/benchmark/createBenchmarkMutation';

interface Props {
  relay: RelayProp;
  product: any;
}

export const ProductRowItemComponent: React.FunctionComponent<Props> = ({
  relay,
  product
}) => {
  // Get the product's current benchmark
  const getCurrentBenchmark = () => {
    let currentBenchmark;
    if (product.benchmarksByProductId.edges[0]) {
      product.benchmarksByProductId.edges.forEach(({node: benchmark}) => {
        if (
          moment(benchmark.startDate) < moment() &&
          (benchmark.endDate === null ||
            moment(benchmark.endDate) > moment()) &&
          !benchmark.deletedAt
        ) {
          currentBenchmark = benchmark;
        }
      });
    }

    return currentBenchmark;
  };

  const currentBenchmark = getCurrentBenchmark();
  const pastBenchmarks = [];
  const futureBenchmarks = [];
  if (product.benchmarksByProductId.edges[0]) {
    product.benchmarksByProductId.edges.forEach(edge => {
      if (
        edge.node.endDate !== null &&
        Date.parse(edge.node.endDate) < Date.now()
      )
        pastBenchmarks.push(edge.node);
      else if (Date.parse(edge.node.startDate) > Date.now())
        futureBenchmarks.push(edge.node);
    });
  }

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

  const createBenchmark = async (e: IChangeEvent) => {
    const variables = {
      input: {
        benchmarkInput: e.formData.benchmark,
        eligibilityThresholdInput: e.formData.eligibilityThreshold,
        productIdInput: product.rowId,
        startDateInput: moment(
          e.formData.startDate.concat('T', '00:00:00'),
          'DD-MM-YYYYTHH:mm:ss'
        ).format('YYYY-MM-DDTHH:mm:ss'),
        endDateInput: e.formData.endDate
          ? moment(
              e.formData.endDate.concat('T', '23:59:59'),
              'DD-MM-YYYYTHH:mm:ss'
            ).format('YYYY-MM-DDTHH:mm:ss')
          : null,
        prevBenchmarkIdInput: null
      }
    };
    console.log(variables);

    const response = await createBenchmarkMutation(
      relay.environment,
      variables
    );
    console.log(response);
  };

  const updateCurrentBenchmark = async (e: IChangeEvent) => {
    const variables = {
      input: {
        id: currentBenchmark.id,
        benchmarkPatch: {
          benchmark: e.formData.benchmark,
          eligibilityThreshold: e.formData.eligibilityThreshold,
          startDate: e.formData.startDate,
          endDate: e.formData.endDate
        }
      }
    };
    const response = await editBenchmarkMutation(relay.environment, variables);
    console.log(response);
  };

  const displayFutureBenchmark = benchmark => {
    const formData = {
      benchmark: benchmark.benchmark,
      eligibilityThreshold: benchmark.eligibilityThreshold,
      startDate: benchmark.startDate,
      endDate: benchmark.endDate
    };
    return (
      <>
        <JsonSchemaForm
          omitExtraData
          liveOmit
          schema={benchmarkSchema}
          uiSchema={benchmarkUISchema}
          formData={formData}
          showErrorList={false}
          ArrayFieldTemplate={FormArrayFieldTemplate}
          FieldTemplate={FormFieldTemplate}
          ObjectFieldTemplate={FormObjectFieldTemplate}
          // OnSubmit={updateCurrentBenchmark}
        >
          <Button type="submit">Save</Button>
        </JsonSchemaForm>
        <hr />
      </>
    );
  };

  const displayPastBenchmark = benchmark => {
    return (
      <tr>
        <td>{benchmark.benchmark}</td>
        <td>{benchmark.eligibilityThreshold}</td>
        <td>{moment(benchmark.startDate).format('DD-MM-YYYY')}</td>
        <td>{moment(benchmark.endDate).format('DD-MM-YYYY')}</td>
      </tr>
    );
  };

  // // Get the current benchmark for the product
  // let benchmarks;
  // if (props.product.benchmarksByProductId.edges[0]) {
  //   props.product.benchmarksByProductId.edges.forEach(({node: benchmark}) => {
  //     if (
  //       Date.parse(benchmark.startDate) < Date.now() &&
  //       (benchmark.endDate === null ||
  //         Date.parse(benchmark.endDate) > Date.now()) &&
  //       !benchmark.deletedAt
  //     ) {
  //       benchmarks = benchmark;
  //     }
  //   });
  //   if (!benchmarks) {
  //     benchmarks = {benchmark: '', eligibilityThreshold: ''};
  //   }
  // } else {
  //   benchmarks = {benchmark: '', eligibilityThreshold: ''};
  // }

  // // Archived logic to determine display values
  // const background = props.product.state === 'archived' ? 'lightGrey' : '';
  // const buttonVariant =
  //   props.product.state === 'archived' ? 'success' : 'warning';
  // const archiveRestore =
  //   props.product.state === 'archived' ? 'Restore' : 'Archive';

  const ProductSchema: JSONSchema6 = {
    type: 'object',
    properties: {
      product: {
        type: 'string',
        title: 'Product'
      },
      description: {
        type: 'string',
        title: 'Description'
      }
    },
    required: ['product']
  };

  const productUISchema = {
    product: {
      'ui:col-md': 6
    },
    description: {
      'ui:col-md': 6
    }
  };

  const productFormData = {
    product: product.name,
    description: product.description
  };

  const benchmarkSchema: JSONSchema6 = {
    type: 'object',
    properties: {
      benchmark: {
        type: 'number',
        title: 'Benchmark'
      },
      eligibilityThreshold: {
        type: 'number',
        title: 'ET'
      },
      startDate: {
        type: 'string',
        title: 'Start Date'
      },
      endDate: {
        type: 'string',
        title: 'End Date'
      }
    }
  };

  const benchmarkUISchema = {
    benchmark: {
      'ui:col-md': 6
    },
    description: {
      'ui:col-md': 6
    },
    startDate: {
      'ui:col-md': 6
    },
    endDate: {
      'ui:col-md': 6
    }
  };

  const currentBenchmarkFormData = {
    benchmark:
      currentBenchmark && currentBenchmark.benchmark
        ? currentBenchmark.benchmark
        : null,
    eligibilityThreshold:
      currentBenchmark && currentBenchmark.eligibilityThreshold
        ? currentBenchmark.eligibilityThreshold
        : null,
    startDate:
      currentBenchmark && currentBenchmark.startDate
        ? moment(currentBenchmark.startDate).format('DD-MM-YYYY')
        : null,
    endDate:
      currentBenchmark && currentBenchmark.endDate
        ? moment(currentBenchmark.endDate).format('DD-MM-YYYY')
        : null
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [futureBenchmarksOpen, setFutureBenchmarksOpen] = React.useState(false);
  const [pastBenchmarksOpen, setPastBenchmarksOpen] = React.useState(false);
  const [addBenchmarkOpen, setAddBenchmarkOpen] = React.useState(false);

  const currentBenchmark = getCurrentBenchmark();

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
            schema={ProductSchema}
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
            <Col md={4}>
              Benchmark:{' '}
              {currentBenchmark && currentBenchmark.benchmark
                ? currentBenchmark.benchmark
                : null}
            </Col>
            <Col md={4}>
              ET:{' '}
              {currentBenchmark && currentBenchmark.eligibilityThreshold
                ? currentBenchmark.eligibilityThreshold
                : null}
            </Col>
            <Col md={4}>
              End Date:{' '}
              {currentBenchmark && currentBenchmark.endDate
                ? currentBenchmark.endDate
                : null}
            </Col>
          </Row>
=======
          <JsonSchemaForm
            omitExtraData
            liveOmit
            schema={benchmarkSchema}
            uiSchema={benchmarkUISchema}
            formData={currentBenchmarkFormData}
            showErrorList={false}
            ArrayFieldTemplate={FormArrayFieldTemplate}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            onSubmit={
              currentBenchmark ? updateCurrentBenchmark : createBenchmark
            }
          >
            <Button type="submit">Save</Button>
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
                    <Container>
                      {futureBenchmarks.map(benchmark => {
                        return displayFutureBenchmark(benchmark);
                      })}
                    </Container>
                    {futureBenchmarks.map(benchmark => (
                      <FutureBenchmarks
                        key={benchmark.id}
                        benchmark={benchmark}
                        environment={relay.environment}
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
                        <th>Benchmark</th>
                        <th>Eligibility Threshold</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <tr>
                          <th>Benchmark</th>
                          <th>Eligibility Threshold</th>
                          <th>Start Date (DD-MM-YYYY)</th>
                          <th>End Date (DD_MM-YYYY)</th>
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
                  // OnSubmit={updateCurrentBenchmark}
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
        <td>{currentBenchmark ? currentBenchmark.benchmark : null}</td>
        <td>
          {currentBenchmark ? currentBenchmark.eligibilityThreshold : null}
        </td>
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
      parent
      units
      benchmarksByProductId {
        edges {
          node {
            id
            rowId
            benchmark
            eligibilityThreshold
            startDate
            endDate
            deletedAt
          }
        }
      }
    }
  `
});
