import * as css from './Header.module.scss';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const classes = [css.header];

  const location = useLocation();

  return (
    <header className={classes.join(' ')}>
      <nav>
        <ul>
          <a href="https://stabelo.se">
            <img
              alt="Stabelo"
              src="https://s3.eu-central-1.amazonaws.com/static.stabelo.net.eu-central-1/Stabelo_logo_RGB.png"
            />
          </a>

          <li>
            <Link
              className={location.pathname === '/about' ? css.active : ''}
              to="/about"
            >
              Om uppgiften
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === '/implementation' ? css.active : ''
              }
              to="/implementation"
            >
              Implementation
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
