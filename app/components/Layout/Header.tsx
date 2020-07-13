import React, {useState, useRef, useEffect} from 'react';
import {Form} from 'react-bootstrap';
import Link from 'next/link';
import LoginButton from 'components/LoginButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

const DESKTOP_BREAKPOINT_QUERY = '(min-width: 992px)';

const HeaderLayout = ({isLoggedIn = false, isRegistered = false}) => {
  let mediaMatch;
  /**
   * Window isn't available at first for statically optimized pages like the 404 page:
   */
  try {
    mediaMatch = window.matchMedia(DESKTOP_BREAKPOINT_QUERY);
  } catch (error) {}

  const desktopMediaQuery = useRef(mediaMatch);
  const [navMenuHidden, setNavMenuHidden] = useState(
    desktopMediaQuery.current && !desktopMediaQuery.current.matches
  );

  const toggleNavMenu = () => {
    setNavMenuHidden((prev) => {
      // Ensure nav menu is never hidden on desktop
      if (desktopMediaQuery.current && desktopMediaQuery.current.matches)
        return;
      return !prev;
    });
  };

  // Listen for media query change (ie: device is rotated or window resized) to reset
  // the nav menu toggle and ensure it's not accidentally hidden on desktop
  useEffect(() => {
    const query = desktopMediaQuery.current;
    const listener = query?.addEventListener('change', ({target}: any) => {
      setNavMenuHidden(!target.matches);
    });
    return () => {
      query?.removeEventListener('change', listener);
    };
  });

  return (
    <header>
      <nav>
        <div className="header-left">
          <Link href="/">
            <a>
              <picture>
                <source
                  media="(max-width: 767.98px)"
                  srcSet="/static/bcid-reverse.svg"
                />
                <img
                  src="/static/BCID_CleanBC_rev_tagline_colour.svg"
                  alt="logo for Province of British Columbia CleanBC"
                />
              </picture>
            </a>
          </Link>
          <h2>CleanBC Industrial Incentive Program</h2>
          <button
            id="menu-toggle"
            type="button"
            aria-label="Menu toggle"
            onClick={toggleNavMenu}
          >
            <FontAwesomeIcon color="white" icon={faBars} size="2x" />
          </button>
        </div>
        <ul
          className="header-right"
          style={navMenuHidden ? {display: 'none'} : {display: 'flex'}}
        >
          {isRegistered ? (
            <li>
              <Link href="/">
                <a className="nav-button">Dashboard</a>
              </Link>
            </li>
          ) : null}
          {isLoggedIn ? (
            <>
              {isRegistered && (
                <li>
                  <Link href="/user/profile">
                    <a className="nav-button">Profile</a>
                  </Link>
                </li>
              )}
              <li>
                <Form action="/logout" method="post">
                  <button type="submit" className="nav-button">
                    Logout
                  </button>
                </Form>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/register">
                  <a className="nav-button">Register</a>
                </Link>
              </li>
              <li>
                <LoginButton>
                  <button className="nav-button" type="submit">
                    Login
                  </button>
                </LoginButton>
              </li>
            </>
          )}
        </ul>
      </nav>
      <style jsx>
        {`
          /* Mobile-first styles: 
          * Justified flex layout accommodating a smaller logo and main nav
          * is accessible behind hamburger menu instead of button links.
          */

          header {
            background-color: #036;
            border-bottom: 2px solid #fcba19;
            padding: 10px;
            color: #fff;
          }
          header h2 {
            font-weight: normal;
            font-size: calc(1rem + 1vw);
            margin: 0 0.5em;
            text-align: center;
          }
          .header-left {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-between;
          }
          .header-left img {
            height: 46px;
          }
          .header-right {
            display: flex;
            flex-direction: column;
            width: 100%;
            text-align: right;
            margin: 0;
            padding: 0.8em 1em 0 0;
          }
          nav {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          li {
            list-style-type: none;
          }
          button {
            background: none;
            border: none;
          }
          .nav-button {
            color: #f8f9fa;
            display: inline-block;
            text-align: center;
            user-select: none;
            background-color: transparent;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            border-radius: 0.25rem;
            transition: color 0.15s ease-in-out,
              background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out;
          }

          /* Small desktop and up: 
          * Replaces hamburger menu with button links and pushes apart .header-left 
          * (logo + title) and .header-right (nav buttons) content
          */
          @media screen and ${DESKTOP_BREAKPOINT_QUERY} {
            nav {
              flex-direction: row;
              justify-content: space-between;
              padding: 0 15px;
            }
            .header-left {
              width: auto;
            }
            header h2 {
              margin: 0 0 0 18px;
            }
            button#menu-toggle {
              display: none;
            }
            .header-right {
              flex-direction: row;
              width: auto;
              text-align: right;
              margin: 0;
              padding: 0;
            }
            .nav-button {
              border-color: #f8f9fa;
            }
            li {
              padding-left: 12px;
            }
          }

          /* Custom query to prevent title heading from wrapping in screen widths
          * between 992px to 1092px: 
          */
          @media screen and (min-width: 1092px) {
            header h2 {
              font-size: 2rem;
            }
          }

          /* Larger desktops and up:
          * Gives same effect as .container class on nav to align its contents
          * with page grid:
          */
          @media screen and (min-width: 1200px) {
            nav {
              max-width: 1140px;
              margin-left: auto;
              margin-right: auto;
            }
          }
        `}
      </style>
    </header>
  );
};

export default HeaderLayout;
