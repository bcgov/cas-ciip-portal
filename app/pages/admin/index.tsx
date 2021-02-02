import React, {Component} from 'react';
import {Row} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {adminQueryResponse} from 'adminQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import UserManagement from 'components/Dashboard/userManagement';
import ReportingOperations from 'components/Dashboard/reportingOperations';
import ProgramAdministration from 'components/Dashboard/programAdministration';
import ReportAProblem from 'components/Dashboard/reportAProblem';
import getConfig from 'next/config';
import {ADMIN_GROUP} from 'data/group-constants';

const ALLOWED_GROUPS = ADMIN_GROUP;

interface Props extends CiipPageComponentProps {
  query: adminQueryResponse['query'];
}
class Admin extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query adminQuery {
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
    const feedbackUrl = getConfig()?.publicRuntimeConfig.FEEDBACK_SITE_URL;
    return (
      <DefaultLayout session={session} title="Administrator Dashboard">
        <div>
          <Row>
            <ProgramAdministration />
            <ReportingOperations />
            <UserManagement />
            <ReportAProblem serviceUrl={feedbackUrl || '#'} />
          </Row>

          <style global jsx>
            {`
              .buttons {
                padding: 15px;
                margin: 0 0 25px 0;
              }
              .admin-control-card {
                width: 18rem;
                margin: 20px;
              }
            `}
          </style>
        </div>
      </DefaultLayout>
    );
  }
}

export default Admin;
