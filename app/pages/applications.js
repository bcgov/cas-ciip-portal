import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import DefaultLayout from '../layouts/default-layout';
import ApplicationList from '../containers/Applications/ApplicationList';
import Header from '../components/Header';

class Applications extends Component {
  render() {
    return (
      <DefaultLayout title="Applications">
        <ApplicationList />
      </DefaultLayout>
    );
  }
}

export default Applications;
