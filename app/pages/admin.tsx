import React, {Component} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import Link from 'next/link';
import DefaultLayout from '../layouts/default-layout';

class Admin extends Component {
  render() {
    return (
      <>
        <DefaultLayout title="Administrators Dashboard">
          <div>
            <ButtonGroup vertical>
              <Link href="/products-benchmarks">
                <Button size="lg" className="buttons">
                  View Products and Benchmarks
                </Button>
              </Link>
              <Link href="/user-list">
                <Button className="buttons" size="lg">
                  View Users
                </Button>
              </Link>
              <Link href="/organisation-requests">
                <Button className="buttons" size="lg">
                  View Applications
                </Button>
              </Link>
            </ButtonGroup>
            <style global jsx>
              {`
                .buttons {
                  padding: 15px;
                  margin: 0 0 25px 0;
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
