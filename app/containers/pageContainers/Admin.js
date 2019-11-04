import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import DefaultLayout from '../../layouts/default-layout';

class Admin extends Component {
  render() {
    return (
      <>
        <DefaultLayout title="Administrators Dashboard">
          <div>
            <a href="../products-benchmarks">
              <Button className="buttons" size="lg">
                View Products and Benchmarks
              </Button>
            </a>
            <br />
            <a href="../user-list">
              <Button className="buttons" size="lg">
                View Users
              </Button>
            </a>
            <br />
            <a href="../applications">
              <Button className="buttons" size="lg">
                View Applications
              </Button>
            </a>
            <br />
            <style global jsx>
              {`
                .buttons {
                  padding: 10px;
                  margin: 25px 0 0 0;
                }
              `}
            </style>
          </div>
        </DefaultLayout>
      </>
    );
  }
}

export default Admin;
