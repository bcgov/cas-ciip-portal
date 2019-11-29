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
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import moment from 'moment';
import FormArrayFieldTemplate from '../Forms/FormArrayFieldTemplate';
import FormFieldTemplate from '../Forms/FormFieldTemplate';
import FormObjectFieldTemplate from '../Forms/FormObjectFieldTemplate';
import saveProductMutation from '../../mutations/product/saveProductMutation';
import editBenchmarkMutation from '../../mutations/benchmark/editBenchmarkMutation';
import createBenchmarkMutation from '../../mutations/benchmark/createBenchmarkMutation';
import {
  productSchema,
  productUISchema,
  benchmarkSchema,
  benchmarkUISchema
} from './ProductBenchmarkJsonSchemas';
import FutureBenchmarks from './FutureBenchmarks';

interface Props {
  relay: RelayProp;
  product: any;
  userRowId: number;
}

/**  Note: There is some placeholder validation done on the front end here (dateRegexFormat, timeRangeOverlap, etc) that should be revisited
 *         when we have had a design / constraint brainstorming session for benchmarks.
 * */

export const ProductRowItemComponent: React.FunctionComponent<Props> = ({
  relay,
  product,
  userRowId
}) => {
  /**
   * Stand-in validation variables & functions
   */
  const dateRegexFormat = /\d{2}-\d{2}-\d{4}/;
  const timeRangeOverlap = (newStart, currentStart, newEnd, currentEnd) => {
    const e1 = newEnd
      ? moment(newEnd, 'DD-MM-YYYY')
      : moment('12-12-9999', 'DD-MM-YYYY');
    const e2 = currentEnd
      ? moment(currentEnd)
      : moment('12-12-9999', 'DD-MM-YYYY');
    const s1 = moment(newStart, 'DD-MM-YYYY');
    const s2 = moment(currentStart);
    if ((s1 >= s2 && s1 <= e2) || (s2 >= s1 && s2 <= e1)) return true;
    return false;
  };

  /**
   * Assistance functions
   */

  // Get the product's current benchmark
  const getCurrentBenchmark = () => {
    let currentBenchmark;
    if (product.benchmarksByProductId.edges[0]) {
      product.benchmarksByProductId.edges.forEach(({node: benchmark}) => {
        if (
          !benchmark.deletedAt &&
          moment(benchmark.startDate) < moment() &&
          (benchmark.endDate === null ||
            (!benchmark.deletedAt && moment(benchmark.endDate) > moment())) &&
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
        !edge.node.deletedAt &&
        edge.node.endDate !== null &&
        moment(edge.node.endDate) < moment()
      )
        pastBenchmarks.push(edge.node);
      else if (!edge.node.deletedAt && moment(edge.node.startDate) > moment())
        futureBenchmarks.push(edge.node);
    });
  }

  const displayPastBenchmark = benchmark => {
    return (
      <tr key={benchmark.id}>
        <td>{benchmark.benchmark}</td>
        <td>{benchmark.eligibilityThreshold}</td>
        <td>{moment(benchmark.startDate).format('DD-MM-YYYY')}</td>
        <td>{moment(benchmark.endDate).format('DD-MM-YYYY')}</td>
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

  const createBenchmark = async (e: IChangeEvent) => {
    if (
      !dateRegexFormat.test(e.formData.startDate) ||
      !dateRegexFormat.test(e.formData.endDate)
    ) {
      console.log('BAD BAD DATE');
      return;
    }

    if (
      currentBenchmark &&
      timeRangeOverlap(
        e.formData.startDate,
        currentBenchmark.startDate,
        e.formData.endDate,
        currentBenchmark.endDate
      )
    ) {
      console.log('error: OVERLAPS CURRENT BENCHMARK');
      return;
    }

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

    const response = await createBenchmarkMutation(
      relay.environment,
      variables
    );
    console.log(response);
  };

  const updateCurrentBenchmark = async (e: IChangeEvent) => {
    if (
      !dateRegexFormat.test(e.formData.startDate) ||
      !dateRegexFormat.test(e.formData.endDate)
    ) {
      console.log('BAD BAD DATE');
      return;
    }

    const variables = {
      input: {
        id: currentBenchmark.id,
        benchmarkPatch: {
          benchmark: e.formData.benchmark,
          eligibilityThreshold: e.formData.eligibilityThreshold,
          startDate: moment(
            e.formData.startDate.concat('T', '00:00:00'),
            'DD-MM-YYYYTHH:mm:ss'
          ).format('YYYY-MM-DDTHH:mm:ss'),
          endDate: e.formData.endDate
            ? moment(
                e.formData.endDate.concat('T', '23:59:59'),
                'DD-MM-YYYYTHH:mm:ss'
              ).format('YYYY-MM-DDTHH:mm:ss')
            : null
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
          deletedAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
          deletedBy: userRowId
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

  const currentBenchmarkFormData = {
    benchmark: currentBenchmark?.benchmark ?? null,
    eligibilityThreshold: currentBenchmark?.eligibilityThreshold ?? null,
    startDate: currentBenchmark?.startDate
      ? moment(currentBenchmark.startDate).format('DD-MM-YYYY')
      : null,
    endDate: currentBenchmark?.endDate
      ? moment(currentBenchmark.endDate).format('DD-MM-YYYY')
      : null
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
