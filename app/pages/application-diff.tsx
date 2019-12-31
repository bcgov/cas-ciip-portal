import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {applicationDiffQueryResponse} from 'applicationDiffQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import {CiipPageComponentProps} from 'next-env';
import diff from 'deep-diff';

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
    // @ts-ignore
    console.log(allApplicationRevisions);
    // @ts-ignore
    const lhs =
      allApplicationRevisions.edges[0].node
        .formResultsByApplicationIdAndVersionNumber.edges[0].node.formResult;
    // @ts-ignore
    const rhs =
      allApplicationRevisions.edges[1].node
        .formResultsByApplicationIdAndVersionNumber.edges[0].node.formResult;
    const differences = diff(lhs, rhs);
    console.log(differences);
    return (
      <DefaultLayout session={session} width="wide">
        <table>
          <thead>
            <tr>
              <th>LHS</th>
              <th />
              <th>RHS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{differences[0].lhs}</td>
              <td> | </td>
              <td>{differences[0].rhs}</td>
            </tr>
          </tbody>
        </table>
      </DefaultLayout>
    );
  }
}

export default ApplicationDiff;
