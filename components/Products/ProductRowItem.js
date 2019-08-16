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
        mutation ProductRowItemProductMutation ($input: UpdateProductByRowIdInput!){
            updateProductByRowId(input:$input){
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
        saveVariables =
            {
                "input": {
                    "productPatch": {
                        "rowId": this.props.product.rowId,
                        "name": ReactDOM.findDOMNode(this.refs.product_name).value,
                        "description": ReactDOM.findDOMNode(this.refs.product_description).value
                    },
                    "rowId": this.props.product.rowId,
                }
            };
        saveMutation = this.updateProduct;
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

    toggleMode = () => {
        console.log('ProductRowItem > Edit clicked');
        this.state.mode === 'view' ? this.setState({ mode : 'edit' }) : this.setState( { mode: 'view' })
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
            <div key={this.props.product.rowId} id="view-item" className={ this.state.mode } style={{background}}>
                <div >
                    <Row style={{padding: 5}}>
                        <Col md={4}>
                            <h5>{product.name}</h5>
                            <small>{product.description}</small>
                        </Col>
                        <Col md={2}>
                            <Form.Label><small>Benchmark:</small> {benchmarks.benchmark}</Form.Label>
                        </Col>
                        <Col md={2}>
                            <Form.Label><small>Eligibility Threshold:</small> {benchmarks.eligibilityThreshold}</Form.Label>
                        </Col>
                        <Col md={2}>
                            <Form.Label><small>Archived:</small> {product.archived ? 'true': 'false'}</Form.Label>
                        </Col>
                        <Col md={2} style={{textAlign:'right'}}>
                            <ButtonGroup style={{width:'100%', marginTop: 10, marginBotton: 5}}>
                                <Button style={{width:'50%'}} width='50%' onClick={this.toggleMode}>Edit</Button>
                                <Button style={{width:'50%'}} variant={buttonVariant} onClick={this.toggleArchived}>{archiveRestore}</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </div>
                <hr/>
            </div>

            <div key={`edit-${this.props.product.rowId}`} id="edit-item"  className={ this.state.mode }>
                <Form onSubmit={this.saveBenchmark} key={this.props.product.rowId}>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="product_name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required="required" type="string" step="0.01"
                                          placeholder={product.name} defaultValue={product.name} ref='product_name' />
                        <Form.Label>Description</Form.Label>
                        <Form.Control required="required" type="string" step="0.01"
                                      placeholder={product.description} defaultValue={product.description} ref='product_description' />
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="benchmark">
                            <Form.Label>Benchmark</Form.Label>
                            <Form.Control required="required" type="number" step="0.01"
                                          placeholder={benchmarks.benchmark} defaultValue={benchmarks.benchmark} />
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="eligibility_threshold">
                            <Form.Label>Eligibility Threshold</Form.Label>
                            <Form.Control required="required" type="number" step="0.01"
                                          placeholder={benchmarks.eligibilityThreshold} defaultValue={benchmarks.eligibilityThreshold} />
                        </Form.Group>
                        <Form.Group as={Col} md="4" style={{textAlign:"right"}} controlId="eligibility_threshold">
                            <br/>
                            <Button style={{marginTop:"8px", marginRight:"10px"}} type="submit">Save</Button>
                            <Button variant="secondary" style={{marginTop:"8px"}} onClick={this.toggleMode}>Cancel</Button>
                        </Form.Group>

                    </Form.Row>
                </Form>
                <hr/>
            </div>
                <style jsx>{`
                    #edit-item.view, #view-item.edit {
                        display:none;
                    }
                    #edit-item.edit, #view-item.view{
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
      name: propTypes.string,
      description: propTypes.string,
      archived: propTypes.boolean
    })
}

export default ProductRowItem;