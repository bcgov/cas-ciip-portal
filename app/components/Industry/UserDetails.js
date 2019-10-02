import React, { Component } from 'react';
import { graphql, commitMutation } from 'react-relay';
import { Button, Carousel, Jumbotron, Image, Table, Form } from 'react-bootstrap';
import initEnvironment from '../../lib/createRelayEnvironment';
import propTypes from 'prop-types';

const environment = initEnvironment();

const edit = {
  width: '75px'
};
const table = {
  marginTop: '30px',
  marginBottom: '50px'
};
const carousel = {
  marginBottom: '25px'
};

class UserDetails extends Component {
  state = {
    editMode: false,
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    phone: ''
  };

  constructor(props) {
    super(props);

    this.updateUser = graphql`
      mutation UserDetailsMutation($input: UpdateUserByRowIdInput!) {
        updateUserByRowId(input: $input) {
          user {
            rowId
            
          }
        }
      }
    `;
    this.updateUserDetails = graphql`
      mutation UserDetailsUpdateMutation($input: UpdateUserDetailByRowIdInput!) {
        updateUserDetailByRowId(input: $input) {
          userDetail {
            rowId

          }
        }
      }
    `;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ editMode: false });
    let userPatch = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailAddress: this.state.email
    };
    let userDetailPatch = {
      userId: this.props.rowId,
      role: this.state.role,
      phone: this.state.phone,
      email: this.state.email
    };
    const saveUserProfile = {
      input: {
        rowId: this.props.rowId,
        userPatch
      }
    };
    const saveUserDetailsProfile = {
      input: {
        rowId: this.props.rowIdUserDetails,
        userDetailPatch
      }
    };
    const saveMutation = this.updateUser;
    const saveMutation2 = this.updateUserDetails;

    commitMutation(environment, {
      mutation: saveMutation,
      variables: saveUserProfile,
      onCompleted: (response, errors) => {
        console.log("mutation1", response);
      },
      onError: err => console.error(err)
    });

    commitMutation(environment, {
      mutation: saveMutation2,
      variables: saveUserDetailsProfile,
      onCompleted: (response, errors) => {
        console.log("mutation2", response);
        window.location.reload();
      },
      onError: err => console.error(err)
    });

  };

  handleChange = event => {
    const { value } = event.target;
    const { name } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  renderForm = () => {
    if (this.state.editMode === true) {
      return (
        <Form data-testid="form-edit" onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label id="NameInput">First Name</Form.Label>
            <Form.Control
              aria-labelledby="NameInput"
              required
              name="firstName"
              type="text"
              placeholder={this.props.firstName}
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              name="lastName"
              type="text"
              placeholder={this.props.lastName}
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Occupation</Form.Label>
            <Form.Control
              required
              name="role"
              type="text"
              placeholder={this.props.role}
              value={this.state.role}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              required
              name="phone"
              type="text"
              placeholder={this.props.phone}
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              name="email"
              type="email"
              placeholder={this.props.emailAddress}
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button data-testid="button-submit" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    }

    return <div />;
  };

  editProfile = e => {
    e.preventDefault();
    console.log('button clicked');
    this.setState({ editMode: true });
  };

  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="msg">
            Welcome to CIIP {this.props.firstName} {this.props.lastName}!
          </h1>
          <Button href="#" variant="primary">
            Get Started
          </Button>
        </Jumbotron>

        <Carousel style={carousel}>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src="../../static/Hero-Shot-with-Family-1200x628.jpg"
              rounded="true"
              alt="First slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <Image
              className="d-block w-100"
              src="../../static/CleanBC_WebsitePosts_Facts-Mobile-06-2.jpg"
              rounded="true"
              alt="Second slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <Image
              className="d-block w-100"
              src="../../static/CleanBC-Reductions-2030-Target.jpg"
              rounded="true"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>

        <h2>User Profile</h2>
        <Button data-testid="button-edit" style={edit} variant="primary" onClick={this.editProfile}>
          Edit
        </Button>
        <p />
        {this.renderForm()}

        <Table striped bordered hover style={table}>
          <tbody>
            <tr>
              <th>First Name</th>
              <td>{this.props.firstName}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{this.props.lastName}</td>
            </tr>
            <tr>
              <th>Occupation</th>
              <td>{this.props.role}</td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>{this.props.phone}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{this.props.emailAddress}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
UserDetails.propTypes = {
  firstName: propTypes.string,
  lastName: propTypes.string,
  role: propTypes.string,
  phone: propTypes.string,

}
export default UserDetails;
