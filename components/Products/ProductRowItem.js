import React ,{ Component } from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import {graphql, commitMutation} from "react-relay";
import {Form, Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import initEnvironment from '../../lib/createRelayEnvironment';
const environment = initEnvironment();

class ProductRowItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: 'view'
        };

        this.updateBenchmark = graphql`
            mutation ProductRowItemUpdateBenchmarkMutation ($input: UpdateBenchmarkByRowIdInput!){
                updateBenchmarkByRowId(input:$input) {
                  benchmark{
                    rowId
                  }
                }
            }
        `;

        this.createBenchmark = graphql`
            mutation ProductRowItemBenchmarkMutation ($input: CreateBenchmarkInput!){
                createBenchmark(input:$input){
                    benchmark{
                        rowId
                    }
                }
            }
        `;
        this.updateProduct = graphql`
            mutation ProductRowItemUpdateProductMutation ($input: UpdateProductByRowIdInput!){
                updateProductByRowId(input:$input){
                    product{
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
    }

    // Toggle the 'archived' value of a Product
    toggleArchived = (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.props.product.archived ? alert(`Restored ${this.props.product.rowId}`) : alert(`Archived ${this.props.product.rowId}`);
      const toggleArchived = this.props.product.archived ? false : true;
      const saveVariables =
            {
                "input": {
                    "productPatch": {
                        "rowId": this.props.product.rowId,
                        "name": this.props.product.name,
                        "description": this.props.product.description,
                        "archived": toggleArchived
                    },
                    "rowId": this.props.product.rowId,
                }
            };
        const saveMutation = this.updateProduct;
        commitMutation(
          environment,
          {
              mutation: saveMutation,
              variables: saveVariables,
              onCompleted: (response, errors) => {
                  console.log(response);
              },
              onError: err => console.error(err),
          },
      );
      window.location.reload();
    }

    saveProduct = (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log('here')
      const saveVariables =
          {
              "input": {
                  "product": {
                    "name": ReactDOM.findDOMNode(this.refs.product_name).value,
                    "description": ReactDOM.findDOMNode(this.refs.product_description).value,
                    "archived": false
                  }
              }
          };

      const saveMutation = this.createProduct;
      commitMutation(
          environment,
          {
              mutation: saveMutation,
              variables: saveVariables,
              onCompleted: (response, errors) => {
                  console.log(response);
                  alert("Product Created");
                  this.createProductFromRef.current.reset();

                  const updateBenchmark = this.updateBenchmark;
                  const newProductId = response.data.createProduct.product.rowId;
                  updateBenchmarkVariables =
                      {
                          "input": {
                            "rowId": this.props.product.rowId,
                            "benchmarkPatch": {
                                "productId": newProductId
                            }
                          }
                      }
                  commitMutation(
                    environment,
                    {
                        mutation: updateBenchmark,
                        variables: updateBenchmarkVariables,
                        onCompleted: (response, errors) => {
                            console.log(response);
                        },
                        onError: err => console.error(err),
                    },
                );
              },
              onError: err => console.error(err),
          },
      );
      window.location.reload();
  }

    saveBenchmark = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let saveVariables =
            {
                "input": {
                    "benchmark": {
                        "productId": this.props.product.rowId,
                        "benchmark": parseFloat(event.target.benchmark.value),
                        "eligibilityThreshold": parseFloat(event.target.eligibility_threshold.value)
                    }
                }
            }

        let saveMutation = this.createBenchmark;
        commitMutation(
            environment,
            {
                mutation: saveMutation,
                variables: saveVariables,
                onCompleted: (response, errors) => {
                    console.log(response);
                    alert("Benchmark Created");
                },
                onError: err => console.error(err),
            },
        );
      window.location.reload();
    }

    toggleProductMode = () => {
        console.log('ProductRowItem > Edit clicked');
        this.state.mode === 'view' || this.state.mode === 'benchmark' ? this.setState({ mode : 'product' }) : this.setState( { mode: 'view' })
    };

    toggleBenchmarkMode = () => {
      console.log('ProductRowItem > Edit clicked');
      this.state.mode === 'view' || this.state.mode === 'product' ? this.setState({ mode : 'benchmark' }) : this.setState( { mode: 'view' })
    };

    render(){

        const product = this.props.product;
        const benchmarks = this.props.product.benchmarksByProductId.nodes[0] ?
                           this.props.product.benchmarksByProductId.nodes[this.props.product.benchmarksByProductId.nodes.length-1]
                            : {benchmark:'', eligibilityThreshold:''}
        // Archived logic
        const background = this.props.product.archived ? 'lightGrey' : '';
        const buttonVariant = this.props.product.archived ? 'success' : 'warning';
        const archiveRestore = this.props.product.archived ? 'Restore' : 'Archive';

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
                            <Form.Label><small>Archived:</small> {product.archived ? 'true': 'false'}</Form.Label>
                        </Col>
                        <Col md={1} style={{textAlign:'right'}}>
                          <Button style={{width:'100%'}} onClick={this.toggleBenchmarkMode}>Edit</Button>
                        </Col>
                        <Col md={2}>
                            <Form.Label><small>Benchmark:</small> {benchmarks.benchmark}</Form.Label>
                        </Col>
                        <Col md={3}>
                            <Form.Label><small>Eligibility Threshold:</small> {benchmarks.eligibilityThreshold}</Form.Label>
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
                        <Form.Label><small>Archived:</small> {product.archived ? 'true': 'false'}</Form.Label>
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
                            <Form.Label><small>Archived:</small> {product.archived ? 'true': 'false'}</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} md="1" style={{textAlign:"right"}}>
                            <ButtonGroup vertical style={{width:'100%', marginTop: 10, marginBotton: 5}}>
                              <Button style={{marginTop:"8px", marginRight:"10px"}} type="submit">Save</Button>
                              <Button variant="secondary" style={{marginTop:"8px"}} onClick={this.toggleBenchmarkMode}>Cancel</Button>
                            </ButtonGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="benchmark">
                            <Form.Label>Benchmark</Form.Label>
                            <Form.Control required="required" type="number" step="0.01"
                                          placeholder={benchmarks.benchmark} defaultValue={benchmarks.benchmark} />
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="eligibility_threshold">
                            <Form.Label>Eligibility Threshold</Form.Label>
                            <Form.Control required="required" type="number" step="0.01"
                                          placeholder={benchmarks.eligibilityThreshold} defaultValue={benchmarks.eligibilityThreshold} />
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
