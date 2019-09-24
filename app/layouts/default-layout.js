import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import Header from '../components/Header';

class DefaultLayout extends Component {
  render() {
    const {children, title} = this.props;
    return (
      <>
        <Header />
        <Container>
          {title ? (
            <>
              <h1>{title}</h1>
              <hr />
            </>
          ) : null}
          {children}
        </Container>
      </>
    );
  }
}

export default DefaultLayout;
