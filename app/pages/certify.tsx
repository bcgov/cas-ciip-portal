import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {certifyQueryResponse} from 'certifyQuery.graphql';
import CertificationPage from 'containers/Forms/CertificationPage';
import CertificationSignature from 'containers/Forms/CertificationSignature';
import moment from 'moment';
import DefaultLayout from '../layouts/default-layout';

interface Props {
  query: certifyQueryResponse['query'];
  router: any;
}

class Certify extends Component<Props> {
  static query = graphql`
    query certifyQuery($rowId: String!) {
      query {
        session {
          ...defaultLayout_session
        }
        certificationUrlByRowId(rowId: $rowId) {
          id
          rowId
          createdAt
          applicationByApplicationId {
            ...CertificationPage_application
            ...CertificationSignature_application
          }
        }
      }
    }
  `;

  render() {
    const {query} = this.props;
    const createdAtMoment = query?.certificationUrlByRowId?.createdAt
      ? moment(query?.certificationUrlByRowId?.createdAt)
      : null;
    const currentMoment = moment();
    // TODO(Dylan): handle expiry of url validation on the back end
    // Sets an expiry of 7 days for the certification URL
    const isValid =
      currentMoment.format('x') < createdAtMoment?.add(7, 'days').format('x');
    const certificationUrl = query?.certificationUrlByRowId?.rowId && isValid;
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
              <CertificationSignature
                application={
                  query.certificationUrlByRowId.applicationByApplicationId
                }
              />
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
