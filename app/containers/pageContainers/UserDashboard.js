import React, {Component} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import {graphql} from 'react-relay';
import Organisations from '../Organisations/Organisations';
import DefaultLayout from '../../layouts/default-layout';
import {userOrganisationMutation} from '../../mutations/user_organisation/UserOrganisation';

export default class UserDashBoard extends Component {
  static query = graphql`
    query UserDashboardQuery {
      query {
        ...Organisations_query
      }
    }
  `;

  state = {
    orgInput: '',
    selectedOrg: null,
    confirmOrg: false
  };

  handleInputChange = event => {
    this.setState({orgInput: event});
  };

  handleContextChange = () => {
    this.state.confirmOrg
      ? this.setState({confirmOrg: false})
      : this.setState({confirmOrg: true});
  };

  handleOrgChange = orgId => {
    this.setState({selectedOrg: orgId});
  };

  handleOrgConfirm = async environment => {
    const response = await userOrganisationMutation(environment, {
      input: {
        userOrganisation: {
          userId: Number(this.props.router.query.userId),
          organisationId: this.state.selectedOrg
        }
      }
    });
    console.log(response);
  };

  render() {
    return (
      <DefaultLayout title="Industrial Reporter Dashboard">
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
                .dropdown-item:hover {
                  background: #428bca;
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
            <Col md={{span: 1}} />
            <Col>
              <h2>Reporting organisations</h2>
              <Organisations
                query={this.props.query}
                userId={this.props.router.query.userId}
                orgInput={this.state.orgInput}
                selectedOrg={this.state.selectedOrg}
                confirmOrg={this.state.confirmOrg}
                handleInputChange={this.handleInputChange}
                handleContextChange={this.handleContextChange}
                handleOrgChange={this.handleOrgChange}
                handleOrgConfirm={this.handleOrgConfirm}
              />
            </Col>
          </Row>
        </Container>
      </DefaultLayout>
    );
  }
}
