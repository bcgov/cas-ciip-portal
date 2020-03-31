import React from 'react';
import Link from 'next/link';
import getConfig from 'next/config';

const Footer = () => {
  const feedbackUrl = getConfig()?.publicRuntimeConfig.FEEDBACK_SITE_URL;
  return (
    <footer className="footer">
      <div className="container">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/resources/disclaimer">Disclaimer</Link>
          </li>
          <li>
            <Link href="/resources/privacy">Privacy</Link>
          </li>
          <li>
            <Link href="/resources/accessibility">Accessibility</Link>
          </li>
          <li>
            <Link href="/resources/copyright">Copyright</Link>
          </li>
          <li>
            <Link href="/resources/contact">Contact Us</Link>
          </li>
          <li>{feedbackUrl && <a href={feedbackUrl}>Feedback</a>}</li>
        </ul>
      </div>
      <style jsx>
        {`
          footer {
            background-color: #036;
            border-top: 2px solid #fcba19;
            color: #fff;
            font-family: ‘Noto Sans’, Verdana, Arial, sans-serif;
            margin-top: 100px;
          }

          footer .container {
            display: flex;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            height: 46px;
          }

          footer ul {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin: 0;
            color: #fff;
            list-style: none;
            align-items: center;
            height: 100%;
          }

          footer ul li > :global(a) {
            font-size: 0.813em;
            font-weight: normal; /* 400 */
            color: #fff;
            border-right: 1px solid #4b5e7e;
            padding-left: 5px;
            padding-right: 5px;
          }

          :focus {
            outline: 4px solid #3b99fc;
            outline-offset: 1px;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
