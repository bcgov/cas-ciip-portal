import React, {Component} from 'react';
import Link from 'next/link';
import {Button} from 'react-bootstrap';
import DefaultLayout from '../layouts/default-layout';

class CompleteSubmit extends Component {
  render() {
    return (
      <DefaultLayout
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
            pathname: '/user-dashboard',
            query: {userId: 1}
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
