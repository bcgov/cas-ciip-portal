import React ,{ Component } from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import {graphql, commitMutation, fetchQuery} from "react-relay";
import {Form, Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import initEnvironment from '../../lib/createRelayEnvironment';
const environment = initEnvironment();

class ProductRowItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: 'view'
        };

        this.createBenchmark = graphql`
            mutation ProductRowItemBenchmarkMutation ($input: CreateBenchmarkInput!){
                createBenchmark(input:$input){
                    benchmark{
                        rowId
                    }
                }
            }
        `;
        this.createProduct = graphql`
            mutation ProductRowItemProductMutation ($input: CreateProductInput!){
                createProduct(input:$input){
                    product{
                        rowId
                    }
                }
            }
        `;
        this.updateBenchmark = graphql`
            mutation ProductRowItemUpdateBenchmarkMutation ($input: UpdateBenchmarkByRowIdInput!){
                updateBenchmarkByRowId(input:$input) {
                    benchmark{
                        rowId
                    }
                }
            }
        `;
        this.updateProduct = graphql`
            mutation ProductRowItemUpdateProductMutation ($input: UpdateProductByRowIdInput!){
                updateProductByRowId(input:$input) {
                    product{
                        rowId
                    }
                }
            }
        `;
        this.getBenchmarkByProductId = graphql`
            query ProductRowItemBenchmarkQuery($condition: BenchmarkCondition) {
                allBenchmarks(condition:$condition){
                    nodes{
                      id
                      rowId
                      productId
                      benchmark
                      eligibilityThreshold
                    }
                }
            }
        `;
    }

    // Toggle the 'archived' value of a Product
    toggleArchived = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const toggleArchived = this.props.product.state === 'archived' ? false : true;
        const saveVariables =
            {
                "input": {
                    "product": {
                      "name": this.props.product.name,
                      "description": this.props.product.description,
                      "state": toggleArchived ? 'archived' : 'active',
                      "parent": [this.props.product.rowId],
                      "updatedAt": new Date().toUTCString(),
                      "updatedBy": 'Admin'
                    }
                }
            };

      const saveMutation = this.createProduct;
      commitMutation(
          environment,
          {
              mutation: saveMutation,
              variables: saveVariables,
              onCompleted: async (response, errors) => {
                  console.log(response);
                  const benchmarkResult = await this.getBenchmark(this.props.product.rowId);
                  const benchmarkPatch = {
                      "productId": response.createProduct.product.rowId
                  }
                  await this.editProduct();
                  await this.editBenchmark(benchmarkResult.allBenchmarks.nodes[0].rowId, benchmarkPatch);
                  window.location.reload();
              },
              onError: err => console.error(err),
          },
      );
    }

    // Toggle the 'archived' value of a Benchmark (unlike Product, this is a one way operation...maybe should be named differently?)
    toggleBenchmarkArchived = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        let currentBenchmark;
        if (this.props.product.benchmarksByProductId.nodes[0]) {
            this.props.product.benchmarksByProductId.nodes.forEach(benchmark => {
                if (Date.parse(benchmark.startDate) < Date.now() && (benchmark.endDate === null || Date.parse(benchmark.endDate) > Date.now()))
                    currentBenchmark = benchmark.rowId
            });
        }
        const benchmarkPatch = {
          "archived": true
        }

        await this.editBenchmark(currentBenchmark, benchmarkPatch);
        window.location.reload();
    }

    // Get a benchmark by its productId
    getBenchmark = async (productId) => {
        console.log(productId)
        const getBenchmarkVariables = 
            {
                "condition": {
                    "productId": productId
                }
            }
        const data = await fetchQuery(environment, this.getBenchmarkByProductId, getBenchmarkVariables)
        return data
    }

    // Edit a benchmark
    editBenchmark = (benchmarkRowId, benchmarkPatch) => {
        const saveMutation = this.updateBenchmark;
        const updateBenchmarkVariables =
            {
                "input": {
                    "rowId": benchmarkRowId,
                    benchmarkPatch
                }
            };
        commitMutation(
            environment,
            {
                mutation: saveMutation,
                variables: updateBenchmarkVariables,
                onCompleted: (response, errors) => {
                    console.log(response);
                },
                onError: err => console.error(err),
            },
        );
    };

    // Edit a product
    editProduct = () => {
        const saveMutation = this.updateProduct;
        const updateProductVariables =
            {
                "input": {
                    "rowId": this.props.product.rowId,
                    "productPatch": {
                        "state": "deprecated",
                        "updatedAt": new Date().toUTCString()
                    }
                }
            };
        commitMutation(
            environment,
            {
                mutation: saveMutation,
                variables: updateProductVariables,
                onCompleted: (response, errors) => {
                    console.log(response);
                },
                onError: err => console.error(err),
            },
        );
    };

    // Save a product
    saveProduct = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const saveVariables =
          {
              "input": {
                  "product": {
                    "name": ReactDOM.findDOMNode(this.refs.product_name).value,
                    "description": ReactDOM.findDOMNode(this.refs.product_description).value,
                    "state": 'active',
                    "parent": [this.props.product.rowId],
                    "updatedAt": new Date().toUTCString(),
                    "updatedBy": 'Admin'
                  }
              }
          };

      const saveMutation = this.createProduct;
      // Get the current Benchmark -- calculated by which benchmark is not null and current date within the start & end dates
      let currentBenchmark;
        if (this.props.product.benchmarksByProductId.nodes[0]) {
            this.props.product.benchmarksByProductId.nodes.forEach(benchmark => {
                if (Date.parse(benchmark.startDate) < Date.now() && (benchmark.endDate === null || Date.parse(benchmark.endDate) > Date.now()) && !benchmark.archived)
                    currentBenchmark = benchmark.rowId
            });
        }
      commitMutation(
          environment,
          {
              mutation: saveMutation,
              variables: saveVariables,
              onCompleted: async (response, errors) => {
                  console.log(response);
                  const benchmarkPatch = {
                      "productId": response.createProduct.product.rowId
                  }
                  // update state && updatedAt fields of previous product
                  await this.editProduct();
                  // attach the previous Product's current benchmark to the new product
                  await this.editBenchmark(currentBenchmark, benchmarkPatch);
                  window.location.reload();
              },
              onError: err => console.error(err),
          },
      );
  }

    // Save a new benchmark
    saveBenchmark = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        // current-_date for updatedAt field
        const current_date = new Date().toUTCString();
        // start_date received from user, defined in UI
        const start_date = new Date(ReactDOM.findDOMNode(this.refs.start_date).value).toUTCString();
        const benchmarkPatch = { 
            "endDate": start_date,
            "updatedAt": current_date
        }
        // Set the id of the current benchmark (if one has been set)
        const currentBenchmarkId = this.props.product.benchmarksByProductId.nodes[0] ? this.props.product.benchmarksByProductId.nodes[this.props.product.benchmarksByProductId.nodes.length-1].rowId : null;
        let saveVariables =
            {
                "input": {
                    "benchmark": {
                        "productId": this.props.product.rowId,
                        "benchmark": parseFloat(ReactDOM.findDOMNode(this.refs.benchmark).value),
                        "eligibilityThreshold": parseFloat(ReactDOM.findDOMNode(this.refs.eligibility_threshold).value),
                        "startDate": start_date,
                        "updatedAt": current_date,
                        "updatedBy": 'Admin'
                    }
                }
            }

        let saveMutation = this.createBenchmark;
        commitMutation(
            environment,
            {
                mutation: saveMutation,
                variables: saveVariables,
                onCompleted: async (response, errors) => {
                    console.log(response);
                    // If there was a previously set benchmark, update its end_date
                    if (currentBenchmarkId)
                        await this.editBenchmark(currentBenchmarkId, benchmarkPatch)
                    window.location.reload();
                },
                onError: err => console.error(err),
            },
        );
    }
    // Toggle enabling of editing products
    toggleProductMode = () => {
        console.log('ProductRowItem > Edit clicked');
        this.state.mode === 'view' || this.state.mode === 'benchmark' ? this.setState({ mode : 'product' }) : this.setState( { mode: 'view' })
    };

    // Toggle enabling of editing benchmarks
    toggleBenchmarkMode = () => {
      console.log('ProductRowItem > Edit clicked');
      this.state.mode === 'view' || this.state.mode === 'product' ? this.setState({ mode : 'benchmark' }) : this.setState( { mode: 'view' })
    };

    render(){

        const product = this.props.product;
        // Get the current benchmark for the product
        let benchmarks
        if (this.props.product.benchmarksByProductId.nodes[0]) {
            this.props.product.benchmarksByProductId.nodes.forEach(benchmark => {
                if (Date.parse(benchmark.startDate) < Date.now() && (benchmark.endDate === null || Date.parse(benchmark.endDate) > Date.now()) && !benchmark.archived)
                    benchmarks = benchmark;
            });
            if (!benchmarks) benchmarks = {benchmark:'', eligibilityThreshold:''};
        }
        else
           benchmarks = {benchmark:'', eligibilityThreshold:''};

        // Archived logic to determine display values
        const background = this.props.product.state === 'archived' ? 'lightGrey' : '';
        const buttonVariant = this.props.product.state === 'archived' ? 'success' : 'warning';
        const archiveRestore = this.props.product.state === 'archived' ? 'Restore' : 'Archive';

        return(
            <React.Fragment>
            <div key={this.props.product.rowId} id="view-item" className={ this.state.mode } >
                <div style={{background}}>
                    <Row style={{padding: 5}}>
                        <Col md={1} style={{textAlign:'right'}}>
                          <Button style={{width:'100%'}} onClick={this.toggleProductMode}>Edit</Button>
                        </Col>
                        <Col md={4}>
                            <h5>{product.name}</h5>
                            <small>{product.description}</small>
                        </Col>
                        <Col md={1}>
                            <Form.Label><small>Archived:</small> {product.state === 'archived' ? 'true': 'false'}</Form.Label>
                        </Col>
                        <Col md={1} style={{textAlign:'right'}}>
                          <Button style={{width:'100%'}} onClick={this.toggleBenchmarkMode}>Edit</Button>
                        </Col>
                        <Col md={2}>
                            <Form.Label><small>Benchmark:</small> {benchmarks.benchmark}</Form.Label>
                            <br/>
                            <Form.Label><small>Start Date:</small> {benchmarks.startDate}</Form.Label>
                        </Col>
                        <Col md={3}>
                            <Form.Label><small>Eligibility Threshold:</small> {benchmarks.eligibilityThreshold}</Form.Label>
                            <br/>
                            <Form.Label><small>End Date:</small> {benchmarks.endDate}</Form.Label>
                        </Col>
                    </Row>
                </div>
                <hr/>
            </div>

            <div key={`edit-pr${this.props.product.rowId}`} id="edit-product"  className={ this.state.mode }>
                <Form onSubmit={this.saveProduct} key={this.props.product.rowId}>
                    <Form.Row>
                        <Form.Group as={Col} md="1" style={{textAlign:"right"}} controlId="button_group">
                            <ButtonGroup vertical style={{width:'100%', marginTop: 10, marginBotton: 5}}>
                              <Button style={{marginTop:"8px", marginRight:"10px"}} type="submit">Save</Button>
                              <Button variant="secondary" style={{marginTop:"8px"}} onClick={this.toggleProductMode}>Cancel</Button>
                              <Button style={{marginTop: '8px', marginRight:"10px"}} variant={buttonVariant} onClick={this.toggleArchived}>{archiveRestore}</Button>
                            </ButtonGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="product_name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required="required" type="string" step="0.01"
                                          placeholder={product.name} defaultValue={product.name} ref='product_name' />
                        <Form.Label>Description</Form.Label>
                        <Form.Control required="required" type="string" step="0.01"
                                      placeholder={product.description} defaultValue={product.description} ref='product_description' />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                        <Form.Label><small>Archived:</small> {product.state === 'archived' ? 'true': 'false'}</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label><small>Benchmark:</small> {benchmarks.benchmark}</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label><small>Eligibility Threshold:</small> {benchmarks.eligibilityThreshold}</Form.Label>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <hr/>
            </div>

            <div key={`edit-bm${this.props.product.rowId}`} id="edit-benchmark"  className={ this.state.mode }>
                <Form onSubmit={this.saveBenchmark} key={this.props.product.rowId}>
                    <Form.Row>
                        <Form.Group as={Col} md="1">
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <h5>{product.name}</h5>
                            <small>{product.description}</small>
                        </Form.Group>
                        <Form.Group as={Col} md="1">
                            <Form.Label><small>Archived:</small> {product.state === 'archived' ? 'true': 'false'}</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} md="1" style={{textAlign:"right"}}>
                            <ButtonGroup vertical style={{width:'100%', marginTop: 10, marginBotton: 5}}>
                              <Button style={{marginTop:"8px", marginRight:"10px"}} type="submit">Save</Button>
                              <Button variant="secondary" style={{marginTop:"8px"}} onClick={this.toggleBenchmarkMode}>Cancel</Button>
                              <Button style={{marginTop: '8px', marginRight:"10px"}} variant={buttonVariant} onClick={this.toggleBenchmarkArchived}>{archiveRestore}</Button>
                            </ButtonGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="benchmark">
                            <Form.Label>Benchmark</Form.Label>
                            <Form.Control required="required" type="number" step="0.01"
                                          placeholder={benchmarks.benchmark} defaultValue={benchmarks.benchmark} ref='benchmark'/>
                            <Form.Label>Eligibility Threshold</Form.Label>
                            <Form.Control required="required" type="number" step="0.01"
                                          placeholder={benchmarks.eligibilityThreshold} defaultValue={benchmarks.eligibilityThreshold} ref='eligibility_threshold'/>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control required="required" type="string" step="0.01"
                                          placeholder='dd/mm/yyyy' ref='start_date'/>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <hr/>
            </div>
                <style jsx>{`
                    #edit-benchmark.view, #edit-benchmark.product, #edit-product.view, #edit-product.benchmark, #view-item.benchmark, #view-item.product {
                        display:none;
                    }
                    #edit-benchmark.benchmark, #edit-product.product, #view-item.view{
                        display:initial;
                    }
                `}
                </style>
            </React.Fragment>
        )
    }
}

// Proptype Validations
ProductRowItem.propTypes = {
    product: propTypes.shape({
        id: propTypes.number,
        rowId: propTypes.number,
        name: propTypes.string,
        description: propTypes.string,
        archived: propTypes.boolean,
        benchmarksByProductId: propTypes.shape({
            nodes: propTypes.array
      })
    })
}

export default ProductRowItem;
