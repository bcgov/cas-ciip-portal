import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {copyrightQueryResponse} from 'copyrightQuery.graphql';
import DefaultLayout from 'layouts/default-layout';

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
    return (
      <DefaultLayout
        session={session}
        needsSession={false}
        needsUser={false}
        title="Copyright"
      >
        <Container>
          <p>
            The following policy governs the operation and management of the
            government&apos;s main website and all websites of ministries, and
            agencies reporting to ministries.
          </p>

          <p>Copyright © 2020, Province of British Columbia.</p>

          <p>All rights reserved.</p>

          <p>
            This material is owned by the Government of British Columbia and
            protected by copyright law. It may not be reproduced or
            redistributed without the prior written permission of the Province
            of British Columbia.
          </p>

          <p>
            <strong>Permission</strong>
          </p>

          <p>
            To request permission to reproduce all or part of any other
            materials on this website, please complete the{' '}
            <a
              href="https://forms.gov.bc.ca/copyright-permission-request/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Copyright Permission Request Form
            </a>
            .
          </p>

          <p>
            <strong>Exceptions</strong>
          </p>

          <p>
            For the reproduction of provincial legislation found on the{' '}
            <a
              href="http://www.bclaws.ca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              BC Laws website
            </a>
            , permission is subject to the terms of the{' '}
            <a
              href="http://www.bclaws.ca/standards/2014/QP-License_1.0.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Queen’s Printer License – British Columbia
            </a>
            .
          </p>

          <p>
            For the reproduction of specified b-roll, interview and podium video
            footage found on the{' '}
            <a
              href="https://news.gov.bc.ca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              BC Gov News website
            </a>
            , permission is subject to the terms of the{' '}
            <a
              href="https://news.gov.bc.ca/assets/license"
              target="_blank"
              rel="noopener noreferrer"
            >
              News Footage License - British Columbia
            </a>
            .
          </p>

          <p>
            For the reproduction of materials found in the{' '}
            <a
              href="http://catalogue.data.gov.bc.ca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              BC Data Catalogue
            </a>
            , either a license agreement (as specified in the BC Data Catalogue)
            will apply or the materials are “access only” and reproduction is
            not permitted without written permission. To request permission,
            please complete the{' '}
            <a
              href="https://forms.gov.bc.ca/copyright-permission-request/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Copyright Permission Request Form
            </a>
            . If a license agreement applies, permission is subject to the terms
            of the specified license.
          </p>

          <p>
            <strong>Questions or concerns?</strong>
          </p>

          <p>
            For more information, please read the{' '}
            <a
              href="/gov/content/governments/services-for-government/policies-procedures/intellectual-property/frequently-asked-questions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frequently&nbsp;Asked Questions
            </a>{' '}
            or contact the{' '}
            <a
              href="/gov/content/governments/services-for-government/policies-procedures/intellectual-property/intellectual-property-program/intellectual-property-disposals"
              target="_blank"
              rel="noopener noreferrer"
            >
              Intellectual Property Program
            </a>
            .
          </p>

          <p>
            e-mail:{' '}
            <a
              href="mailto:QPIPPCopyright@gov.bc.ca"
              target="_blank"
              rel="noopener noreferrer"
            >
              QPIPPCopyright@gov.bc.ca
            </a>
          </p>

          <p>phone: 250-216-8935</p>
        </Container>
      </DefaultLayout>
    );
  }
}

export default Copyright;
