import React from 'react';
import Head from 'next/head';
import {ButtonToolbar, Row, Col, Button} from 'react-bootstrap';
import Link from 'next/link';

const Header = props => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="../../static/bootstrap.min.css" />
      <link rel="stylesheet" href="../../static/survey-creator.css" />
    </Head>
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
          {!props.isLoggedIn && (
            <div className="login-btns header-right">
              <Row>
                <Col>
                  <Button style={{marginRight: '10px'}} variant="outline-light">
                    Register
                  </Button>
                  <Button variant="outline-light">Login</Button>
                </Col>
              </Row>
            </div>
          )}
        </div>
        {props.isLoggedIn && (
          <>
            <div className="buttons">
              <Row>
                <Col md={{span: 8}}>
                  <a className="link" href="/user-profile">
                    <p style={{fontWeight: 'bolder', marginTop: '13px'}}>
                      {props.userName} <br />
                      {props.occupation}
                    </p>
                  </a>
                </Col>
                <Col md={{span: 4}}>
                  <ButtonToolbar>
                    <a
                      style={{
                        backgroundColor: '#EDA500',
                        color: 'white',
                        marginTop: '18px'
                      }}
                      href="/logout"
                      className="btn"
                    >
                      Logout
                    </a>
                  </ButtonToolbar>
                </Col>
              </Row>
            </div>
          </>
        )}
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
            font-family: ‘Noto Sans’, Verdana, Arial, sans-serif;
            font-weight: normal; /* 400 */
            margin: 5px 5px 0 18px;
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
  </>
);

export default Header;
