import React from 'react';
import {Table} from 'react-bootstrap';
import {dateTimeFormat} from 'functions/formatDates';

interface Props {
  pastBenchmarks: any;
}

const PastBenchmarksComponent: React.FunctionComponent<Props> = (props) => {
  const {pastBenchmarks} = props;

  const renderPastBenchmarks = pastBenchmarks.map(({node}) => (
    <tr key={node.id}>
      <td>{dateTimeFormat(node.createdAt, 'days_numbered')}</td>
      <td>{node.benchmark}</td>
      <td>{node.startReportingYear}</td>
      <td>{node.endReportingYear}</td>
      <td>{node.eligibilityThreshold}</td>
      <td>{node.incentiveMultiplier}</td>
      <td>{node.minimumIncentiveRatio}</td>
      <td>{node.maximumIncentiveRatio}</td>
    </tr>
  ));

  return (
    <>
      <br />
      <span>
        <h5>Past Benchmarks</h5>
        <hr />
      </span>
      <Table style={{textAlign: 'center'}}>
        <thead>
          <tr>
            <th>Date Created (D-M-Y)</th>
            <th>Benchmark</th>
            <th>Start</th>
            <th>End</th>
            <th>ET</th>
            <th>Multiplier</th>
            <th>Min Ratio</th>
            <th>Max Ratio</th>
          </tr>
        </thead>
        <tbody>{renderPastBenchmarks}</tbody>
      </Table>
    </>
  );
};

export default PastBenchmarksComponent;
