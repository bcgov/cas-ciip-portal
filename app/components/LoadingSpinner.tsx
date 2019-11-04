import React from 'react';
import {Spinner} from 'react-bootstrap';

const LoadingSpinner = () => (
  <div>
    <Spinner animation="grow" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
    <style jsx>
      {`
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
      `}
    </style>
  </div>
);
export default LoadingSpinner;
