import React ,{ Component } from 'react'
import {graphql, commitMutation} from "react-relay";
import {Form, Button, Col, Row} from 'react-bootstrap';
import initEnvironment from '../../lib/createRelayEnvironment';
const environment = initEnvironment();

class ProductRowItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: 'view'
        };
        this.createBenchmark = graphql`
            mutation ProductRowItemMutation ($input: CreateBenchmarkInput!){
                createBenchmark(input:$input){
                    benchmark{
                        rowId
                    }
                }
            }
        `;
    }


    saveBenchmark = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const saveVariables =
            {
                "input": {
                    "benchmark": {
                        "productId": this.props.product.rowId,
                        "benchmark": parseFloat(event.target.benchmark.value),
                        "eligibilityThreshold": parseFloat(event.target.eligibility_threshold.value)
                    }
                }
            }

        const saveMutation = this.createBenchmark;
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
    }

    toggleMode = () => {
        this.state.mode === 'view' ? this.setState({ mode : 'edit' }) : this.setState( { mode: 'view' })
    };

    render(){
        const product = this.props.product;
        const benchmarks = this.props.product.benchmarksByProductId.nodes[0] ?
                           this.props.product.benchmarksByProductId.nodes[this.props.product.benchmarksByProductId.nodes.length-1]
                            : {benchmark:'', eligibilityThreshold:''}

        return(
            <React.Fragment>
            <div id="view-item" className={ this.state.mode }>
                <div key={this.props.product.rowId}>
                    <Row>
                        <Col md={4}>
                            <h5>{product.name}</h5>
                            <small>{product.description}</small>
                        </Col>
                        <Col md={2}>
                            <Form.Label><small>Benchmark:</small> {benchmarks.benchmark}</Form.Label>
                        </Col>
                        <Col md={4}>
                            <Form.Label><small>Eligibility Threshold:</small> {benchmarks.eligibilityThreshold}</Form.Label>
                        </Col>
                        <Col md={2} style={{textAlign:'right'}}>
                            <Button onClick={this.toggleMode}>Edit</Button>
                        </Col>
                    </Row>
                </div>
                <hr/>
            </div>

            <div id="edit-item"  className={ this.state.mode }>
                <Form onSubmit={this.saveBenchmark} key={this.props.product.rowId}>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="product_name">
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="benchmark">
                            <Form.Label>Benchmark</Form.Label>
                            <Form.Control required="required" type="number" step="0.01"
                                          placeholder={benchmarks.benchmark} />
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="eligibility_threshold">
                            <Form.Label>Eligibility Threshold</Form.Label>
                            <Form.Control required="required" type="number" step="0.01"
                                          placeholder={benchmarks.eligibilityThreshold} />
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

export default ProductRowItem;