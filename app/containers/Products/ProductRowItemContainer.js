import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Form, Button, ButtonGroup, Col, Row, Modal} from 'react-bootstrap';
import {saveProductMutation} from '../../mutations/product/saveProductMutation';
import {editBenchmarkMutation} from '../../mutations/benchmark/editBenchmarkMutation';
import {createBenchmarkMutation} from '../../mutations/benchmark/createBenchmarkMutation';

// TODO: create conflict logic & alerts:
// Example Scenario: If a product has a current benchmark attached to it (not archived and current date falls within start and end dates),
//                   and an admin attempts to add another benchmark that will be considered current, do not create the benchmark and alert the user.
//                   This should probably include checks on all benchmarks (including future benchmarks that have been defined)

// TODO: Make the benchmark management system better. Currently the UI only shows the current benchmark, there is no way to view benchmarks
//       that have been created for the future (to supplant the current one), or to see past benchmarks. This can currently only be done in the database

// TODO: The UI is a little borked, the edit buttons apply to all items on the page because of where state lives currently
//       I have purposely left this not fixed as I believe this should be fixed in a separate refactor of this page

export const ProductRowItemContainer = props => {
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

  // Toggle the 'archived' value of a Product
  const toggleArchived = async event => {
    event.preventDefault();
    event.stopPropagation();
    const newState = props.product.state === 'archived' ? 'active' : 'archived';
    const currentBenchmark = getCurrentBenchmark();
    const variables = {
      input: {
        newName: props.product.name,
        newDescription: props.product.description || '',
        newState,
        prevId: props.product.rowId,
        newParent: [props.product.rowId],
        benchmarkId: currentBenchmark ? currentBenchmark.rowId : null
      }
    };
    await saveProductMutation(props.relay.environment, variables);
  };

  // Toggle the 'archived' value of a Benchmark (unlike Product, this is a one way operation.)
  // The button is red && says 'Delete'. The value is not deleted, it is archived in the database, but is not recoverable through the UI
  const toggleBenchmarkDeleted = async event => {
    // This.setState({confirmationModalOpen: false});
    event.preventDefault();
    event.stopPropagation();
    const currentBenchmark = getCurrentBenchmark();
    const benchmarkPatch = {
      deletedAt: new Date().toUTCString(),
      deletedBy: 'Admin'
    };

    await editBenchmarkMutation(
      props.relay.environment,
      currentBenchmark.rowId,
      benchmarkPatch
    );
  };

  // Save a product
  const saveProduct = async event => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();
    const currentBenchmark = getCurrentBenchmark();
    const variables = {
      input: {
        newName: event.nativeEvent.target[3].value,
        newDescription: event.nativeEvent.target[4].value,
        newState: 'active',
        prevId: props.product.rowId,
        newParent: [props.product.rowId],
        benchmarkId: currentBenchmark ? currentBenchmark.rowId : null
      }
    };
    await saveProductMutation(props.relay.environment, variables);
  };

  // Save a new benchmark
  const saveBenchmark = async event => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();
    // Current-_date for updatedAt field
    const currentDate = new Date().toUTCString();
    // StartDate received from user, defined in UI
    const startDate = new Date(event.nativeEvent.target[5].value).toUTCString();
    // Set the current benchmark (if one has been set)
    const currentBenchmark = getCurrentBenchmark();

    // Conflict handling
    if (
      currentBenchmark &&
      Date.parse(startDate) < Date.parse(currentBenchmark.startDate)
    ) {
      console.error(
        'Start date of new benchmark is less than the start date of the current benchmark'
      );
      return;
    }

    const validBenchmarks = [];
    props.product.benchmarksByProductId.edges.forEach(({node: benchmark}) => {
      if (
        benchmark.endDate === null ||
        Date.parse(benchmark.endDate) > Date.parse(currentDate)
      ) {
        validBenchmarks.push(benchmark);
      }
    });

    if (validBenchmarks.length > 1) {
      console.error(
        'Too many benchmarks already created, only one active benchmark and one upcoming benchmark can be defined at one time'
      );
      return;
    }

    const newVariables = {
      input: {
        productIdInput: props.product.rowId,
        benchmarkInput: parseFloat(event.nativeEvent.target[3].value),
        eligibilityThresholdInput: parseFloat(
          event.nativeEvent.target[4].value
        ),
        startDateInput: startDate,
        prevBenchmarkIdInput: currentBenchmark ? currentBenchmark.rowId : null
      }
    };
    await createBenchmarkMutation(props.relay.environment, newVariables);
  };

  /** Mutations & functions above */
  /** Code for Rendering Below */
  const {product} = props;
  // Get the current benchmark for the product
  let benchmarks;
  if (props.product.benchmarksByProductId.edges[0]) {
    props.product.benchmarksByProductId.edges.forEach(({node: benchmark}) => {
      if (
        Date.parse(benchmark.startDate) < Date.now() &&
        (benchmark.endDate === null ||
          Date.parse(benchmark.endDate) > Date.now()) &&
        !benchmark.deletedAt
      ) {
        benchmarks = benchmark;
      }
    });
    if (!benchmarks) {
      benchmarks = {benchmark: '', eligibilityThreshold: ''};
    }
  } else {
    benchmarks = {benchmark: '', eligibilityThreshold: ''};
  }

  // Archived logic to determine display values
  const background = props.product.state === 'archived' ? 'lightGrey' : '';
  const buttonVariant =
    props.product.state === 'archived' ? 'success' : 'warning';
  const archiveRestore =
    props.product.state === 'archived' ? 'Restore' : 'Archive';

  return (
    <>
      <div id="view-item" className={props.mode}>
        <div style={{background}}>
          <Row style={{padding: 5}}>
            <Col md={1} style={{textAlign: 'right'}}>
              <Button
                className="edit-product"
                style={{width: '100%'}}
                onClick={props.productRowActions.toggleProductMode}
              >
                Edit
              </Button>
            </Col>
            <Col md={4}>
              <h5>{product.name}</h5>
              <small>{product.description}</small>
            </Col>
            <Col md={1}>
              <Form.Label>
                <small>Archived:</small>{' '}
                {product.state === 'archived' ? 'true' : 'false'}
              </Form.Label>
            </Col>
            <Col md={1} style={{textAlign: 'right'}}>
              <Button
                className="edit-benchmark"
                style={{width: '100%'}}
                onClick={props.productRowActions.toggleBenchmarkMode}
              >
                Edit
              </Button>
            </Col>
            <Col md={2}>
              <Form.Label>
                <small>Benchmark:</small> {benchmarks.benchmark}
              </Form.Label>
              <br />
              <Form.Label>
                <small>Start Date:</small> {benchmarks.startDate}
              </Form.Label>
            </Col>
            <Col md={3}>
              <Form.Label>
                <small>Eligibility Threshold:</small>{' '}
                {benchmarks.eligibilityThreshold}
              </Form.Label>
              <br />
              <Form.Label>
                <small>End Date:</small> {benchmarks.endDate}
              </Form.Label>
            </Col>
          </Row>
        </div>
        <hr />
      </div>

      <div
        key={`edit-pr${props.product.rowId}`}
        id="edit-product"
        className={props.mode}
      >
        <Form key={props.product.rowId} onSubmit={saveProduct}>
          <Form.Row>
            <Form.Group
              as={Col}
              md="1"
              style={{textAlign: 'right'}}
              controlId="button_group"
            >
              <ButtonGroup
                vertical
                style={{width: '100%', marginTop: 10, marginBotton: 5}}
              >
                <Button
                  className="save-product"
                  style={{marginTop: '8px', marginRight: '10px'}}
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  variant="secondary"
                  style={{marginTop: '8px'}}
                  onClick={props.productRowActions.toggleProductMode}
                >
                  Cancel
                </Button>
                <Button
                  className="archive-product"
                  style={{marginTop: '8px', marginRight: '10px'}}
                  variant={buttonVariant}
                  onClick={toggleArchived}
                >
                  {archiveRestore}
                </Button>
              </ButtonGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="product_name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required="required"
                type="string"
                step="0.01"
                placeholder={product.name}
                defaultValue={product.name}
              />
              <Form.Label>Description</Form.Label>
              <Form.Control
                required="required"
                type="string"
                step="0.01"
                placeholder={product.description}
                defaultValue={product.description}
              />
            </Form.Group>
            <Form.Group as={Col} md="2">
              <Form.Label>
                <small>Archived:</small>{' '}
                {product.state === 'archived' ? 'true' : 'false'}
              </Form.Label>
            </Form.Group>
            <Form.Group as={Col} md="2">
              <Form.Label>
                <small>Benchmark:</small> {benchmarks.benchmark}
              </Form.Label>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>
                <small>Eligibility Threshold:</small>{' '}
                {benchmarks.eligibilityThreshold}
              </Form.Label>
            </Form.Group>
          </Form.Row>
        </Form>
        <hr />
      </div>

      <div
        key={`edit-bm${props.product.rowId}`}
        id="edit-benchmark"
        className={props.mode}
      >
        {props.confirmationModalOpen && (
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Are You Sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{color: 'red'}}>
              This is a destructive action (benchmark will be destroyed)
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="close-confirmation-window"
                onClick={props.productRowActions.closeConfirmationWindow}
              >
                No
              </Button>
              <Button
                className="toggle-benchmark-deleted"
                onClick={toggleBenchmarkDeleted}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        )}
        {!props.confirmationModalOpen && (
          <Form
            key={props.product.rowId}
            className="save-benchmark"
            onSubmit={saveBenchmark}
          >
            <Form.Row>
              <Form.Group as={Col} md="1"></Form.Group>
              <Form.Group as={Col} md="4">
                <h5>{product.name}</h5>
                <small>{product.description}</small>
              </Form.Group>
              <Form.Group as={Col} md="1">
                <Form.Label>
                  <small>Archived:</small>{' '}
                  {product.state === 'archived' ? 'true' : 'false'}
                </Form.Label>
              </Form.Group>
              <Form.Group as={Col} md="1" style={{textAlign: 'right'}}>
                <ButtonGroup
                  vertical
                  style={{width: '100%', marginTop: 10, marginBotton: 5}}
                >
                  <Button
                    className="save-benchmark"
                    style={{marginTop: '8px', marginRight: '10px'}}
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    style={{marginTop: '8px'}}
                    className="secondary-toggle-benchmark-mode"
                    onClick={props.productRowActions.toggleBenchmarkMode}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="archive-benchmark"
                    style={{marginTop: '8px', marginRight: '10px'}}
                    variant="danger"
                    onClick={props.productRowActions.openConfirmationWindow}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="benchmark">
                <Form.Label>Benchmark</Form.Label>
                <Form.Control
                  required="required"
                  type="number"
                  step="0.01"
                  placeholder={benchmarks.benchmark}
                  defaultValue={benchmarks.benchmark}
                />
                <Form.Label>Eligibility Threshold</Form.Label>
                <Form.Control
                  required="required"
                  type="number"
                  step="0.01"
                  placeholder={benchmarks.eligibilityThreshold}
                  defaultValue={benchmarks.eligibilityThreshold}
                />
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  required="required"
                  step="0.01"
                  placeholder="dd/mm/yyyy"
                />
              </Form.Group>
            </Form.Row>
          </Form>
        )}
        <hr />
      </div>
      <style jsx>
        {`
          #edit-benchmark.view,
          #edit-benchmark.product,
          #edit-product.view,
          #edit-product.benchmark,
          #view-item.benchmark,
          #view-item.product {
            display: none;
          }
          #edit-benchmark.benchmark,
          #edit-product.product,
          #view-item.view {
            display: initial;
          }
        `}
      </style>
    </>
  );
};

export default createFragmentContainer(ProductRowItemContainer, {
  product: graphql`
    fragment ProductRowItemContainer_product on Product {
      rowId
      name
      description
      state
      parent
      benchmarksByProductId {
        edges {
          node {
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
