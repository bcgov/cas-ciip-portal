import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {contactQueryResponse} from 'contactQuery.graphql';
import DefaultLayout from 'layouts/default-layout';

interface Props extends CiipPageComponentProps {
  query: contactQueryResponse['query'];
}

class Contact extends Component<Props> {
  static isAccessProtected = false;
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
      <DefaultLayout session={session} title="Contact Us">
        <Container>
          <p>
            Please email{' '}
            <a href="mailto:GHGRegulator@gov.bc.ca?subject=CIIP Portal Inquiry">
              GHGRegulator@gov.bc.ca
            </a>{' '}
            with any questions or concerns.
          </p>
        </Container>
      </DefaultLayout>
    );
  }
}

export default Contact;
