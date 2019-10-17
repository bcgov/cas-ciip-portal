import React, { Component } from 'react';
import { Button, Accordion, Card, Container, Col, Row } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { graphql } from 'react-relay';
import Organisations from '../containers/Organisations/Organisations';

const organizations = [
  { orgName: 'Rio Tinto Alcan', facilities: ['Facility1', 'Facility2'] },
  {
    orgName: 'Shell Coporation',
    facilities: ['Facility1', 'Facility2', 'Facility3']
  },
  { orgName: 'Shanghai Eletric', facilities: ['Facility1', 'Facility2'] }
];

class landingIndustryUser extends Component {
  state = {
    organizations: [],
    facilities: []
  };
  static query = graphql`
  query landingIndustryUserQuery {
    query {
     ...Organisations_query
    }
  }
  `;
  renderAccordian = () => {
    const organizationArr = [];
    let facilitiesArr = [];
    for (let i = 0; i < organizations.length; i++) {
      for (let j = 0; j < organizations[i].facilities.length; j++) {
        facilitiesArr.push(
          <Accordion.Collapse eventKey={i}>
            <Card.Body data-testid="card" style={{ borderBottom: '1px solid #d3d3d3' }}>
              <div style={{ fontWeight: 'bold' }}>
                {organizations[i].facilities[j]}

                <Button variant="primary" style={{ marginLeft: '30px' }}>
                  Apply for CIIP for this facility
                </Button>
              </div>
              <p style={{ marginTop: '10px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </Card.Body>
          </Accordion.Collapse>
        );
      }

      const cardBody = facilitiesArr.map(facilities => <div>{facilities}</div>);
      organizationArr.push(
        <Card>
          <Card.Header data-testid="btn-header">
            <Accordion.Toggle as={Button} variant="link" eventKey={i}>
              {organizations[i].orgName}
            </Accordion.Toggle>
          </Card.Header>
          {cardBody}
        </Card>
      );
      facilitiesArr = [];
    }

    return organizationArr.map(organizations => <div>{organizations}</div>);
  };

  render() {
    return (
      <div>
        <Header isLoggedIn userName="Mary Jane" occupation="Admin Rio Tinto" />
        <header>
          <nav className="navigation-main" id="navbar">
            <div className="container">
              <ul>
                <li>
                  <a href="." className="active">
                    Apply for 2019
                  </a>
                </li>
                <li>
                  <a href=".">Applications</a>
                </li>
                <li>
                  <a href=".">Contact Us</a>
                </li>
              </ul>
            </div>
            <style jsx>{`
            .navigation-main {
              display: none;
              color: #fcba19;
              background-color: #38598a;
              width: 100%;
              margin-bottom: 0px;
              -webkit-box-shadow: 0 6px 8px -4px #b3b1b3;
              -moz-box-shadow: 0 6px 8px -4px #b3b1b3;
              box-shadow: 0 6px 8px -4px #b3b1b3;
            }

            .navigation-main .container {
              padding: 10px 0 10px 0;
            }

            .navigation-main .container ul {
              display: flex;
              flex-direction: row;
              margin: 0;
              color: #fff;
              list-style: none;
              margin-left: -50px;
            }
            .navigation-main .container ul li a {
              display: flex;
              font-size: 17px;
              font-weight: normal; /* 400 */
              color: #fff;
              padding: 0 15px 0 15px;
              text-decoration: none;
              /* border-style: dotted;
              border-width: 1px;
              border-color: green; */
            }

            .navigation-main .container ul li a:hover {
              text-decoration: underline;
            }

            .navigation-main .container ul .active {
              text-decoration: underline;
              font-weight: bold;
            }
            :focus {
              outline: 4px solid #3B99FC;
              outline-offset: 1px;
            }
          
            @media screen and (min-width: 768px) {
              .navigation-main {
                display: block;
              }
          
              .navigation-main .container ul {
                flex-direction: row;
              }
          
              .navigation-main .container ul li {
                margin: 0;
              }
              
              .navigation-main .container ul li a {
                border-right: 1px solid #9b9b9b;
              }
          `}</style>
            <style jsx global>
              {`
                h2 {
                  color: #036;
                  margin-top: 50px;
                }
                .text {
                  margin-top: 20px;
                  margin-bottom: 40px;
                }
                .accordion {
                  margin-bottom: 40px;
                  margin-top: 30px;
                }
              `}
            </style>
          </nav>
        </header>

        <Container>
          <Row>
            <Col>
              <Row>
                <h2>Apply for CIIP 2019</h2>
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </Row>
              <Row>
                <h2>Pre-requisites:</h2>
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </Row>
            </Col>
            <Col md={{ span: 1 }} />
            <Col>
              <h2>Select Organizations</h2>
              {/* <Accordion className="accordion">
                {this.renderAccordian()}
              </Accordion> */}
              <Organisations query={this.props.query} />
            </Col>
          </Row>
        </Container>

        <p style={{ padding: '50px' }} />
        <Footer />
      </div>
    );
  }
}

export default landingIndustryUser;
