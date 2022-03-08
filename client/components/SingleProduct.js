import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct, addItemToCart, addItemToLocalCart } from '../store';

export default function SingleProduct() {
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state.singleProduct);
  const loggedIn = useSelector((state) => !!state.auth.id);
  const { productId } = useParams();
  const { imageURL, name, price, description, quantity, available, id } =
    singleProduct;

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);

  return (
    <div>
      <h3>Selected poster:</h3>
      <hr />
      <h1>{name}</h1>
      <img src={imageURL} />
      <p>{description}</p>
      <p>${price}</p>
      <p>
        {available
          ? 'this item is available'
          : 'this item is currently unavailable'}
      </p>
      <p>{quantity} left in stock</p>
      {available ? (
        <button
          onClick={async () => {
            if (window.localStorage.getItem('token')) {
              dispatch(addItemToCart(id));
            } else {
              const cart = JSON.parse(window.localStorage.getItem('guestCart'));
              const updateItem = cart.findIndex((item) => item.id === id);
              if (updateItem >= 0) {
                cart[updateItem].quantity++;
              } else {
                cart.push({
                  id: id,
                  quantity: 1,
                  price: price,
                  product: singleProduct,
                });
              }
              const guestCart = JSON.stringify(cart);
              window.localStorage.setItem('guestCart', guestCart);
            }
          }}
          type="button"
        >
          Add To Cart
        </button>
      ) : null}
      <hr />
    </div>
  );
}
