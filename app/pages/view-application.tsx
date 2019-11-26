import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {graphql} from 'react-relay';
import Link from 'next/link';
import {viewApplicationQueryResponse} from 'viewApplicationQuery.graphql';
import DefaultLayout from '../layouts/default-layout';
import ApplicationDetails from '../containers/Applications/ApplicationDetailsContainer';

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
          @arguments(applicationId: $applicationId)
      }
    }
  `;

  render() {
    const {session} = this.props.query;
    const {query} = this.props;

    return (
      <DefaultLayout session={session} title="Summary of your application">
        <ApplicationDetails query={query} />
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
