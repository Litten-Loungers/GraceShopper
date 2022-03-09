import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCartItems,
  purchaseProduct,
  completeOrder,
  fetchLocalCartItems,
} from '../store';

export default function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartItems);
  const loggedIn = useSelector((state) => !!state.auth.id);
  const [thankYou, setThankYou] = useState('');

  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchCartItems());
    } else {
      dispatch(fetchLocalCartItems());
    }
  }, [loggedIn]);

  function handleComplete(items) {
    items.forEach((item) => {
      dispatch(
        purchaseProduct(item.product.id, {
          quantity: item.product.quantity - item.quantity,
        })
      );
    });
    if (loggedIn) {
      dispatch(completeOrder());
    } else {
      window.localStorage.setItem('guestCart', JSON.stringify([]));
      dispatch(fetchLocalCartItems());
    }
    setThankYou('Order confirmed! Thank you for shopping with us!');
  }

  return (
    <div>
      <p>
        total: $
        {items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0)}
      </p>
      {items.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.product.name}</p>
            <p>{item.quantity}</p>
            <p>Cost: {item.price}</p>
          </div>
        );
      })}
      <button
        type="button"
        onClick={async () => {
          handleComplete(items);
        }}
      >
        Confirm Order
      </button>
      <h2>{thankYou}</h2>
    </div>
  );
}
