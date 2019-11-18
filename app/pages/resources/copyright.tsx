import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {copyrightQueryResponse} from 'copyrightQuery.graphql';
import DefaultLayout from '../../layouts/default-layout';

interface Props extends CiipPageComponentProps {
  query: copyrightQueryResponse['query'];
}

class Copyright extends Component<Props> {
  static query = graphql`
    query copyrightQuery {
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
    return <DefaultLayout session={session} title="Copyright" />;
  }
}

export default Copyright;
