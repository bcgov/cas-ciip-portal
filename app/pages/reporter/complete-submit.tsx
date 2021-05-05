import React, {Component} from 'react';
import Link from 'next/link';
import {Button, Row, Col} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {completeSubmitQueryResponse} from 'completeSubmitQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import {USER} from 'data/group-constants';
import ProgressStepIndicator from 'components/ProgressStepIndicator';
import StatusBadgeColor from 'components/helpers/StatusBadgeColor';

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: completeSubmitQueryResponse['query'];
}
class CompleteSubmit extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
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
      query: {session},
      router
    } = this.props;

    const {application} = router.query;

    return (
      <DefaultLayout session={session}>
        <Row className="justify-content-md-center mb-5">
          <Col>
            <ProgressStepIndicator
              title="Your Facility's Application Status"
              steps={[
                {
                  description: 'Complete Facility CIIP Application',
                  badgeStyle: StatusBadgeColor.NONE,
                  number: 1
                },
                {
                  description: 'Submit Completed Application',
                  badgeStyle: StatusBadgeColor.INITIAL,
                  number: 2
                },
                {
                  description: 'Application Reviewed by Administrators',
                  badgeStyle: StatusBadgeColor.PENDING,
                  number: 3
                },
                {
                  description: 'Application Approved or Rejected',
                  badgeStyle: StatusBadgeColor.APPROVED,
                  number: 4
                }
              ]}
            />
          </Col>
        </Row>
        <h3 className="mt-3">Thank you for submitting your application.</h3>
        <p className="lead">
          Your application for the _ facility operated by _ has been received
          and is being reviewed. We will notify you by email regarding any
          updates.
        </p>
        <Link
          passHref
          href={{
            pathname: `/reporter/application/${application}`
          }}
        >
          <Button
            style={{padding: '15px', width: '20%'}}
            className="full-width"
            variant="primary"
            size="sm"
          >
            View Submitted Application
          </Button>
        </Link>
      </DefaultLayout>
    );
  }
}

export default CompleteSubmit;
