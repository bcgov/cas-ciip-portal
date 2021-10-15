import React from "react";
import Link from "next/link";

const Footer = ({ children }) => {
  return (
    <footer className="footer">
      {children}
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
            <a
              href="https://www2.gov.bc.ca/gov/content/home/accessible-government"
              target="_blank"
              rel="noopener noreferrer"
            >
              Accessibility
            </a>
          </li>
          <li>
            <Link href="/resources/copyright">Copyright</Link>
          </li>
          <li>
            <Link href="/resources/contact">Contact Us</Link>
          </li>
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
            flex-shrink: 0;
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

          footer ul li:last-child > :global(a) {
            border-right: none;
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
