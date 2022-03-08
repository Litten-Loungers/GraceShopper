import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchCartItems,
  fetchLocalCartItems,
  addItemToCart,
  addItemToLocalCart,
  decItemFromLocalCart,
  destroyLocalItem,
  destroyItem,
  decrementItem,
} from '../store';

export default function Order() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const loggedIn = useSelector((state) => !!state.auth.id);

  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchCartItems());
    } else {
      dispatch(fetchLocalCartItems());
    }
  }, [loggedIn]);

  // useEffect(() => {
  //   if (loggedIn) {
  //     dispatch(fetchCartItems());
  //   } else {
  //     dispatch(fetchLocalCartItems());
  //   }
  // }, [cartItems]);

  function handleDec(item) {
    if (loggedIn) {
      if (item.quantity > 1) {
        dispatch(decrementItem(item));
      } else {
        dispatch(destroyItem(item.id));
      }
    } else {
      dispatch(decItemFromLocalCart(item));
    }
  }

  function handleInc(item) {
    if (loggedIn) {
      dispatch(addItemToCart(item.product.id));
    } else {
      dispatch(addItemToLocalCart(item.product));
    }
  }

  function handleRemove(item) {
    if (loggedIn) {
      dispatch(destroyItem(item.id));
    } else {
      dispatch(destroyLocalItem(item));
    }
  }

  return (
    <div>
      {cartItems.map((item) => {
        return (
          <div className="singleOrder" key={item.id}>
            <p>ORDER ID: {item.orderId}</p>
            <p>ITEM QUANTITY: {item.quantity}</p>
            <button
              type="button"
              onClick={async () => {
                handleDec(item);
              }}
            >
              -
            </button>
            <button
              type="button"
              onClick={async () => {
                handleInc(item);
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={async () => {
                handleRemove(item);
              }}
            >
              Remove From Cart
            </button>
            <p>PRICE: {item.price}</p>
            <Link to={`/products/${item.product.id}`}>
              <p>Name: {item.product.name}</p>
            </Link>
            <img src={item.product.imageURL} />
            <hr />
          </div>
        );
      })}
    </div>
  );
}
