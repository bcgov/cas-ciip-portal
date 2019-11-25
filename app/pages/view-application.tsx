import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {graphql} from 'react-relay';
import Link from 'next/link';
import {viewApplicationQueryResponse} from 'viewApplicationQuery.graphql';
import DefaultLayout from '../layouts/default-layout';
import ApplicationDetailsCardItem from '../containers/Applications/ApplicationDetailsCardItem';

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
        application(id: $applicationId) {
          id
          formResultsByApplicationId {
            edges {
              node {
                id
                ...ApplicationDetailsCardItem_formResult
              }
            }
          }
        }
      }
    }
  `;

  render() {
    const {session, application} = this.props.query;

    return (
      <DefaultLayout session={session} title="Summary of your application">
        {application.formResultsByApplicationId.edges.map(({node}) => (
          <ApplicationDetailsCardItem key={node.id} formResult={node} />
        ))}
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
