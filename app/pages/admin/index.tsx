import React, {Component} from 'react';
import {Row} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {adminQueryResponse} from 'adminQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import UserManagement from 'components/Dashboard/userManagement';
import ApplicationManagement from 'components/Dashboard/applicationManagement';
import ProgramDataManagement from 'components/Dashboard/programDataManagement';
import DevOpsManagement from 'components/Dashboard/devopsManagement';

interface Props extends CiipPageComponentProps {
  query: adminQueryResponse['query'];
}
class Admin extends Component<Props> {
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
    return (
      <DefaultLayout session={session} title="Administrator Dashboard">
        <div>
          <Row>
            <UserManagement />
            <ApplicationManagement />
            <ProgramDataManagement />
            <DevOpsManagement />
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
