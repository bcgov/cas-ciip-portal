import React, {Component} from 'react';
import {Row, Col, Form, Button, Alert} from 'react-bootstrap';
import {createFragmentContainer} from 'react-relay';
import createUser from '../../mutations/user/create-user';

class FormCreateUser extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    showSuccessMsg: false,
    showErrorMsg: false
  };

  createUserFromRef = React.createRef();

  // Submit form to Create User
  submitForm = event => {
    event.preventDefault();
    event.stopPropagation();

    const userDetails = {
      input: {
        user: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          emailAddress: this.state.emailAddress
        }
      }
    };

    const {environment} = this.props.relay;

    const successCallback = () => {
      this.setState({showSuccessMsg: true});
    };

    const errorCallback = () => {
      this.setState({showErrorMsg: true});
    };

    // Create User mutation
    createUser(environment, userDetails, successCallback, errorCallback);

    this.createUserFromRef.current.reset();
  };

  // Hide Success and Error messages
  clearMessages = () => {
    this.setState({showSuccessMsg: false, showErrorMsg: false});
  };

  render() {
    return (
      <>
        <Form
          ref={this.createUserFromRef}
          id="registration-form"
          onSubmit={this.submitForm}
        >
          <Form.Group controlId="formBasicName">
            <Row className="mb-4">
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="string"
                  name="firstName"
                  onChange={e =>
                    this.setState({[e.target.name]: e.target.value})
                  }
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="string"
                  name="lastName"
                  onChange={e =>
                    this.setState({[e.target.name]: e.target.value})
                  }
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row className="mb-4">
              <Col>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="string"
                  name="emailAddress"
                  onChange={e =>
                    this.setState({[e.target.name]: e.target.value})
                  }
                />
              </Col>
              <Col>
                <Form.Label>Phone No.</Form.Label>
                <Form.Control type="string" />
              </Col>
            </Row>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mt-4"
            onClick={this.clearMessages}
          >
            Submit
          </Button>
        </Form>

        <Alert
          dismissible
          variant="success"
          className="my-3"
          show={this.state.showSuccessMsg}
          onClose={() => this.setState({showSuccessMsg: false})}
        >
          <div>User successfully added</div>
        </Alert>
        <Alert
          dismissible
          variant="danger"
          className="my-3"
          show={this.state.showErrorMsg}
          onClose={() => this.setState({showErrorMsg: false})}
        >
          <div>Error adding new User</div>
        </Alert>
      </>
    );
  }
}

export default createFragmentContainer(FormCreateUser, {});
