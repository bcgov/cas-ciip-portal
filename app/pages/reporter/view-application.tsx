import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {viewApplicationQueryResponse} from 'viewApplicationQuery.graphql';
import ApplicationDetails from 'containers/Applications/ApplicationDetailsContainer';
import ApplicationComments from 'containers/Applications/ApplicationCommentsContainer';
import ReviseApplicationButton from 'containers/Applications/ReviseApplicationButtonContainer';
import DefaultLayout from 'layouts/default-layout';
import {USER} from 'data/group-constants';

const ALLOWED_GROUPS = [USER];

/*
 * ViewApplication renders a summary of the data submitted in the application.
 */

interface Props extends CiipPageComponentProps {
  query: viewApplicationQueryResponse['query'];
}

class ViewApplication extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query viewApplicationQuery($applicationId: ID!, $version: String!) {
      query {
        session {
          ...defaultLayout_session
        }
        ...ApplicationDetailsContainer_query
          @arguments(
            applicationId: $applicationId
            oldVersion: $version
            newVersion: $version
          )

        application(id: $applicationId) {
          applicationRevisionStatus(versionNumberInput: $version) {
            applicationRevisionStatus
          }
          orderedFormResults(versionNumberInput: $version) {
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
    const formResults = query.application.orderedFormResults.edges;

    return (
      <DefaultLayout
        showSubheader
        session={session}
        title="Summary of your application"
      >
        <Row>
          <Col md={8}>
            <ApplicationDetails
              query={query}
              application={query.application}
              review={false}
              liveValidate={false}
            />
          </Col>
          <Col md={4}>
            {formResults.map(({node}) => (
              <ApplicationComments
                key={node.id}
                formResult={node}
                review={false}
              />
            ))}
          </Col>
        </Row>
        <Row>
          {query?.application?.applicationRevisionStatus
            ?.applicationRevisionStatus === 'REQUESTED_CHANGES' ? (
            <ReviseApplicationButton application={query.application} />
          ) : null}
        </Row>
        <style jsx global>{`
          @media print {
            header,
            footer {
              display: none !important;
            }
          }
        `}</style>
      </DefaultLayout>
    );
  }
}

export default ViewApplication;
