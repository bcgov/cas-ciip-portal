import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {NextRouter} from 'next/router';
import {CiipPageComponentProps} from 'next-env';
import {requestsQueryResponse} from 'requestsQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import {USER} from 'data/group-constants';
import CertificationRequestsTable from 'containers/Certifier/CertificationRequestsTable';

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: requestsQueryResponse['query'];
  router: NextRouter;
}

export default class CertifierRequests extends Component<Props> {
  static query = graphql`
    query requestsQuery {
      query {
        session {
          ciipUserBySub {
            ...CertificationRequestsTable_query
          }
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout
        title="Certification Requests"
        session={query.session}
        allowedGroups={ALLOWED_GROUPS}
      >
        <CertificationRequestsTable query={query.session.ciipUserBySub} />
      </DefaultLayout>
    );
  }
}
