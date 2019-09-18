import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Container} from 'react-bootstrap';
import {withRouter} from 'next/router';
import IncentiveCalculatorContainer from '../containers/Incentives/IncentiveCalculator';
import ApplicationStatus from '../containers/Applications/ApplicationStatus';
import Header from '../components/Header';

class ApplicationDetails extends Component {
  render() {
    const {
      application_id: applicationId,
      reportingyear: reportingYear,
      bcghgid
    } = this.props.router.query;

    const url =
      'http://metabase-wksv3k-test.pathfinder.gov.bc.ca/public/dashboard/e5c89425-e6c1-489b-9329-a7ab68e44d8f?' +
      `application_id=${applicationId}&reporting_year=${reportingYear}&bcghgid=${bcghgid}`;

    return (
      <>
        <div>
          <Header />
          {this.props.router.query.application_id ? (
            <Container>
              <ApplicationStatus applicationId={applicationId} />
              <iframe src={url} frameBorder="0" width="100%" height="1000" />
              <hr />
              <IncentiveCalculatorContainer
                bcghgid={bcghgid}
                reportingYear={reportingYear}
              />
            </Container>
          ) : null}
          <hr />
        </div>
      </>
    );
  }

  static propTypes = {
    router: propTypes.shape({
      query: propTypes.shape({
        application_id: propTypes.string,
        reportingyear: propTypes.string,
        bcghgid: propTypes.string
      })
    }).isRequired
  };
}

export default withRouter(ApplicationDetails);
