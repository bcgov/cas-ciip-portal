import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const DASHBOARD_PATH = "/reporter";
const APPLICATIONS_PATH = "/reporter/facilities";

const Subheader = () => {
  const { route } = useRouter();

  return (
    <div>
      <nav className="navigation-main" id="navbar" aria-label="Secondary">
        <div className="container">
          <ul>
            <li className={route === DASHBOARD_PATH ? "active" : ""}>
              <Link
                href={{
                  pathname: DASHBOARD_PATH,
                }}
              >
                <a>My Dashboard</a>
              </Link>
            </li>
            <li className={route === APPLICATIONS_PATH ? "active" : ""}>
              <Link
                href={{
                  pathname: APPLICATIONS_PATH,
                }}
              >
                <a>My Applications</a>
              </Link>
            </li>
          </ul>
        </div>
        <style jsx>{`
          .navigation-main {
            color: #fcba19;
            background-color: #38598a;
            width: 100%;
            -webkit-box-shadow: 0 6px 8px -4px #b3b1b3;
            -moz-box-shadow: 0 6px 8px -4px #b3b1b3;
            box-shadow: 0 6px 8px -4px #b3b1b3;
            padding: 10px 0 10px 50px;
          }
          .navigation-main ul {
            display: flex;
            flex-direction: row;
            margin: 0;
            color: #fff;
            list-style: none;
            margin-left: -75px;
          }
          .navigation-main ul li a {
            display: flex;
            font-size: 17px;
            font-weight: normal; /* 400 */
            color: #fff !important;
            padding: 0 15px 0 15px;
            text-decoration: none;
          }
          .navigation-main ul li a:hover {
            text-decoration: underline;
          }
          .navigation-main ul .active {
            text-decoration: underline;
            font-weight: bold;
          }
          .navigation-main ul > li.active a {
            color: #ffc613 !important;
          }

          :focus {
            outline: 4px solid #3b99fc;
            outline-offset: 1px;
          }

          @media screen and (min-width: 768px) {
            .navigation-main {
              display: block;
            }

            .navigation-main ul {
              flex-direction: row;
            }

            .navigation-main ul li {
              margin: 0;
            }

            .navigation-main ul li a {
              border-right: 1px solid #9b9b9b;
            }
          }
        `}</style>
      </nav>
    </div>
  );
};

export default Subheader;
