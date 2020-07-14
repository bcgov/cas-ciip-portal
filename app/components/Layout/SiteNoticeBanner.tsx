import React from 'react';

const SiteNoticeBanner = ({content}) => {
  return (
    /* eslint-disable react/no-danger */
    <>
      <div
        dangerouslySetInnerHTML={{__html: content}}
        id="site-banner"
        role="alert"
      />
      <style jsx global>{`
        #site-banner .alert {
          text-align: center;
          margin-bottom: 0;
          padding: 0.5rem 1.25rem;
          border: none;
        }
        #site-banner a {
          font-weight: 700;
          text-decoration: underline;
        }
        #site-banner .alert-primary a {
          color: #002752;
        }
        #site-banner .alert-warning a {
          color: #533f03;
        }
        #site-banner .alert-danger a {
          color: #491217;
        }
        #site-banner .alert-success a {
          color: #0b2e13;
        }
      `}</style>
    </>
    /* eslint-enable react/no-danger */
  );
};

export default SiteNoticeBanner;
