import React, {Component} from 'react';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {graphql} from 'react-relay';
import moment from 'moment';
import {certificationRedirectQueryResponse} from 'certificationRedirectQuery.graphql';
import DefaultLayout from '../layouts/default-layout';

interface Props {
  query: certificationRedirectQueryResponse['query'];
  router: any;
}

class CertificationRedirect extends Component<Props> {
  static query = graphql`
    query certificationRedirectQuery($rowId: String!) {
      query {
        session {
          ...defaultLayout_session
        }
        certificationUrlByRowId(rowId: $rowId) {
          id
          rowId
          createdAt
          applicationByApplicationId {
            id
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
    const {query} = this.props;
    const facility =
      query?.certificationUrlByRowId?.applicationByApplicationId
        ?.facilityByFacilityId;
    const facilityName = facility?.facilityName;
    const organisationName =
      facility?.organisationByOrganisationId?.operatorName;
    const applicationId = this.props.router.query.id;
    const redirectURI = `/certify?applicationId=${applicationId}`;

    const createdAtMoment = query?.certificationUrlByRowId?.createdAt
      ? moment(query?.certificationUrlByRowId?.createdAt)
      : null;
    const currentMoment = moment();
    // TODO(Dylan): handle expiry of url validation on the back end
    // Sets an expiry of 7 days for the certification URL
    const isValid =
      currentMoment.format('x') < createdAtMoment?.add(7, 'days').format('x');
    const certificationUrl = query?.certificationUrlByRowId?.rowId && isValid;
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
                <p>
                  Please log in or register in order to access this page.
                  <br />
                  You will be redirected to the certification page after doing
                  so.
                </p>
                <Col md={{span: 5, offset: 1}}>
                  <Form
                    action={`/login?redirectTo=${decodeURI(redirectURI)}`}
                    method="post"
                  >
                    <Button type="submit">GOGOGO</Button>
                  </Form>
                </Col>
              </Col>
            </Row>
          ) : (
            'Invalid certification URL'
          )}
        </DefaultLayout>
      </>
    );
  }
}

export default CertificationRedirect;
