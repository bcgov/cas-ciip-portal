// This module provides reusable functions to get the routes for our pages
// This is implemented as a single module for all pages rather than static methods on the pages component, to avoid dependency cycles

export const getApplicationDisclaimerPageRoute = (
  applicationId: string,
  versionNumber: string | number,
  hasSwrsReport?: boolean | string
) => ({
  pathname:
    "/reporter/application/[applicationId]/version/[versionNumber]/disclaimer",
  query: {
    applicationId,
    versionNumber,
    hasSwrsReport,
  },
});

export const getApplicationPageRoute = (
  applicationId: string,
  formId?: string,
  confirmationPage = false
) => ({
  pathname: "/reporter/application/[applicationId]/",
  query: {
    applicationId,
    formId,
    confirmationPage,
  },
});

export const getViewApplicationPageRoute = (
  applicationId: string,
  versionNumber: string | number
) => ({
  pathname:
    "/reporter/application/[applicationId]/version/[versionNumber]/view",
  query: {
    applicationId,
    versionNumber,
  },
});

export const getReviewApplicationPageRoute = (applicationId: string) => ({
  pathname: "/analyst/application/[applicationId]/",
  query: {
    applicationId,
  },
});

export const getCompleteApplicationPageRoute = (applicationId: string) => ({
  pathname: "/reporter/complete-submit",
  query: {
    applicationId,
  },
});
