import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Subheader from '../components/Layout/Subheader';

class DefaultLayout extends Component {
  render() {
    const {children, title} = this.props;
    return (
      <div className="page-wrap">
        <Header />
        <Subheader />
        <Container className="content">
          {title ? (
            <>
              <h1>{title}</h1>
              <hr />
            </>
          ) : null}
          {children}
        </Container>
        <Footer />
        <style jsx global>
          {`
            html,
            body,
            #__next,
            .page-wrap {
              height: 100%;
            }
            .page-wrap {
              display: flex;
              flex-direction: column;
            }
            .content {
              flex: 1 0 auto;
            }
            .footer {
              flex-shrink: 0;
            }
          `}
        </style>
      </div>
    );
  }
}

export default DefaultLayout;
