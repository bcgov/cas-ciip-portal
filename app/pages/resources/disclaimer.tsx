import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {disclaimerQueryResponse} from 'disclaimerQuery.graphql';
import DefaultLayout from 'layouts/default-layout';

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
    return (
      <DefaultLayout session={session} title="Disclaimer">
        <Container>
          <p>
            <strong>Warranty Disclaimer</strong>
          </p>
          <p>
            This information is provided as a public service by the Government
            of British Columbia, Box 9411, Victoria, British Columbia, Canada
            V8W 9V1.
          </p>
          <p>
            This website and all of the information it contains are provided
            &quot;as is&quot; without warranty of any kind, whether express or
            implied. All implied warranties, including, without limitation,
            implied warranties of merchantability, fitness for a particular
            purpose, and non-infringement, are hereby expressly disclaimed.
            Links and references to any other websites are provided for
            information only and listing shall not be taken as endorsement of
            any kind. The Government of British Columbia is not responsible for
            the content or reliability of the linked websites and does not
            endorse the content, products, services or views expressed within
            them.
          </p>
          <p>
            <strong>Limitation of Liabilities</strong>
          </p>
          <p>
            Under no circumstances will the Government of British Columbia be
            liable to any person or business entity for any direct, indirect,
            special, incidental, consequential, or other damages based on any
            use of this website or any other website to which this site is
            linked, including, without limitation, any lost profits, business
            interruption, or loss of programs or information, even if the
            Government of British Columbia has been specifically advised of the
            possibility of such damages.
          </p>
        </Container>
      </DefaultLayout>
    );
  }
}

export default Disclaimer;
