/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <a
          className='navbar-brand'
          href='#'>
          Crystal <span className='text-danger'>Khadka</span>
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a
                className='nav-link active'
                aria-current='page'
                href='/'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#'>
                Link
              </a>
            </li>
          </ul>
          <form
            className='d-flex'
            role='search'>
            {user ? (
              <>
                <div className='dropdown'>
                  <button
                    className='btn btn-secondary dropdown-toggle'
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'>
                    Welcome {user.firstName}
                  </button>
                  <ul className='dropdown-menu'>
                    <li>
                      <a
                        className='dropdown-item'
                        href='/profile'>
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className='dropdown-item'
                        href='/settings'>
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        className='dropdown-item'
                        href='#'
                        onClick={() => {
                          localStorage.removeItem('user');
                          localStorage.removeItem('token');
                          window.location.href = '/login';
                        }}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link
                  to={'/login'}
                  className='btn'
                  type='submit'>
                  Login
                </Link>

                <Link
                  to={'/register'}
                  className='btn'
                  type='submit'>
                  Register
                </Link>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
