import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {
  Button,
  Modal,
  Container,
  Row,
  Col,
  Card,
  Collapse
} from 'react-bootstrap';
import {JSONSchema6} from 'json-schema';
import JsonSchemaForm from 'react-jsonschema-form';
import FormArrayFieldTemplate from '../Forms/FormArrayFieldTemplate';
import FormFieldTemplate from '../Forms/FormFieldTemplate';
import FormObjectFieldTemplate from '../Forms/FormObjectFieldTemplate';
// Import saveProductMutation from '../../mutations/product/saveProductMutation';
// import editBenchmarkMutation from '../../mutations/benchmark/editBenchmarkMutation';
// import createBenchmarkMutation from '../../mutations/benchmark/createBenchmarkMutation';

// TODO: create conflict logic & alerts:
// Example Scenario: If a product has a current benchmark attached to it (not archived and current date falls within start and end dates),
//                   and an admin attempts to add another benchmark that will be considered current, do not create the benchmark and alert the user.
//                   This should probably include checks on all benchmarks (including future benchmarks that have been defined)

// TODO: Make the benchmark management system better. Currently the UI only shows the current benchmark, there is no way to view benchmarks
//       that have been created for the future (to supplant the current one), or to see past benchmarks. This can currently only be done in the database

// TODO: The UI is a little borked, the edit buttons apply to all items on the page because of where state lives currently
//       I have purposely left this not fixed as I believe this should be fixed in a separate refactor of this page

