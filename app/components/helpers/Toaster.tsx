import React from 'react';
import {ToastContainer} from 'react-toastify';

export const Toaster: React.FunctionComponent = () => {
  return <ToastContainer limit={3} />;
};

export default Toaster;
