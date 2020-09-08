import React from 'react';
import {Table} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import moment from 'moment-timezone';
import {KeyDates_query} from '__generated__/KeyDates_query.graphql';

const TIME_ZONE = 'America/Vancouver';
const DATE_FORMAT = 'MMM D, YYYY';

interface Props {
  query: KeyDates_query;
}

export const KeyDatesComponent: React.FunctionComponent<Props> = ({query}) => {
  const {openedReportingYear, nextReportingYear} = query;

  if (!openedReportingYear && !nextReportingYear) return null;

  const startDate = moment.tz(
    openedReportingYear?.applicationOpenTime ??
      nextReportingYear?.applicationOpenTime,
    TIME_ZONE
  );
  // Const endDate = moment.tz(
  //   openedReportingYear?.applicationCloseTime ??
  //     nextReportingYear?.applicationCloseTime,
  //   TIME_ZONE
  // );
  // const swrsDeadline = moment.tz(
  //   openedReportingYear?.swrsDeadline ?? nextReportingYear?.swrsDeadline,
  //   TIME_ZONE
  // );

  const keyDates = [
    // {
    //   date: swrsDeadline,
    //   description: 'Industrial GHG reporting deadline',
    //   key: '848tfh282740jd'
    // },
    {
      date: startDate,
      description: 'CIIP application forms open',
      key: 'j87kj39uhf8930'
    }
    // ,
    // {
    //   date: endDate,
    //   description: 'CIIP application form due',
    //   key: 'kd9393hd8sy273'
    // }
  ];

  const keyDatesRows = keyDates
    .sort((a, b) =>
      a.date.isBefore(b.date) ? -1 : a.date.isSame(b.date) ? 0 : 1
    )
    .map((d) => {
      return (
        <tr key={d.key}>
          <td>{d.date.format(DATE_FORMAT)}</td>
          <td>{d.description}</td>
        </tr>
      );
    });

  return (
    <>
      <h3 className="blue">Key Dates</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th />
          </tr>
        </thead>
        <tbody>{keyDatesRows}</tbody>
      </Table>
    </>
  );
};

export default createFragmentContainer(KeyDatesComponent, {
  query: graphql`
    fragment KeyDates_query on Query {
      openedReportingYear {
        swrsDeadline
        applicationOpenTime
        applicationCloseTime
      }
      nextReportingYear {
        swrsDeadline
        applicationOpenTime
        applicationCloseTime
      }
    }
  `
});
