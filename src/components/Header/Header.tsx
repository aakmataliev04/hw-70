import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <nav className="nav">
      <div className="container header-container">
        <NavLink to="/" className="navbar-brand">Contacts</NavLink>
        <ul className={'nav-list'}>
          <li className={'nav-item'}>
            <NavLink
              to="/"
              className={'nav-link'}
            >
              Home
            </NavLink>
          </li>
          <li className={'nav-item'}>
            <NavLink
              to="/contacts"
              className={'nav-link'}
            >
              Contacts
            </NavLink>
          </li>

          <li className={'nav-item'}>
            <NavLink
              to="/add-contact"
              className={'nav-link'}
            >
              Add Contact
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Header;