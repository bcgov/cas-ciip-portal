import React, { Component } from 'react';
import { Button, Modal, Container, Row, Col, Card } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const heading = {
  color: '#003366',
  fontSize: 'Bold 25px',
  marginLeft: '400px',
  fontWeight: 'bold'
};
const headingSubtext = {
  color: 'black',
  marginLeft: '400px',
  fontSize: '14px',
  width: '50%'
};
const headerBackground = {
  paddingTop: '60px',
  paddingBottom: '60px',
  backgroundColor: '#f5f5f5',
  opacity: 1,
  width: '100%',
  borderBottomStyle: 'solid',
  borderWidth: '1px'
};
const SubHeading2 = {
  color: '#003366',
  fontSize: '25px',
  marginBottom: '46px',
  marginTop: '15px',
  fontWeight: 'bold'
};
const Subtext2 = {
  width: '468px',
  marginBottom: '50px'
};
const Cards = {
  width: '450px',
  marginTop: '50px',
  marginBottom: '25px',
  borderRadius: '15px',
  textAlign: 'center'
};
const CardBody1 = {
  backgroundColor: '#003366',
  padding: '50px',
  borderRadius: '15px'
};
const CardTitle1 = {
  color: 'white',
  fontSize: '25px',
  marginBottom: '15px',
  fontWeight: 'bold'
};
const CardTitle2 = {
  fontSize: '25px',
  color: '#003366',
  marginBottom: '15px',
  fontWeight: 'bold'
};

class Landing extends Component {
  state = { show: false };

  showModal = e => {
    e.preventDefault();
    this.setState({ show: true });
    console.log(this.state);
  };

  hideModal = e => {
    this.setState({ show: false });
  };

  renderModal = () => {
    if (this.state.show === true) {
      return (
        <Modal
          centered
          size="lg"
          show={this.state.show}
          onHide={this.hideModal}
          data-testid="modal"
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: '#003366' }}>
              You will now be redirected to the BCEID site
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: '25px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. <p /> Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: '#003366', float: 'left' }}
              size="lg"
              href="https://www.bceid.ca/"
              target="_blank"
              data-testid="btn-get-portal"
              className="btn-portal"
            >
              Continue to BCEID registration
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };

  render() {
    return (
      <div>
        <Header
          isLoggedIn
          userName={'Mary Jane'}
          occupation={'Admin Rio Tinto'}
        />
        <div style={headerBackground}>
          <h1 style={heading}>Welcome to your CIIP Portal</h1>
          <p style={headingSubtext}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        {this.renderModal()}
        <Container>
          <Row>
            <Col md>
              <Card style={Cards}>
                <Card.Body style={CardBody1}>
                  <Card.Title style={CardTitle1}>Login with BCEID</Card.Title>
                  <Card.Text style={{ color: 'white' }}>
                    Applying for CIIP requires having a valid BCEID. If you have
                    already acquired yours click below to Login
                  </Card.Text>
                  <Button
                    style={{ backgroundColor: '#EDA500', color: '#003366' }}
                    size="lg"
                  >
                    Login with BCEID
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={Cards}>
                <Card.Body style={{ padding: '50px' }}>
                  <Card.Title style={CardTitle2}>Get a BCEID</Card.Title>
                  <Card.Text style={{ color: '#003366' }}>
                    Applying for CIIP requires having a valid BCEID. Click here
                    to acquire a BCEID. Once you have it, you can come to this
                    page and proceed.
                  </Card.Text>
                  <Button
                    style={{ backgroundColor: '#003366' }}
                    size="lg"
                    onClick={this.showModal}
                    data-testid="get-modal"
                  >
                    Get a BCEID
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2 style={SubHeading2}>Apply for CIIP 2019</h2>
              <p style={Subtext2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Col>
            <Col>
              <h2 style={SubHeading2}>Why do I need a BCEID</h2>
              <p style={Subtext2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Landing;
