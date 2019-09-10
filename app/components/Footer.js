import React from 'react'

const Footer = () => {
  return (
      <React.Fragment>
          <footer className="footer">
              <div className="container">
                  <ul>
                      <li><a href=".">Home</a></li>
                      <li><a href=".">Disclaimer</a></li>
                      <li><a href=".">Privacy</a></li>
                      <li><a href=".">Accessibility</a></li>
                      <li><a href=".">Copyright</a></li>
                      <li><a href=".">Contact Us</a></li>
                  </ul>
              </div>
              <style jsx>{`
                footer {
                  background-color: #036;
                  border-top: 2px solid #fcba19;
                  color: #fff;
                  font-family: ‘Noto Sans’, Verdana, Arial, sans-serif;
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

                footer ul li a {
                  font-size: 0.813em;
                  font-weight: normal;  /* 400 */
                  color: #fff;
                  border-right: 1px solid #4b5e7e;
                  padding-left: 5px;
                  padding-right: 5px;
                }

                a:hover {
                  color: #fff;
                  text-decoration: underline;
                }

                :focus {
                  outline: 4px solid #3B99FC;
                  outline-offset: 1px;
                }
              `}</style>
          </footer>
      </React.Fragment>
  )
}

export default Footer