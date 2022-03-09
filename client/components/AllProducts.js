import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, addItemToCart, addItemToLocalCart } from '../store';

export default function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const loggedIn = useSelector((state) => !!state.auth.id);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className='all-products'>
      {products
        .sort((x, y) => {
          return x.id - y.id;
        })
        .map((product) => {
          return (
            <div className='single-tile' key={product.id}>
              <div>
                <Link to={`/products/${product.id}`}>
                  <img className='poster-image' src={product.imageURL} />
                </Link>
              </div>
              <div>
                <Link to={`/products/${product.id}`}>
                  <b>{product.name}</b>
                </Link>
              </div>
              <div>${product.price}</div>
              <div className='button'>
                {product.available ? (
                  <button
                    type='button'
                    onClick={async () => {
                      if (loggedIn) {
                        dispatch(addItemToCart(product.id));
                      } else {
                        dispatch(addItemToLocalCart(product));
                      }
                    }}
                  >
                    Add To Cart
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
    </div>
  );
}
