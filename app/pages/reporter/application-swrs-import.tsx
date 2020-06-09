import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Link from 'next/link';
import {graphql} from 'react-relay';
import {applicationSwrsImportQueryResponse} from 'applicationSwrsImportQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import DefaultLayout from 'layouts/default-layout';
import {USER} from 'data/group-constants';

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: applicationSwrsImportQueryResponse['query'];
}

export default class ApplicationSwrsImport extends Component<Props> {
  static query = graphql`
    query applicationSwrsImportQuery {
      query {
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {query, router} = this.props;
    const {session} = query || {};

    return (
      <DefaultLayout
        title="We imported your data"
        session={session}
        allowedGroups={ALLOWED_GROUPS}
      >
        <p>
          We found an emissions report for this facility, and imported the
          relevant information:
          <br />
          The administrative, fuel and emission forms will be prepopulated to
          match the data entered in your emission report. Please review it and
          complete the forms with the additional information required for your
          CIIP application.
        </p>

        <Link
          href={{
            pathname: '/reporter/application',
            query: {
              ...router.query
            }
          }}
        >
          <Button>Continue</Button>
        </Link>
      </DefaultLayout>
    );
  }
}
