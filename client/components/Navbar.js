import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import CartWidget from './CartWidget';

const Navbar = ({ handleClick, isLoggedIn, isAdmin, username }) => (
  <div>
    <div className='signed-in-bar'>
      {isLoggedIn ? (
        <div className='dark-font'>
          <h4>Signed in as: {username}</h4>
        </div>
      ) : (
        <></>
      )}
    </div>
    <nav>
      <div id='site-name-div'>
        <h1 id='site-name'>POSTER MASTER</h1>
      </div>
      {isLoggedIn ? (
        <div>
          <Link to='/products'>All Posters</Link>
          <a href='#' onClick={handleClick}>
            Logout
          </a>
          {isAdmin ? (
            <>
              <Link to='/admin/products'>Manage Products</Link>
              <Link to='/admin/users'>View Users</Link>
            </>
          ) : (
            <></>
          )}
          <CartWidget />
        </div>
      ) : (
        <div>
          <Link to='/products'>All Posters</Link>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign Up</Link>
          <CartWidget />
        </div>
      )}
    </nav>
  </div>
);

const mapState = (state) => {
  return {
    isAdmin: state.auth.type === 'ADMIN',
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
