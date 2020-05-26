import React, {Component} from 'react';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {NextRouter} from 'next/router';
import moment from 'moment-timezone';
import {CiipPageComponentProps} from 'next-env';
import {certificationRedirectQueryResponse} from 'certificationRedirectQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import {USER} from 'data/group-constants';

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: certificationRedirectQueryResponse['query'];
  router: NextRouter;
}

class CertificationRedirect extends Component<Props> {
  static query = graphql`
    query certificationRedirectQuery($rowId: String!) {
      query {
        session {
          ciipUserBySub {
            id
          }
          ...defaultLayout_session
        }
        certificationUrlByRowId(rowId: $rowId) {
          id
          rowId
          expiresAt
          ciipUserByCreatedBy {
            firstName
            lastName
          }
          applicationByApplicationId {
            id
            latestDraftRevision {
              versionNumber
            }
            facilityByFacilityId {
              facilityName
              organisationByOrganisationId {
                operatorName
              }
            }
          }
        }
      }
    }
  `;

  render() {
    const {query, router} = this.props;
    const {session} = query;
    const {
      firstName,
      lastName
    } = query?.certificationUrlByRowId?.ciipUserByCreatedBy;
    const facility =
      query?.certificationUrlByRowId?.applicationByApplicationId
        ?.facilityByFacilityId;
    const facilityName = facility?.facilityName;
    const organisationName =
      facility?.organisationByOrganisationId?.operatorName;
    const applicationId =
      query?.certificationUrlByRowId?.applicationByApplicationId.id;
    const version =
      query?.certificationUrlByRowId?.applicationByApplicationId
        .latestDraftRevision.versionNumber;
    const redirectURI = `/certifier/certify?applicationId=${applicationId}&version=${version}`;

    const expiresAtMoment = query?.certificationUrlByRowId?.expiresAt
      ? moment.tz(
          query?.certificationUrlByRowId?.expiresAt,
          'America/Vancouver'
        )
      : null;
    const currentMoment = moment.tz('America/Vancouver');
    // TODO(Dylan): handle expiry of url validation on the back end
    // Sets an expiry of 7 days for the certification URL
    const expired = currentMoment.format('x') > expiresAtMoment.format('x');
    const certificationUrl = query?.certificationUrlByRowId?.rowId && !expired;
    return (
      <DefaultLayout
        title="Submission Certification"
        session={query.session}
        needsUser={false}
        needsSession={false}
        allowedGroups={ALLOWED_GROUPS}
      >
        {certificationUrl ? (
          <Row style={{marginTop: '60px'}}>
            <Col md={{offset: 3, span: 6}}>
              <h3 className="blue">Your certification is requested.</h3>
              <p>
                <strong>{`${firstName} ${lastName}`}</strong> on behalf of{' '}
                <strong>{organisationName}</strong>, for facility{' '}
                <strong>{facilityName}</strong> has requested that you review,
                certify, and sign off on the information contained in this CIIP
                application.
              </p>
              {session?.ciipUserBySub ? (
                <>
                  <p>Please continue to the certification page.</p>
                  <Col md={{span: 5, offset: 1}}>
                    <Button onClick={async () => router.push(redirectURI)}>
                      Continue
                    </Button>
                  </Col>
                </>
              ) : (
                <>
                  <p>
                    Please log in or register in order to access this page.
                    <br />
                    You will be redirected to the certification page after doing
                    so.
                  </p>

                  <Col md={{span: 5, offset: 1}}>
                    <Form
                      action={`/login?redirectTo=${encodeURIComponent(
                        redirectURI
                      )}`}
                      method="post"
                    >
                      <Button type="submit">Continue</Button>
                    </Form>
                  </Col>
                </>
              )}
            </Col>
          </Row>
        ) : expired ? (
          'Certification URL expired'
        ) : (
          'Invalid certification URL'
        )}
      </DefaultLayout>
    );
  }
}

export default CertificationRedirect;
