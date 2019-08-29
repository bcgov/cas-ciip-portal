import React ,{ Component } from 'react'
import propTypes from "prop-types";
import MathJax from 'react-mathjax';
import {Button , Row, Col, DropdownButton, Dropdown} from "react-bootstrap";

class IncentiveSegment extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        const formula = `
            \\left(${this.props.quantity} - ${this.props.benchmark}
            \\over
            ${this.props.eligibilityThreshold} - ${this.props.benchmark} \\right)
            \\times 
            ${this.props.fuelPercentage}
            \\times 
            ${this.props.carbonTaxPaid}
            =
            $ ${this.props.incentiveSegment.toFixed(2)} 
        `;
        return (
            <Row>
                <Col md={5}>
                    <h5>
                        {this.props.name}:
                    </h5>
                </Col>
                <Col md={6}>
                    <MathJax.Provider>
                            <MathJax.Node formula={formula} />
                    </MathJax.Provider>
                </Col>
            </Row>
       )
    }

}

// Proptype Validations
IncentiveSegment.propTypes = {
    name: propTypes.string,
    quantity: propTypes.number,
    benchmark: propTypes.number,
    eligibilityThreshold: propTypes.number,
    carbonTaxPaid: propTypes.number,
    incentiveSegment: propTypes.number,
    fuelPercentage: propTypes.number
};



export default IncentiveSegment;

