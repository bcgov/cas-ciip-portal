import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {graphql, RelayProp} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {viewApplicationQueryResponse} from 'viewApplicationQuery.graphql';
import ApplicationDetails from 'containers/Applications/ApplicationDetailsContainer';
import ApplicationComments from 'containers/Applications/ApplicationCommentsContainer';
import ReviseApplicationButton from 'containers/Applications/ReviseApplicationButtonContainer';
import DefaultLayout from 'layouts/default-layout';

/*
 * ViewApplication renders a summary of the data submitted in the application.
 */

interface Props extends CiipPageComponentProps {
  query: viewApplicationQueryResponse['query'];
  relay: RelayProp;
}

class ViewApplication extends Component<Props> {
  static query = graphql`
    query viewApplicationQuery($applicationId: ID!, $version: String!) {
      query {
        session {
          ...defaultLayout_session
        }
        ...ApplicationDetailsContainer_query

        application(id: $applicationId) {
          applicationRevisionStatus {
            applicationRevisionStatus
          }
          formResultsByApplicationId {
            edges {
              node {
                id
                ...ApplicationCommentsContainer_formResult
              }
            }
          }
          ...ReviseApplicationButtonContainer_application

          ...ApplicationDetailsContainer_application
            @arguments(version: $version)
        }
      }
    }
  `;

  render() {
    const {session} = this.props.query;
    const {query} = this.props;
    const formResults = query.application.formResultsByApplicationId.edges;

    return (
      <DefaultLayout
        showSubheader
        session={session}
        title="Summary of your application"
      >
        <Row>
          <Col md={8}>
            <ApplicationDetails
              isAnalyst={false}
              query={query}
              application={query.application}
            />
          </Col>
          <Col md={4}>
            {formResults.map(({node}) => (
              <ApplicationComments key={node.id} formResult={node.formResult} />
            ))}
          </Col>
        </Row>
        <Row>
          {query?.application?.applicationRevisionStatus
            ?.applicationRevisionStatus === 'REQUESTED_CHANGES' ? (
            <ReviseApplicationButton application={query.application} />
          ) : null}
        </Row>
      </DefaultLayout>
    );
  }
}

export default ViewApplication;
