import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCartItems, fetchLocalCartItems } from '../store';
import { useSelector, useDispatch } from 'react-redux';

export default function CartWidget() {
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cartItems.length);
  const loggedIn = useSelector((state) => !!state.auth.id);
  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchCartItems());
    } else {
      dispatch(fetchLocalCartItems());
    }
  }, [loggedIn]);
  return (
    <Link to="/cart">
      <div>Items in cart: {cartCount}</div>
    </Link>
  );
}
