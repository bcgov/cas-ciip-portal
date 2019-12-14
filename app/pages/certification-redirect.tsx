import React, {Component} from 'react';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {NextRouter} from 'next/router';
import moment from 'moment';
import {CiipPageComponentProps} from 'next-env';
import {certificationRedirectQueryResponse} from 'certificationRedirectQuery.graphql';
import DefaultLayout from '../layouts/default-layout';

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
          applicationByApplicationId {
            id
            latestDraftVersionNumber
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
    const facility =
      query?.certificationUrlByRowId?.applicationByApplicationId
        ?.facilityByFacilityId;
    const facilityName = facility?.facilityName;
    const organisationName =
      facility?.organisationByOrganisationId?.operatorName;
    const applicationId = this.props.router.query.id;
    const version =
      query?.certificationUrlByRowId?.applicationByApplicationId
        .latestDraftVersionNumber;
    const redirectURI = `/certify?applicationId=${applicationId}&version=${version}`;

    const expiresAtMoment = query?.certificationUrlByRowId?.expiresAt
      ? moment(query?.certificationUrlByRowId?.expiresAt)
      : null;
    const currentMoment = moment();
    // TODO(Dylan): handle expiry of url validation on the back end
    // Sets an expiry of 7 days for the certification URL
    const expired = currentMoment.format('x') > expiresAtMoment.format('x');
    const certificationUrl = query?.certificationUrlByRowId?.rowId && !expired;
    return (
      <>
        <DefaultLayout
          title="Submission Certification"
          session={query.session}
          needsUser={false}
          needsSession={false}
        >
          {certificationUrl ? (
            <Row style={{marginTop: '60px'}}>
              <Col md={{offset: 3, span: 6}}>
                <h3 className="blue">Your certification is requested.</h3>
                <p>
                  On behalf of <strong>{organisationName}</strong>, for facility{' '}
                  <strong>{facilityName} </strong>
                  please certify the information reported in the application is
                  correct.
                </p>
                {session?.ciipUserBySub ? (
                  <>
                    <p>Please continue to the certification page</p>
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
                      You will be redirected to the certification page after
                      doing so.
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
      </>
    );
  }
}

export default CertificationRedirect;
