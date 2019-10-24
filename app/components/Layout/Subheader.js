import React from 'react';

const Subheader = props => (
    <div>
      <nav className="navigation-main" id="navbar">
        <div className="container">
          <ul>
            <li>
              <a href="#" className="active">
                Apply for 2019
              </a>
            </li>
            <li>
              <a href="#">Applications</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
      </nav>
      <style jsx>{`
          .navigation-main {
            color: #fcba19;
            background-color: #38598a;
            width: 100%;
            -webkit-box-shadow: 0 6px 8px -4px #b3b1b3;
            -moz-box-shadow: 0 6px 8px -4px #b3b1b3;
            box-shadow: 0 6px 8px -4px #b3b1b3;
            margin-bottom: 50px;
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
            color: #fff;
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
          :focus {
            outline: 4px solid #3B99FC;
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
    </div>
);

export default Subheader;
