import React, {Component} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import Link from 'next/link';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {adminQueryResponse} from 'adminQuery.graphql';
import DefaultLayout from 'layouts/default-layout';

interface Props extends CiipPageComponentProps {
  query: adminQueryResponse['query'];
}
class Admin extends Component<Props> {
  static query = graphql`
    query adminQuery {
      query {
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {
      query: {session}
    } = this.props;
    return (
      <DefaultLayout session={session} title="Administrator Dashboard">
        <div>
          <ButtonGroup vertical>
            <Link href="/admin/products-benchmarks">
              <Button size="lg" className="buttons">
                View Products and Benchmarks
              </Button>
            </Link>
            <Link href="/admin/user-list">
              <Button className="buttons" size="lg">
                View Users
              </Button>
            </Link>
            <Link href="/admin/organisation-requests">
              <Button className="buttons" size="lg">
                View Access Requests
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
    );
  }
}

export default Admin;
