import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {certifyQueryResponse} from 'certifyQuery.graphql';
import CertificationPage from 'containers/Forms/CertificationPage';
import CertificationSignature from 'containers/Forms/CertificationSignature';
import DefaultLayout from '../layouts/default-layout';

interface Props {
  query: certifyQueryResponse['query'];
  router: any;
}

class Certify extends Component<Props> {
  static query = graphql`
    query certifyQuery($applicationId: ID!) {
      query {
        session {
          ciipUserBySub {
            rowId
          }
          ...defaultLayout_session
        }
        application(id: $applicationId) {
          ...CertificationPage_application
          ...CertificationSignature_application
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
            <CertificationPage
              application={query.application}
              isAnalyst={false}
            />
            <CertificationSignature
              application={query.application}
              user={query?.session?.ciipUserBySub?.rowId}
            />
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
