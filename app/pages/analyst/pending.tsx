import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {pendingAnalystQueryResponse} from 'pendingAnalystQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import {PENDING_ANALYST} from 'data/group-constants';

const ALLOWED_GROUPS = [PENDING_ANALYST];

interface Props extends CiipPageComponentProps {
  query: pendingAnalystQueryResponse['query'];
}
class PendingAnalyst extends Component<Props> {
  static query = graphql`
    query pendingAnalystQuery {
      query {
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {
      query: {session}
    } = this.props;
    return (
      <DefaultLayout
        session={session}
        title="Approval Required"
        allowedGroups={ALLOWED_GROUPS}
      >
        <div>
          You have not been authorized to access the CleanBC Industrial
          Incentive Program application. Please contact ghgregulator@gov.bc.ca
          to request permission to this application
        </div>
      </DefaultLayout>
    );
  }
}

export default PendingAnalyst;
