import React, {Component} from 'react';
import {Container, Alert} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
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

  render() {
    const {query} = this.props;
    const {session} = query || {};
    return (
      <DefaultLayout session={session} title="Contact Us">
        <Container>
          <Alert variant="info">
            <FontAwesomeIcon icon={faInfoCircle} />
            <span className="pl-2">
              For help with your CIIP application, or questions about the
              CleanBC Industrial Incentive Program, please email{' '}
              <a href="mailto:GHGRegulator@gov.bc.ca?subject=Support Request (CIIP)">
                GHGRegulator@gov.bc.ca
              </a>
            </span>
          </Alert>
          <p className="px-4 py-3">
            To report a website error, contact the development team at{' '}
            <a href="mailto:ggircs@gov.bc.ca?subject=Support Request (CIIP)">
              ggircs@gov.bc.ca
            </a>
            .
          </p>
        </Container>
      </DefaultLayout>
    );
  }
}

export default Contact;
