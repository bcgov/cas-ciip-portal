import React, {Component} from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {pagesQueryResponse} from 'pagesQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import DefaultLayout from 'layouts/default-layout';
import RegistrationLoginButtons from 'containers/RegistrationLoginButtons';
import {GUEST} from 'data/group-constants';
import KeyDates from 'containers/KeyDates';
import {getUserGroups} from 'server/helpers/userGroupAuthentication';
import {getUserGroupLandingRoute} from 'lib/user-groups';

const ALLOWED_GROUPS = [GUEST];

interface Props extends CiipPageComponentProps {
  query: pagesQueryResponse['query'];
}

export async function getServerSideProps(context) {
  const groups = getUserGroups(context.req);
  const landingRoute = getUserGroupLandingRoute(groups);
  if (landingRoute === '/')
    return {
      props: {}
    };

  return {
    redirect: {destination: landingRoute, permanent: false}
  };
}

export default class Index extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static query = graphql`
    query pagesQuery {
      query {
        session {
          ...defaultLayout_session
        }
        ...KeyDates_query
        ...RegistrationLoginButtons_query
      }
    }
  `;

  render() {
    const {query} = this.props;
    const {session} = query || {};
    return (
      <DefaultLayout showSubheader={false} session={session}>
        <div className="row">
          <Col md={6}>
            <h1 className="blue">
              What is the CleanBC Industrial Incentive Program?
            </h1>
            <p>
              The{' '}
              <a href="https://www2.gov.bc.ca/gov/content?id=6F748A4DD83447C59B8B9361882FF9A3">
                CleanBC Industrial Incentive Program (CIIP)
              </a>{' '}
              is part of the CleanBC Program for Industry, which applies to
              large industrial operations that report their emissions under the
              Greenhouse Gas Industrial Reporting and Control Act (GGIRCA).
            </p>
            <p>
              The CIIP helps encourage cleaner industrial operations across the
              province by reducing carbon tax costs for facilities that can
              demonstrate they operate near world-leading emissions benchmarks.
            </p>
            <p>
              As the price of carbon rises, the CleanBC Program for Industry
              will support competitiveness and facilitate emission reductions
              using revenues from the carbon tax that industry pays above $30
              per tonne carbon dioxide equivalent (tCO2e).
            </p>
          </Col>
          <RegistrationLoginButtons query={query} />
        </div>

        <Row style={{marginTop: '100px'}} id="value-props">
          <Col md={12}>
            <h2 className="blue">How to Apply</h2>
          </Col>
          <Col md={4}>
            <div className="value-prop">
              <img src="/static/icons/icon-register.svg" alt="" />
              <h3 className="blue">1. Register as an Industrial Reporter</h3>
              <p>
                Before you can apply for the CIIP on behalf of an eligible
                operation, you must register with the Ministry of Environment
                and Climate Change Strategy.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="value-prop">
              <img src="/static/icons/icon-request.svg" alt="" />
              <h3 className="blue">2. Request to apply for an Operation</h3>
              <p>
                Once you’ve registered you can request to apply on behalf one or
                multiple eligible Operations.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="value-prop">
              <img src="/static/icons/icon-apply.svg" alt="" />
              <h3 className="blue">3. Apply on behalf of the Operation</h3>
              <p>
                The CIIP team will verify and approve your request and then you
                can apply for the CleanBC Industrial Incentive Program.
              </p>
            </div>
          </Col>
        </Row>

        <div id="photo-row" className="row">
          <Col md={{span: 7}}>
            <img
              id="photo"
              className="img-fluid"
              sizes="
                     (max-width: 575.98px) calc(100vw - 30px)
                     (max-width: 767.98px) 510px,
                     (min-width: 768px) 635px
              "
              srcSet="
                      /static/landing-photo-375.jpg 375w,
                      /static/landing-photo-750.jpg 750w,
                      /static/landing-photo-1020.jpg 1020w,
                      /static/landing-photo-1270.jpg 1270w
              "
              src="/static/landing-photo-1020.jpg"
              alt="Engineer wearing safety clothing and working at a control panel"
            />
          </Col>
          <Col md={{span: 5}}>
            <KeyDates query={query} />
            <div id="contact-card" className="card">
              <Card.Body>
                <Card.Title className="blue">Contact Information</Card.Title>
                <Card.Text style={{padding: '10px 0 10px 0'}}>
                  Please email us at <strong>GHGRegulator@gov.bc.ca</strong> for
                  any questions.
                </Card.Text>
              </Card.Body>
            </div>
            <p>
              Further information on the CleanBC Industrial Incentive Program is
              available on the{' '}
              <a href="https://www2.gov.bc.ca/gov/content?id=6F748A4DD83447C59B8B9361882FF9A3">
                program website
              </a>
              .
            </p>
          </Col>
        </div>
        <style jsx>{`
          @media screen and (min-width: 992px) {
            .row:first-child {
              padding-top: 50px;
            }
          }
          .value-prop {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-right: 30px;
          }
          .value-prop img {
            max-width: 100px;
            padding: 30px 0;
          }
          .value-prop h4 {
            margin-bottom: 20px;
          }
          li {
            list-style: none;
          }
          #photo {
            margin: 53px 0;
            box-shadow: 1px 8px 13px -5px #00336694;
          }
          #contact-card {
            width: 100%;
            margin: 40px 0;
            padding: 15px;
            border: 1px solid grey;
            border-radius: 0;
            box-shadow: 1px 8px 13px -5px #00336694;
          }
          h1 {
            font-size: 1.75rem;
            margin-bottom: 20px;
          }
          h2 {
            font-size: 1.5rem;
          }
          .value-prop h3 {
            font-size: 1.24rem;
          }
          :global(h3) {
            margin-bottom: 20px;
          }
          h5 {
            margin-bottom: 0.5rem;
          }
          @media (min-width: 767.98px) {
            #photo-row {
              margin-top: 100px;
            }
          }
        `}</style>
      </DefaultLayout>
    );
  }
}
