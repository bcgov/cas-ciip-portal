import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Container} from 'react-bootstrap';
import {withRouter} from 'next/router';
import IncentiveCalculatorContainer from '../containers/Incentives/IncentiveCalculator';
import Header from '../components/Header';

class ApplicationDetails extends Component {
  propTypes = {
    router: propTypes.shape({
      query: propTypes.shape({
        application_id: propTypes.string,
        reportingyear: propTypes.string,
        bcghgid: propTypes.string
      })
    }).isRequired
  };

  render() {
    const {
      application_id: applicationId,
      reportingyear: reportingYear,
      bcghgid
    } = this.propTypes.router.query;

    const url =
      'http://localhost:3000/public/dashboard/985719f1-7eae-4c49-88a9-7d6c8edc1ad4?' +
      `application_id=${applicationId}&reportingyear=${reportingYear}&bcghgid=${bcghgid}`;

    return (
      <>
        <div>
          <Header />
          <Container>
            <iframe src={url} frameBorder="0" width="100%" height="1000" />
            <IncentiveCalculatorContainer
              bcghgid={bcghgid}
              reportingYear={reportingYear}
            />
          </Container>
          <hr />
        </div>
      </>
    );
  }
}

export default withRouter(ApplicationDetails);
