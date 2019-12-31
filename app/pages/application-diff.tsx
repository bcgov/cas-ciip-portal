import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {applicationDiffQueryResponse} from 'applicationDiffQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import {CiipPageComponentProps} from 'next-env';

interface Props extends CiipPageComponentProps {
  query: applicationDiffQueryResponse['query'];
}

class ApplicationDiff extends Component<Props> {
  static state = {
    applicationId: 0
  };

  static query = graphql`
    query applicationDiffQuery {
      query {
        session {
          ...defaultLayout_session
        }
        allApplicationRevisions(condition: {applicationId: $applicationId}) {
          edges {
            node {
              id
              versionNumber
              formResultsByApplicationIdAndVersionNumber {
                edges {
                  node {
                    formResult
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  static async getInitialProps() {
    return {
      variables: {
        applicationId: this.state.applicationId
      }
    };
  }

  render() {
    const {query} = this.props;
    const {session, allApplicationRevisions} = query;
    console.log(allApplicationRevisions);
    return (
      <DefaultLayout session={session} width="wide">
        <table>
          <thead>
            <tr>
              <th>GO TIME</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GOGOGO</td>
            </tr>
          </tbody>
        </table>
      </DefaultLayout>
    );
  }
}

export default ApplicationDiff;