export const ProductRowItemComponent = props => {
  // Get the product's current benchmark
  const getCurrentBenchmark = () => {
    let currentBenchmark;
    if (props.product.benchmarksByProductId.edges[0]) {
      props.product.benchmarksByProductId.edges.forEach(({node: benchmark}) => {
        if (
          Date.parse(benchmark.startDate) < Date.now() &&
          (benchmark.endDate === null ||
            Date.parse(benchmark.endDate) > Date.now()) &&
          !benchmark.deletedAt
        ) {
          currentBenchmark = benchmark;
        }
      });
    }

    return currentBenchmark;
  };

  // // Toggle the 'archived' value of a Product
  // const toggleArchived = async event => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   const newState = props.product.state === 'archived' ? 'active' : 'archived';
  //   const currentBenchmark = getCurrentBenchmark();
  //   const variables = {
  //     input: {
  //       newName: props.product.name,
  //       newDescription: props.product.description || '',
  //       newState,
  //       prevId: props.product.rowId,
  //       newParent: [props.product.rowId],
  //       benchmarkId: currentBenchmark ? currentBenchmark.rowId : null
  //     }
  //   };
  //   const response = await saveProductMutation(
  //     props.relay.environment,
  //     variables
  //   );
  //   console.log(response);
  // };

  // // Toggle the 'archived' value of a Benchmark (unlike Product, this is a one way operation.)
  // // The button is red && says 'Delete'. The value is not deleted, it is archived in the database, but is not recoverable through the UI
  // const toggleBenchmarkDeleted = async event => {
  //   // This.setState({confirmationModalOpen: false});
  //   event.preventDefault();
  //   event.stopPropagation();
  //   const currentBenchmark = getCurrentBenchmark();
  //   const benchmarkPatch = {
  //     deletedAt: new Date().toUTCString(),
  //     deletedBy: 'Admin'
  //   };
  //   const variables = {
  //     input: {
  //       id: currentBenchmark.id,
  //       benchmarkPatch
  //     }
  //   };

  //   const response = await editBenchmarkMutation(
  //     props.relay.environment,
  //     variables
  //   );
  //   console.log(response);
  // };

  // // Save a product
  // const saveProduct = async event => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   event.persist();

  //   const productNameTargetIndex = 3;
  //   const descriptionTargetIndex = 4;

  //   const currentBenchmark = getCurrentBenchmark();
  //   const variables = {
  //     input: {
  //       newName: event.nativeEvent.target[productNameTargetIndex].value,
  //       newDescription: event.nativeEvent.target[descriptionTargetIndex].value,
  //       newState: 'active',
  //       prevId: props.product.rowId,
  //       newParent: [props.product.rowId],
  //       benchmarkId: currentBenchmark ? currentBenchmark.rowId : null
  //     }
  //   };
  //   const response = await saveProductMutation(
  //     props.relay.environment,
  //     variables
  //   );
  //   console.log(response);
  // };

  // // Save a new benchmark
  // const saveBenchmark = async event => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   event.persist();
  //   // Current-_date for updatedAt field
  //   const currentDate = new Date().toUTCString();
  //   // StartDate received from user, defined in UI
  //   const startDate = new Date(event.nativeEvent.target[5].value).toUTCString();
  //   // Set the current benchmark (if one has been set)
  //   const currentBenchmark = getCurrentBenchmark();

  //   // Conflict handling
  //   if (
  //     currentBenchmark &&
  //     Date.parse(startDate) < Date.parse(currentBenchmark.startDate)
  //   ) {
  //     console.error(
  //       'Start date of new benchmark is less than the start date of the current benchmark'
  //     );
  //     return;
  //   }

  //   const validBenchmarks = [];
  //   props.product.benchmarksByProductId.edges.forEach(({node: benchmark}) => {
  //     if (
  //       benchmark.endDate === null ||
  //       Date.parse(benchmark.endDate) > Date.parse(currentDate)
  //     ) {
  //       validBenchmarks.push(benchmark);
  //     }
  //   });

  //   if (validBenchmarks.length > 1) {
  //     console.error(
  //       'Too many benchmarks already created, only one active benchmark and one upcoming benchmark can be defined at one time'
  //     );
  //     return;
  //   }

  //   const benchmarkTargetIndex = 3;
  //   const eligibilityThresholdTargetIndex = 4;
  //   const newVariables = {
  //     input: {
  //       productIdInput: props.product.rowId,
  //       benchmarkInput: parseFloat(
  //         event.nativeEvent.target[benchmarkTargetIndex].value
  //       ),
  //       eligibilityThresholdInput: parseFloat(
  //         event.nativeEvent.target[eligibilityThresholdTargetIndex].value
  //       ),
  //       startDateInput: startDate,
  //       prevBenchmarkIdInput: currentBenchmark ? currentBenchmark.rowId : null
  //     }
  //   };
  //   const response = await createBenchmarkMutation(
  //     props.relay.environment,
  //     newVariables
  //   );
  //   console.log(response);
  // };

  // /** Mutations & functions above */
  // /** Code for Rendering Below */

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
  const {product} = props;

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
  const [modalShow, setModalShow] = React.useState(false);
  const [futureBenchmarksOpen, setFutureBenchmarksOpen] = React.useState(false);
  const [pastBenchmarksOpen, setPastBenchmarksOpen] = React.useState(false);

  const currentBenchmark = getCurrentBenchmark();
  console.log(currentBenchmark);

  const editModal = (
    <Modal
      centered
      size="lg"
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
            // Key={createProductFormKey}
            omitExtraData
            liveOmit
            schema={ProductSchema}
            uiSchema={productUISchema}
            showErrorList={false}
            ArrayFieldTemplate={FormArrayFieldTemplate}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            // OnSubmit={saveProduct}
          >
            <Button type="submit" variant="primary">
              Save Product
            </Button>
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
                      <Row>
                        <Col md={4}>Benchmark: 100</Col>
                        <Col md={4}>ET: 1000</Col>
                        <Col md={4}>End Date: Monday</Col>
                      </Row>
                    </Container>
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
                    <Container>
                      <Row>
                        <Col md={4}>Benchmark: 100</Col>
                        <Col md={4}>ET: 1000</Col>
                        <Col md={4}>End Date: Monday</Col>
                      </Row>
                    </Container>
                  </Card.Body>
                </Collapse>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={() => console.log('hi')}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );

  return (
    <>
      <tr>
        <td>{product.name}</td>
        <td>{product.units}</td>
        <td>
          {product.benchmarksByProductId.edges[0]
            ? product.benchmarksByProductId.edges[0].node.benchmark
            : null}
        </td>
        <td>
          {product.benchmarksByProductId.edges[0]
            ? product.benchmarksByProductId.edges[0].node.eligibilityThreshold
            : null}
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
