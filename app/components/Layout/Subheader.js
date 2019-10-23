import React from 'react';
import "./Subheader.css";

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
    </div>
);

export default Subheader;
