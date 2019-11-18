import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {accessibilityQueryResponse} from 'accessibilityQuery.graphql';
import DefaultLayout from '../../layouts/default-layout';

interface Props extends CiipPageComponentProps {
  query: accessibilityQueryResponse['query'];
}

class Accessibility extends Component<Props> {
  static query = graphql`
    query accessibilityQuery {
      query {
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {query} = this.props;
    const {session} = query || {};
    return (
      <DefaultLayout
        session={session}
        needsSession={false}
        needsUser={false}
        title="Accessibility"
      />
    );
  }
}

export default Accessibility;
