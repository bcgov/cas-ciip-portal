import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {loginRedirectQueryResponse} from 'loginRedirectQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import DefaultLayout from 'layouts/default-layout';
import RegistrationLoginButtons from 'containers/RegistrationLoginButtons';
import {NextRouter} from 'next/router';

interface Props extends CiipPageComponentProps {
  query: loginRedirectQueryResponse['query'];
  router: NextRouter;
}

export default class LoginRedirect extends Component<Props> {
  static query = graphql`
    query loginRedirectQuery {
      query {
        session {
          ...defaultLayout_session
        }
        ...RegistrationLoginButtons_query
      }
    }
  `;

  render() {
    const {query, router} = this.props;
    const {session} = query || {};

    const headerText = router.query.sessionIdled
      ? 'You were logged out due to inactivity.'
      : 'You need to be logged in to access this page.';
    return (
      <DefaultLayout showSubheader={false} session={session}>
        <Row>
          <Col md={6}>
            <h3 className="blue">{headerText}</h3>
            <p>
              Please log in or register in order to access this page.
              <br />
              You will be redirected to the requested page after doing so.
            </p>
          </Col>
          <RegistrationLoginButtons query={query} />
        </Row>
      </DefaultLayout>
    );
  }
}
