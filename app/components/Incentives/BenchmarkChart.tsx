import React, {Component} from 'react';

interface Props {
  quantity: number;
  benchmark: number;
  eligibilityThreshold: number;
  carbonTaxPaid?: number;
  incentiveSegment?: number;
  fuelPercentage?: number;
}

// TODO: does this need to stay as a class component?
// TODO: render this using svg instead of Canvas
class BenchmarkChart extends Component<Props> {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.font = '12px';
    ctx.fillStyle = '#888';
    ctx.fillRect(0, 140, 120, 2); // Horizontal axis
    ctx.fillRect(0, 0, 2, 140); // Vertical axis

    ctx.fillStyle = '#a03a13';
    const max = Math.max(
      this.props.eligibilityThreshold,
      this.props.benchmark,
      this.props.quantity
    );
    const et = (this.props.eligibilityThreshold / max) * 100;
    ctx.fillRect(0, 140 - et, 120, 3); // Eligibility threshold
    ctx.fillText(`ET: ${this.props.eligibilityThreshold}`, 125, 145 - et);

    ctx.fillStyle = 'green';
    const bm = (this.props.benchmark / max) * 100;
    ctx.fillRect(0, 140 - bm, 120, 3); // Benchmark
    ctx.fillText(`BM: ${this.props.benchmark}`, 125, 140 - bm + 5);

    ctx.fillStyle = '#1a3494';
    const q = (this.props.quantity / max) * 100;
    ctx.fillRect(30, 142, 40, -q); // Benchmark
    ctx.fillText(`QTY:  ${this.props.quantity}`, 80, 150 - q);
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        width="200px"
        style={{padding: '20px 0 20px 20px'}}
      />
    );
  }
}

export default BenchmarkChart;
