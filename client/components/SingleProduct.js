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
            if (loggedIn) {
              dispatch(addItemToCart(id));
            } else {
              dispatch(addItemToLocalCart(singleProduct));
            }
          }}
          type='button'
        >
          Add To Cart
        </button>
      ) : null}
      <hr />
    </div>
  );
}
