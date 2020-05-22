import React, {Component} from 'react';
import {Row, Col, Card, Jumbotron, Table} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {pagesQueryResponse} from 'pagesQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import moment from 'moment-timezone';
import DefaultLayout from 'layouts/default-layout';
import RegistrationLoginButtons from 'components/RegistrationLoginButtons';
import {GUEST} from 'data/group-constants';

const ALLOWED_GROUPS = [GUEST];
const TIME_ZONE = 'America/Vancouver';
const DATE_FORMAT = 'MMM D, YYYY';

interface Props extends CiipPageComponentProps {
  query: pagesQueryResponse['query'];
}
export default class Index extends Component<Props> {
  static query = graphql`
    query pagesQuery {
      query {
        session {
          ...defaultLayout_session
        }
        openedReportingYear {
          swrsDeadline
          applicationOpenTime
          applicationCloseTime
        }
        nextReportingYear {
          swrsDeadline
          applicationOpenTime
          applicationCloseTime
        }
      }
    }
  `;

  render() {
    const {openedReportingYear, nextReportingYear, session} =
      this.props.query || {};

    const startDate = moment.tz(
      openedReportingYear?.applicationOpenTime ??
        nextReportingYear?.applicationOpenTime,
      TIME_ZONE
    );
    const endDate = moment.tz(
      openedReportingYear?.applicationCloseTime ??
        nextReportingYear?.applicationCloseTime,
      TIME_ZONE
    );
    const swrsDeadline = moment.tz(
      openedReportingYear?.swrsDeadline ?? nextReportingYear?.swrsDeadline,
      TIME_ZONE
    );

    const keyDates = [
      {
        date: swrsDeadline,
        description: 'Industrial GHG reporting deadline',
        key: '848tfh282740jd'
      },
      {
        date: startDate,
        description: 'CIIP application forms open',
        key: 'j87kj39uhf8930'
      },
      {
        date: endDate,
        description: 'CIIP application form due',
        key: 'kd9393hd8sy273'
      }
    ];

    const keyDatesRows = keyDates
      .sort((a: any, b: any) =>
        a.date.isBefore(b.date) ? -1 : a.date.isSame(b.date) ? 0 : 1
      )
      .map((d) => {
        return (
          <tr key={d.key}>
            <td>{d.date.format(DATE_FORMAT)}</td>
            <td>{d.description}</td>
          </tr>
        );
      });

    return (
      <DefaultLayout
        showSubheader={false}
        session={session}
        needsSession={false}
        needsUser={false}
        allowedGroups={ALLOWED_GROUPS}
      >
        <Row style={{marginTop: '60px'}}>
          <Col md={6}>
            <h3 className="blue">
              What is the CleanBC Industrial Incentive Program?
            </h3>
            <p>
              In 2018, B.C.’s $30 carbon tax rate was raised to $35, and in
              2019, the carbon tax rate rose from $35 to $40. As the price of
              carbon rises, the CleanBC Program for Industry will support
              competitiveness and facilitate emission reductions using revenues
              from the carbon tax that industry pays above $30 per tonne carbon
              dioxide equivalent (tCO2e).
            </p>
            <p>
              The CleanBC Industrial Incentive Program (CIIP) is part of the
              CleanBC Program for Industry, which applies to large industrial
              operations that report their emissions under the Greenhouse Gas
              Industrial Reporting and Control Act (GGIRCA).
            </p>
            <p>
              The CIIP helps industrial operations across the province by
              reducing net carbon-tax costs for facilities near world-leading
              emissions benchmarks.
            </p>
          </Col>
          <RegistrationLoginButtons
            applicationDeadline={endDate.format('MMMM DD, YYYY')}
          />
        </Row>

        <Row style={{marginTop: '100px'}} id="value-props">
          <Col md={12}>
            <h4 className="blue">How to Apply</h4>
          </Col>
          <Col md={4}>
            <div className="value-prop">
              <img src="../../static/icons/import.png" />
              <h5 className="blue">1. Register as an Industrial Reporter</h5>
              <p>
                Before you can apply for the CIIP on behalf of an eligible
                operation, you must register with the Ministry of Environment
                and Climate Change Strategy.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="value-prop">
              <img src="../../static/icons/production.png" />
              <h5 className="blue">2. Request to apply for an Operation</h5>
              <p>
                Once you’ve registered you can request to apply on behalf one or
                multiple eligible Operations.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="value-prop">
              <img src="../../static/icons/paid.png" />
              <h5 className="blue">3. Apply on behalf of the Operation</h5>
              <p>
                The CIIP team will verify and approve your request and then you
                can apply for the program.
              </p>
            </div>
          </Col>
        </Row>

        <Row style={{marginTop: '100px'}}>
          <Col md={{span: 6}}>
            <img className="with-shadow" src="../../static/what-is-it.jpg" />
          </Col>
          <Col md={{span: 5, offset: 1}}>
            <h3 className="blue">Key Dates</h3>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th />
                </tr>
              </thead>
              <tbody>{keyDatesRows}</tbody>
            </Table>

            <Card
              className="ciip-card"
              style={{
                width: '100%',
                margin: '40px 0',
                border: '1px solid grey'
              }}
            >
              <Card.Body>
                <Card.Title className="blue">Contact Information</Card.Title>
                <Card.Text style={{padding: '10px 0 10px 0'}}>
                  Please email us at <strong>GHGRegulator@gov.bc.ca</strong> for
                  any questions.
                </Card.Text>
              </Card.Body>
            </Card>
            <p>
              Further information on the CleanBC Industrial Incentive Program is
              available in this
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www2.gov.bc.ca/assets/gov/environment/climate-change/ind/cleanbc-program-for-industry/ciip_factsheet_190524_final.pdf?forcedownload=true"
              >
                {' '}
                fact sheet
              </a>
              .
            </p>
          </Col>
        </Row>

        <Row style={{marginTop: '100px', display: 'none'}}>
          <Jumbotron style={{width: '100%'}}>
            <h3 className="blue">Have questions? Get in touch.</h3>
            <p>Phone: +1 099 9920 9002</p>
            <p>Email: cas@ggircs.com</p>
          </Jumbotron>
        </Row>
        <style jsx>{`
          .value-prop {
            padding-right: 30px;
          }
          .value-prop img {
            max-width: 100px;
            padding: 30px 0;
            margin: 0 auto;
          }
          .value-prop h4 {
            margin-bottom: 20px;
          }
          li {
            list-style: none;
          }
        `}</style>
      </DefaultLayout>
    );
  }
}
