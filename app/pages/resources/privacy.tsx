import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {privacyQueryResponse} from 'privacyQuery.graphql';
import DefaultLayout from '../../layouts/default-layout';

interface Props extends CiipPageComponentProps {
  query: privacyQueryResponse['query'];
}

class Privacy extends Component<Props> {
  static query = graphql`
    query privacyQuery {
      query {
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  // TODO: Add content to this empty page
  render() {
    const {query} = this.props;
    const {session} = query || {};
    return (
      <DefaultLayout
        session={session}
        needsSession={false}
        needsUser={false}
        title="Privacy"
      />
    );
  }
}

export default Privacy;
