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
    query certifyQuery($rowId: UUID!) {
      query {
        session {
          ...defaultLayout_session
        }
        certificationUrlByRowId(rowId: $rowId) {
          id
          rowId
          applicationByApplicationId {
            ...CertificationPage_application
          }
        }
      }
    }
  `;

  render() {
    const {query} = this.props;
    console.log(this.props);
    const certificationUrl = query?.certificationUrlByRowId?.rowId;
    return (
      <>
        <DefaultLayout
          title="Submission Certification"
          session={query.session}
          needsUser={false}
          needsSession={false}
        >
          {certificationUrl ? (
            <>
              <CertificationPage
                application={
                  query.certificationUrlByRowId.applicationByApplicationId
                }
                isAnalyst={false}
              />
              <CertificationSignature />
            </>
          ) : (
            'Move along, Nothing to see here'
          )}
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
