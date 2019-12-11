import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {graphql} from 'react-relay';
import Link from 'next/link';
import {viewApplicationQueryResponse} from 'viewApplicationQuery.graphql';
import ApplicationDetails from 'containers/Applications/ApplicationDetailsContainer';
import RequestedChanges from 'containers/Applications/RequestedChangesByFormResult';
import DefaultLayout from 'layouts/default-layout';

/*
 * ViewApplication renders a summary of the data submitted in the application.
 */

interface Props {
  query: viewApplicationQueryResponse['query'];
}

class ViewApplication extends Component<Props> {
  static query = graphql`
    query viewApplicationQuery($applicationId: ID!) {
      query {
        session {
          ...defaultLayout_session
        }
        ...ApplicationDetailsContainer_query
        application(id: $applicationId) {
          ...RequestedChangesByFormResult_application
          ...ApplicationDetailsContainer_application
        }
      }
    }
  `;

  render() {
    const {session} = this.props.query;
    const {query} = this.props;

    return (
      <DefaultLayout session={session} title="Summary of your application">
        <Row>
          <Col md={8}>
            <ApplicationDetails
              isAnalyst={false}
              query={query}
              application={query.application}
            />
          </Col>
          <Col md={4}>
            <RequestedChanges application={query.application} />
          </Col>
        </Row>
        <Link
          href={{
            pathname: '/user-dashboard'
          }}
        >
          <Button variant="primary">Back to My Dashboard</Button>
        </Link>
      </DefaultLayout>
    );
  }
}

export default ViewApplication;
