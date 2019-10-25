import React, {Component} from 'react';
import {Button, Jumbotron} from 'react-bootstrap';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

class UserProfile extends Component {
  render() {
    return (
      <div>
        <Header isLoggedIn userName="Mary Jane" occupation="Admin Rio Tinto" />
        <p />
        <Jumbotron>
          <h1>User Profile</h1>
          <p>
            <Button variant="primary">Edit Profile</Button>
          </p>
        </Jumbotron>
        <Footer />
      </div>
    );
  }
}
export default UserProfile;
