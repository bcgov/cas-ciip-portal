import React from 'react';
import {ToastContainer} from 'react-toastify';

export const Toaster: React.FunctionComponent = () => {
  return (
    <>
      <ToastContainer limit={3} />
      <style jsx>{`
        :global(.Toastify__toast) {
          display: block;
          padding: 1rem 1.25rem;
        }
        :global(.Toastify__toast-body) {
          padding: 0;
        }
        :global(.toastalert-error) {
          background-color: #f8d7da;
          border: 1px solid #d2adb1;
          color: #721c24;
        }
        :global(.toastalert-success) {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #9cc7a6;
        }
        :global(.Toastify__close-button) {
          position: absolute;
          top: 0.5rem;
          right: 0.7rem;
        }
        :global(.Toastify__close-button--default) {
          opacity: 1;
          color: currentColor;
        }
        :global(.Toastify__progress-bar--default) {
          background: transparent;
        }
      `}</style>
    </>
  );
};

export default Toaster;
