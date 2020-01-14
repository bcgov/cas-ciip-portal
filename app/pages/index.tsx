import React, {Component} from 'react';
import {Row, Col, Card, Jumbotron, Table} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {pagesQueryResponse} from 'pagesQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import moment from 'moment-timezone';
import DefaultLayout from 'layouts/default-layout';
import RegistrationLoginButtons from 'components/RegistrationLoginButtons';

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
          applicationOpenTime
          applicationCloseTime
        }
        nextReportingYear {
          applicationOpenTime
          applicationCloseTime
        }
      }
    }
  `;

  render() {
    const {openedReportingYear, nextReportingYear, session} =
      this.props.query || {};

    const startDate = moment
      .tz(
        openedReportingYear?.applicationOpenTime ??
          nextReportingYear?.applicationOpenTime,
        'America/Vancouver'
      )
      .format('MMM D, YYYY');
    const endDate = moment
      .tz(
        openedReportingYear?.applicationCloseTime ??
          nextReportingYear?.applicationCloseTime,
        'America/Vancouver'
      )
      .format('MMM D, YYYY');
    return (
      <DefaultLayout
        showSubheader={false}
        session={session}
        needsSession={false}
        needsUser={false}
      >
        <Row style={{marginTop: '60px'}}>
          <Col md={6}>
            <h3 className="blue">
              What is the CleanBC Industrial Incentive Program?
            </h3>
            <p>
              In 2018, B.C.’s $30 carbon tax rate was raised to $35, and it is
              set to increase by $5 every year until 2021. As the price of
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
              The CIIP helps cleaner industrial operations across the province
              by reducing carbon tax costs for facilities near world-leading
              emissions benchmarks.
            </p>
          </Col>
          <RegistrationLoginButtons />
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
                Before you can apply for an operation, you have to register
                yourself as an industrial reporter.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="value-prop">
              <img src="../../static/icons/production.png" />
              <h5 className="blue">2. Request to apply for an Operation</h5>
              <p>
                Once you’ve registered you can request to apply on behalf one or
                multiple Operations.
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
              <tbody>
                <tr>
                  <td>{startDate}</td>
                  <td>CIIP application forms open</td>
                </tr>
                <tr>
                  <td>May 16, 2020</td>
                  <td>Webinar for CIIP</td>
                </tr>
                <tr>
                  <td>{endDate}</td>
                  <td>CIIP application form due</td>
                </tr>
                <tr>
                  <td>May 31, 2021</td>
                  <td>
                    CIIP application form due <br />
                    (along with 2019 GHG reporting data)
                  </td>
                </tr>
              </tbody>
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
