import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {loginRedirectQueryResponse} from 'loginRedirectQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import DefaultLayout from 'layouts/default-layout';
import RegistrationLoginButtons from 'components/RegistrationLoginButtons';
import moment from 'moment-timezone';

const TIME_ZONE = 'America/Vancouver';

interface Props extends CiipPageComponentProps {
  query: loginRedirectQueryResponse['query'];
}

export default class LoginRedirect extends Component<Props> {
  static query = graphql`
    query loginRedirectQuery {
      query {
        session {
          ...defaultLayout_session
        }
        openedReportingYear {
          applicationCloseTime
        }
        nextReportingYear {
          applicationCloseTime
        }
      }
    }
  `;

  render() {
    const {query} = this.props;
    const {session, openedReportingYear, nextReportingYear} = query || {};

    const deadline = moment
      .tz(
        openedReportingYear?.applicationCloseTime ??
          nextReportingYear?.applicationCloseTime,
        TIME_ZONE
      )
      .format('MMMM DD, YYYY');

    return (
      <DefaultLayout showSubheader={false} session={session}>
        <Row>
          <Col md={6}>
            <h3 className="blue">
              You need to be logged in to access this page.
            </h3>
            <p>
              Please log in or register in order to access this page.
              <br />
              You will be redirected to the requested page after doing so.
            </p>
          </Col>
          <RegistrationLoginButtons applicationDeadline={deadline} />
        </Row>
      </DefaultLayout>
    );
  }
}
