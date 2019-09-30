import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {Col, Container, Row, Image, ButtonToolbar} from 'react-bootstrap';
import Header from '../components/Header';

export default class Index extends Component {
  static displayName = 'Index';

  // convention is to prefix foldername_index when the file is named index
  // @see https://github.com/facebook/relay/issues/1742
  static query = graphql`
    query pages_indexQuery {
      id
    }
  `;

  render() {
    const {id} = this.props;
    return (
      <>
        <Header />
        <Container>
          <Row>
            <Col md={4}>
              <h1 style={{margin: '60px 0 40px 0'}}>
                What is the CleanBC Industrial Incentive Program?
              </h1>
              <p>
                The CleanBC Program for Industry directs a portion of B.C.’s
                carbon tax paid by industry into incentives for cleaner
                operations.
              </p>
              <p>
                The program is designed for regulated large industrial
                operations, such as pulp and paper mills, natural gas
                operations, refineries, and large mines.
              </p>
              <br />
              <ButtonToolbar>
                <a href="/ciip-application" className="btn btn-primary">
                  {' '}
                  Apply for CIIP{' '}
                </a>
                <a
                  style={{marginLeft: '20px'}}
                  href="/form-builder"
                  className="btn btn-danger"
                >
                  {' '}
                  Build a form{' '}
                </a>
              </ButtonToolbar>
            </Col>
            <Col md={8}>
              <Image fluid src="/static/polar-bear.jpg" />
            </Col>
          </Row>
          <br />
          <br />
          <br />
        </Container>
      </>
    );
  }
}
