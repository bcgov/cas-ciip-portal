import React, {Component} from 'react';
import {Row} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {analystQueryResponse} from 'analystQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import ApplicationManagement from 'components/Dashboard/applicationManagement';
import ProgramDataManagement from 'components/Dashboard/programDataManagement';

interface Props extends CiipPageComponentProps {
  query: analystQueryResponse['query'];
}
class Analyst extends Component<Props> {
  static query = graphql`
    query analystQuery {
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
      <DefaultLayout session={session} title="Analyst Dashboard">
        <div>
          <Row>
            <ApplicationManagement />
            <ProgramDataManagement viewOnly />
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

export default Analyst;
