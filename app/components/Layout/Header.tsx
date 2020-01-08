import React from 'react';
import {Row, Col, Form, Button, Dropdown} from 'react-bootstrap';
import Link from 'next/link';
import LoginButton from '../LoginButton';

const HeaderLayout = ({isLoggedIn = false, isRegistered = false}) => (
  <header>
    <div className="container">
      <div className="banner">
        <div className="header-left">
          <Link href="/">
            <img
              src="/static/logo-banner.png"
              alt="Go to the Government of British Columbia website"
            />
          </Link>
          <h1>CleanBC Industrial Incentive Program</h1>
        </div>
        <div className="login-btns header-right">
          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Temporary Links
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link href="/reporter/user-dashboard">
                      Industry User: Dashboard
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href="/analyst/applications">
                      Analyst: Applications list
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href="/admin/products-benchmarks">
                      Admin: Create Products and Benchmarks
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <div>
              {isLoggedIn ? (
                <Form.Row>
                  {isRegistered && (
                    <Col>
                      <Form action="/user-profile" method="get">
                        <Button type="submit" variant="outline-light">
                          Profile
                        </Button>
                      </Form>
                    </Col>
                  )}
                  <Col>
                    <Form action="/logout" method="post">
                      <Button type="submit" variant="outline-light">
                        Logout
                      </Button>
                    </Form>
                  </Col>
                </Form.Row>
              ) : (
                <Form.Row>
                  <Col>
                    <LoginButton type="submit" variant="outline-light">
                      Register
                    </LoginButton>
                  </Col>
                  <Col>
                    <LoginButton type="submit" variant="outline-light">
                      Login
                    </LoginButton>
                  </Col>
                </Form.Row>
              )}
            </div>
          </Row>
        </div>
      </div>
    </div>
    <style jsx>
      {`
        header {
          background-color: #036;
          border-bottom: 2px solid #fcba19;
          padding: 10px 65px;
          color: #fff;
          display: flex;
          height: 65px;
          top: 0px;
          width: 100%;
        }
        header h1 {
          font-weight: normal;
          margin: 8px 5px 5px 18px;
          visibility: hidden;
        }
        .header-left {
          display: flex;
        }
        .header-right {
          margin-right: -25px;
        }
        header .banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 10px 0 0;
        }

        header .other {
          display: flex;
          flex-grow: 1;
          /* border-style: dotted;
                  border-width: 1px;
                  border-color: lightgrey; */
        }

        .buttons {
          display: flex;
          flex-grow: 1;
          align-items: center;
          justify-content: flex-end;
        }
        .btn {
          font-weight: bolder;
        }
        .link {
          color: white;
          text-decoration: none;
        }
        a:link,
        a:visited {
          color: white;
        }
        a:hover,
        a:active {
          color: white;
        }

        /*
            These are sample media queries only. Media queries are quite subjective
            but, in general, should be made for the three different classes of screen
            size: phone, tablet, full.
          */

        @media screen and (min-width: 600px) and (max-width: 899px) {
          header h1 {
            font-size: calc(7px + 2.2vw);
            visibility: visible;
          }
        }

        @media screen and (min-width: 900px) {
          header h1 {
            font-size: 1.4em;
            visibility: visible;
          }
        }
      `}
    </style>
  </header>
);

export default HeaderLayout;
