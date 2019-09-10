import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import ApplicationList from '../containers/Applications/ApplicationList';
import Header from '../components/Header';

class Applications extends Component {
  render() {
    return (
      <>
        <Header />
        <Container>
          <h1>Applications</h1>
          <hr />
          <ApplicationList />
        </Container>
      </>
    );
  }
}

export default Applications;
