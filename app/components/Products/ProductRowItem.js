import React from 'react';
import {graphql, createFragmentContainer, commitMutation} from 'react-relay';
import {Form, Button, ButtonGroup, Col, Row, Modal} from 'react-bootstrap';

// TODO: create conflict logic & alerts:
// Example Scenario: If a product has a current benchmark attached to it (not archived and current date falls within start and end dates),
//                   and an admin attempts to add another benchmark that will be considered current, do not create the benchmark and alert the user.
//                   This should probably include checks on all benchmarks (including future benchmarks that have been defined)

// TODO: Make the benchmark management system better. Currently the UI only shows the current benchmark, there is no way to view benchmarks
//       that have been created for the future (to supplant the current one), or to see past benchmarks. This can currently only be done in the database
const ProductRowItem = props => {
  const createBenchmark = graphql`
    mutation ProductRowItemBenchmarkMutation($input: CreateBenchmarkInput!) {
      createBenchmark(input: $input) {
        benchmark {
          rowId
        }
      }
    }
  `;
  const createProduct = graphql`
    mutation ProductRowItemProductMutation($input: CreateProductInput!) {
      createProduct(input: $input) {
        product {
          rowId
        }
      }
    }
  `;
  const updateBenchmark = graphql`
    mutation ProductRowItemUpdateBenchmarkMutation(
      $input: UpdateBenchmarkByRowIdInput!
    ) {
      updateBenchmarkByRowId(input: $input) {
        benchmark {
          rowId
        }
      }
    }
  `;
  const updateProduct = graphql`
    mutation ProductRowItemUpdateProductMutation(
      $input: UpdateProductByRowIdInput!
    ) {
      updateProductByRowId(input: $input) {
        product {
          rowId
        }
      }
    }
  `;

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
  const toggleArchived = event => {
    event.preventDefault();
    event.stopPropagation();
    const toggleArchived = props.product.state !== 'archived';
    const saveVariables = {
      input: {
        product: {
          name: props.product.name,
          description: props.product.description,
          state: toggleArchived ? 'archived' : 'active',
          parent: [props.product.rowId]
        }
      }
    };
    const {environment} = props.relay;
    const saveMutation = createProduct;
    commitMutation(environment, {
      mutation: saveMutation,
      variables: saveVariables,
      onCompleted: async response => {
        console.log(response);
        const currentBenchmark = getCurrentBenchmark();
        const benchmarkPatch = {
          productId: response.createProduct.product.rowId
        };
        await editProduct();
        if (currentBenchmark) {
          await editBenchmark(currentBenchmark.rowId, benchmarkPatch);
        }

        window.location.reload();
      },
      onError: err => console.error(err)
    });
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

    await editBenchmark(currentBenchmark.rowId, benchmarkPatch);
    window.location.reload();
  };

  // Edit a benchmark
  const editBenchmark = (benchmarkRowId, benchmarkPatch) => {
    const saveMutation = updateBenchmark;
    const updateBenchmarkVariables = {
      input: {
        rowId: benchmarkRowId,
        benchmarkPatch
      }
    };
    commitMutation(environment, {
      mutation: saveMutation,
      variables: updateBenchmarkVariables,
      onCompleted: (response, errors) => {
        console.log(response);
      },
      onError: err => console.error(err)
    });
  };

  // Edit a product
  const editProduct = () => {
    const saveMutation = updateProduct;
    const updateProductVariables = {
      input: {
        rowId: props.product.rowId,
        productPatch: {
          state: 'deprecated',
          deletedAt: new Date().toUTCString(),
          deletedBy: 'Admin'
        }
      }
    };
    const {environment} = props.relay;
    commitMutation(environment, {
      mutation: saveMutation,
      variables: updateProductVariables,
      onCompleted: response => {
        console.log(response);
      },
      onError: err => console.error(err)
    });
  };

  // Save a product
  const saveProduct = async event => {
    event.preventDefault();
    event.stopPropagation();
    const saveVariables = {
      input: {
        product: {
          name: 'a', // ReactDOM.findDOMNode(refs.product_name).value,
          description: 'b', // ReactDOM.findDOMNode(refs.product_description).value,
          state: 'active',
          parent: [props.product.rowId]
        }
      }
    };

    const saveMutation = createProduct;
    // Get the current Benchmark -- calculated by which benchmark is not archived and current date within the start & end dates
    const currentBenchmark = getCurrentBenchmark();
    const {environment} = props.relay;
    commitMutation(environment, {
      mutation: saveMutation,
      variables: saveVariables,
      onCompleted: async response => {
        console.log(response);
        const benchmarkPatch = {
          productId: response.createProduct.product.rowId
        };
        // Update state && updatedAt fields of previous product
        await editProduct();
        // Attach the previous Product's current benchmark to the new product
        if (currentBenchmark) {
          await editBenchmark(currentBenchmark.rowId, benchmarkPatch);
        }

        window.location.reload();
      },
      onError: err => console.error(err)
    });
  };

  // Save a new benchmark
  const saveBenchmark = async event => {
    event.preventDefault();
    event.stopPropagation();
    // Current-_date for updatedAt field
    const currentDate = new Date().toUTCString();
    // StartDate received from user, defined in UI
    const startDate = new Date('01-01-1999');
    // ReactDOM.findDOMNode(this.refs.startDate).value
    // ).toUTCString();
    const benchmarkPatch = {
      endDate: startDate,
      updatedAt: currentDate
    };
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
    console.log(validBenchmarks);
    if (validBenchmarks.length > 1) {
      console.error(
        'Too many benchmarks already created, only one active benchmark and one upcoming benchmark can be defined at one time'
      );
      return;
    }

    const saveVariables = {
      input: {
        benchmark: {
          productId: props.product.rowId,
          benchmark: 5, // ParseFloat(
          // ReactDOM.findDOMNode(this.refs.benchmark).value
          // )
          eligibilityThreshold: 10, // ParseFloat(
          //  ReactDOM.findDOMNode(this.refs.eligibility_threshold).value
          // ),
          startDate,
          updatedAt: currentDate,
          updatedBy: 'Admin'
        }
      }
    };
    const {environment} = props.relay;
    const saveMutation = createBenchmark;
    commitMutation(environment, {
      mutation: saveMutation,
      variables: saveVariables,
      onCompleted: async response => {
        console.log(response);
        // If there was a previously set benchmark, update its end_date
        if (currentBenchmark) {
          await editBenchmark(currentBenchmark.rowId, benchmarkPatch);
        }

        window.location.reload();
      },
      onError: err => console.error(err)
    });
  };

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
                data-testid="edit-product"
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
                data-testid="edit-benchmark"
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
                  data-testid="save-product"
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
                  data-testid="archive-product"
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
                // Ref="product_name"
                required="required"
                type="string"
                step="0.01"
                placeholder={product.name}
                defaultValue={product.name}
              />
              <Form.Label>Description</Form.Label>
              <Form.Control
                // Ref="product_description"
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
              <Button onClick={props.productRowActions.closeConfirmationWindow}>
                No
              </Button>
              <Button onClick={toggleBenchmarkDeleted}>Yes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        )}
        {!props.confirmationModalOpen && (
          <Form key={props.product.rowId} onSubmit={saveBenchmark}>
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
                    data-testid="save-benchmark"
                    style={{marginTop: '8px', marginRight: '10px'}}
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    style={{marginTop: '8px'}}
                    onClick={props.productRowActions.toggleBenchmarkMode}
                  >
                    Cancel
                  </Button>
                  <Button
                    data-testid="archive-benchmark"
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
                  // Ref="benchmark"
                  required="required"
                  type="number"
                  step="0.01"
                  placeholder={benchmarks.benchmark}
                  defaultValue={benchmarks.benchmark}
                />
                <Form.Label>Eligibility Threshold</Form.Label>
                <Form.Control
                  // Ref="eligibility_threshold"
                  required="required"
                  type="number"
                  step="0.01"
                  placeholder={benchmarks.eligibilityThreshold}
                  defaultValue={benchmarks.eligibilityThreshold}
                />
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  // Ref="startDate"
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

export default createFragmentContainer(ProductRowItem, {
  product: graphql`
    fragment ProductRowItem_product on Product {
      id
      rowId
      name
      description
      state
      parent
      createdAt
      createdBy
      benchmarksByProductId {
        edges {
          node {
            rowId
            benchmark
            eligibilityThreshold
            startDate
            endDate
            deletedAt
            deletedBy
          }
        }
      }
    }
  `
});
