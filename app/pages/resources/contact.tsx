import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {contactQueryResponse} from 'contactQuery.graphql';
import DefaultLayout from 'layouts/default-layout';

interface Props extends CiipPageComponentProps {
  query: contactQueryResponse['query'];
}

class Contact extends Component<Props> {
  static query = graphql`
    query contactQuery {
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
        title="Contact Us"
      />
    );
  }
}

export default Contact;
