import React, {Component} from 'react';
import Link from 'next/link';
import {Button} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {completeSubmitQueryResponse} from 'completeSubmitQuery.graphql';
import DefaultLayout from '../layouts/default-layout';

interface Props extends CiipPageComponentProps {
  query: completeSubmitQueryResponse['query'];
}
class CompleteSubmit extends Component<Props> {
  static query = graphql`
    query completeSubmitQuery {
      query {
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {
      query: {session}
    } = this.props;
    return (
      <DefaultLayout
        session={session}
        title={
          <>
            Thank you for your submission. Your application has been sent and is
            being reviewed.
            <br /> We will notify you as soon as there is an update.
          </>
        }
      >
        <Link
          href={{
            pathname: '/user-dashboard'
          }}
        >
          <Button
            style={{padding: '15px', width: '20%'}}
            className="full-width"
            variant="primary"
            size="sm"
          >
            Back to My Dashboard
          </Button>
        </Link>
      </DefaultLayout>
    );
  }
}

export default CompleteSubmit;
