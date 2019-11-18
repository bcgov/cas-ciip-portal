import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {disclaimerQueryResponse} from 'disclaimerQuery.graphql';
import DefaultLayout from '../../layouts/default-layout';

interface Props extends CiipPageComponentProps {
  query: disclaimerQueryResponse['query'];
}

class Disclaimer extends Component<Props> {
  static query = graphql`
    query disclaimerQuery {
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
    return <DefaultLayout session={session} title="Disclaimer" />;
  }
}

export default Disclaimer;
