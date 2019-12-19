import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {certifyQueryResponse} from 'certifyQuery.graphql';
import ApplicationDetailsContainer from 'containers/Applications/ApplicationDetailsContainer';
import CertificationSignature from 'containers/Forms/CertificationSignature';
import DefaultLayout from '../layouts/default-layout';

interface Props {
  query: certifyQueryResponse['query'];
  router: any;
}

class Certify extends Component<Props> {
  static query = graphql`
    query certifyQuery(
      $applicationId: ID!
      $revisionId: ID!
      $version: String!
    ) {
      query {
        session {
          ...defaultLayout_session
        }
        ...ApplicationDetailsContainer_query @arguments(revisionId: $revisionId)

        application(id: $applicationId) {
          ...CertificationSignature_application
          ...ApplicationDetailsContainer_application
            @arguments(version: $version)
        }
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <>
        <DefaultLayout title="Submission Certification" session={query.session}>
          <>
            <ApplicationDetailsContainer
              query={query}
              isAnalyst={false}
              application={query.application}
            />
            <CertificationSignature application={query.application} />
          </>
        </DefaultLayout>
        <style jsx global>
          {`
            .signatureCanvas {
              border: 1px solid #bbb;
              padding: 30px;
              width: 80%;
              background: #eee;
              border-radius: 6px;
              margin-bottom: 60px;
            }
          `}
        </style>
      </>
    );
  }
}

export default Certify;
