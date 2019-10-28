import React, {Component} from 'react';
import {Button, Row, Col, Card, Jumbotron} from 'react-bootstrap';
import Link from 'next/link';
import DefaultLayout from '../../layouts/default-layout';
import './index.css';

const aboveFoldImage = {
  background: 'url(../../static/what-is-it.jpg)',
  backgroundSize: 'cover'
};

export default class Index extends Component {
  render() {
    return (
      <DefaultLayout showSubheader={false} isLoggedIn={false}>
        <Row style={{marginTop: '60px'}}>
          <Col md={5}>
            <h3 className="blue">
              What is the CleanBC Industrial Incentive Program?
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet.
            </p>
            <a href="#value-props" className="pad-bottom">
              Learn More &gt;
            </a>
            <Card
              className="ciip-card"
              style={{width: '100%', margin: '30px 0'}}
            >
              <Card.Body>
                <Card.Title className="blue">
                  Register for the Incentive Program
                </Card.Title>
                <Card.Text style={{padding: '10px 0 10px 0'}}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.
                </Card.Text>
                <Link
                  href={{
                    pathname: '/user-dashboard',
                    query: {userId: 1, id: 'WyJ1c2VycyIsMV0='}
                  }}
                >
                  <Button className="full-width" variant="primary" size="lg">
                    Register
                  </Button>
                </Link>
              </Card.Body>
            </Card>
            <Link
              href={{
                pathname: '/user-dashboard',
                query: {userId: 1, id: 'WyJ1c2VycyIsMV0='}
              }}
            >
              <div
                className="login-link text-center "
                style={{textDecoration: 'underline'}}
              >
                <a href="#">Already have an account? Click here to login.</a>
              </div>
            </Link>
          </Col>
          <Col
            md={{span: 6, offset: 1}}
            className="with-shadow"
            style={aboveFoldImage}
          />
        </Row>

        <Row style={{marginTop: '100px'}} id="value-props">
          <Col md={4}>
            <div className="value-prop">
              <img src="../../static/icons/import.png" />
              <h4 className="blue">Import data from emission reports</h4>
              <p>
                Reduce reporting burden no sea takimata sanctus est Lorem ipsum
                dolor sit amet. Lorem ipsum dolor sit ame
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="value-prop">
              <img src="../../static/icons/production.png" />
              <h4 className="blue">Tell us about your production data</h4>
              <p>
                Reduce reporting burden no sea takimata sanctus est Lorem ipsum
                dolor sit amet. Lorem ipsum dolor sit ame
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="value-prop">
              <img src="../../static/icons/paid.png" />
              <h4 className="blue">Get a portion of your Carbon tax back</h4>
              <p>
                Reduce reporting burden no sea takimata sanctus est Lorem ipsum
                dolor sit amet. Lorem ipsum dolor sit ame
              </p>
            </div>
          </Col>
        </Row>

        <Row style={{marginTop: '100px'}}>
          <Col md={{span: 6}}>
            <img
              className="with-shadow"
              src="../../static/how-does-it-work.jpg"
            />
          </Col>
          <Col md={{span: 5, offset: 1}}>
            <h3 className="blue">How does the CIIP process work?</h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet.
            </p>
            <Card
              className="ciip-card"
              style={{
                width: '100%',
                margin: '40px 0',
                border: '1px solid grey'
              }}
            >
              <Card.Body>
                <Card.Title className="blue">
                  Some fact or figure about CIIP
                </Card.Title>
                <Card.Text style={{padding: '10px 0 10px 0'}}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.
                </Card.Text>
              </Card.Body>
            </Card>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet.
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

        <style jsx global>{`
          h3 {
            margin-bottom: 20px;
            font-weight: 500;
          }
          .blue {
            color: #036;
          }
          p {
            line-height: 25px;
          }
          .ciip-card {
            border: 1px solid #036;
            padding: 15px;
            border-radius: 0;
            box-shadow: 1px 8px 13px -5px #00336694;
          }
          button.full-width {
            width: 100%;
          }
          .btn-primary {
            background: #036;
            font-size: 18px;
            padding-top: 15px;
            padding-bottom: 15px;
          }
          .with-shadow {
            box-shadow: 1px 8px 13px -5px #00336694;
          }
        `}</style>

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
          .login-link {
            border: 1px solid #666;
            padding: 20px;
            border-radius: 4px;
          }
        `}</style>
      </DefaultLayout>
    );
  }
}
