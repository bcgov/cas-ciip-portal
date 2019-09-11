import React, {Component} from 'react';
import propTypes from 'prop-types';
import MathJax from 'react-mathjax2';
import BenchmarkChart from './BenchmarkChart';

class IncentiveSegment extends Component {
  render() {
    const formula = `
            \\left(${this.props.quantity} - ${this.props.benchmark}
            \\over
            ${this.props.eligibilityThreshold} - ${
      this.props.benchmark
    } \\right)
            \\times
            ${this.props.fuelPercentage}
            \\times
            ${this.props.carbonTaxPaid.toFixed(2)}
        `;
    console.log(
      'Incentive Segment details',
      this.props.name,
      formula,
      this.props.incentiveSegment.toFixed(2)
    );
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>
          <MathJax.Context input="tex">
            <MathJax.Node>{formula}</MathJax.Node>
          </MathJax.Context>
        </td>
        <td>CAD {this.props.incentiveSegment.toFixed(2)} </td>
        <td>
          <BenchmarkChart
            quantity={this.props.quantity}
            benchmark={this.props.benchmark}
            eligibilityThreshold={this.props.eligibilityThreshold}
          />
        </td>
        <style jsx>
          {`
            td {
              vertical-align: middle;
            }
          `}
        </style>
      </tr>
    );
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

/*
Can fuel percentages be reported as null?
 */
