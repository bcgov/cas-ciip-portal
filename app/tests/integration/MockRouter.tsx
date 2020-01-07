import React from 'react';
import {RouterContext} from 'next/dist/next-server/lib/router-context';
import Router from 'next/router';

const MockRouter = ({children}) => {
  const mockRouter = {
    prefetch: async () => new Promise(resolve => resolve()),
    pageLoader: {
      prefetched: {}
    },
    push: async () => {
      return true;
    }
  };

  Router.router = mockRouter as any;

  return (
    <RouterContext.Provider value={mockRouter as any}>
      {children}
    </RouterContext.Provider>
  );
};

export default MockRouter;
